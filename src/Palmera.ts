/* eslint-disable no-unused-private-class-members */
import Safe, { SafeConfig, SafeTransactionOptionalProps } from '@safe-global/protocol-kit'
import {
  EthAdapter,
  EthAdapterTransaction,
  SafeTransaction,
  SafeTransactionDataPartial,
} from '@safe-global/safe-core-sdk-types'
import { decodeFunctionResult, encodeFunctionData, Hex, zeroAddress } from 'viem'
import palmeraModule from './assets/palmeraModule'
import {
  AddOwnerWithThresholdParams,
  AddSafeTxParams,
  AllowedSafeRolesParams,
  DoesUserHaveRoleParams,
  EncodeTransactionDataParams,
  ExecTransactionOnBehalfTxParams,
  GetPrevUserParams,
  GetSafeIdBySafeParams,
  GetSafeInfoResult,
  GetTransactionHashParams,
  IsListedParams,
  IsPendingRemoveParams,
  IsRootSafeOfParams,
  IsSafeLeadParams,
  IsSuperSafeParams,
  IsTreeMemberParams,
  OrgHash,
  PalmeraTransactionData,
  RemoveOwnerParams,
  SetAllowedSafeRolesParams,
  SetRoleParams,
  UpdateDepthLimitsParams,
  UpdateSuperParams,
} from './types'
import { getPalmeraGuardDeploymentNonDeterministic, getPalmeraModuleDeploymentNonDeterministic } from './deployments/factory'

/**
 * The Palmera class provides a set of methods to interact with the Palmera module and guard.
 */
class Palmera {
  #protocolKit!: Safe
  #safeProvider!: EthAdapter
  #safeAddress!: Hex
  #orgHash!: Hex
  #chainId!: bigint
  #moduleAddress!: Hex
  #guardAddress!: Hex

  /**
   * Initializes a new instance of the Palmera class.
   *
   * @param {Safe} safe - The SafeSDK instance to initialize the PalmeraSDK instance with.
   * @returns {Promise<Palmera>} A promise that resolves to an initialized Palmera instance.
   */
  static async init(safe: Safe) {
    const palmera = new Palmera()
    await palmera.#initializePalmera(safe)
    return palmera
  }

  /**
   * Creates a new Safe instance and initializes a new Palmera instance with it.
   *
   * @param {SafeConfig} config - The configuration object for creating the Safe instance.
   * @returns {Promise<Palmera>} A promise that resolves to an initialized Palmera instance.
   */
  static async create(config: SafeConfig) {
    const safe = await Safe.create(config)
    const palmera = new Palmera()
    await palmera.#initializePalmera(safe)
    return palmera
  }

  async #initializePalmera(safe: Safe) {
    this.#protocolKit = safe
    this.#safeProvider = safe.getEthAdapter()

    this.#safeAddress = (await this.#protocolKit.getAddress()) as Hex
    this.#chainId = await this.#protocolKit.getChainId()

    const moduleAddress = getPalmeraModuleDeploymentNonDeterministic({
      network: this.#chainId.toString(),
      released: true,
      version: '1',
    })
    if (!moduleAddress) throw new Error('Palmera module not found for given network')

    const guardAddress = getPalmeraGuardDeploymentNonDeterministic({
      network: this.#chainId.toString(),
      released: true,
      version: '1',
    })


    this.#moduleAddress = moduleAddress as Hex
    this.#guardAddress = guardAddress as Hex
    this.#orgHash = await this.getOrgHashBySafe(this.#safeAddress)
  }

  async #ethCall<TResult>(to: Hex, data: Hex, parse?: (result: string) => TResult): Promise<TResult> {
    const tx = {
      to,
      data,
      value: '0',
    } as EthAdapterTransaction

    return parse ? parse(await this.#safeProvider.call(tx)) : (this.#safeProvider.call(tx) as TResult)
  }

  async #createSafeTransaction(
    to: string,
    data: Hex,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const tx: SafeTransactionDataPartial = {
      to,
      value: '0',
      data,
      ...options,
    }

    return this.#protocolKit.createTransaction({ transactions: [tx] })
  }

  /**
   * Gets the SafeSDK instance used by the Palmera instance.
   * @returns {Safe} The SafeSDK instance used by the Palmera instance.
   */
  getSafeSDK(): Safe {
    return this.#protocolKit
  }

  //#region Palmera module
  /**
   * Creates a SafeTransaction to enable the Palmera module.
   @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async enableModuleTx(): Promise<SafeTransaction> {
    return this.#protocolKit.createEnableModuleTx(this.#moduleAddress)
  }

  /**
   * Checks if the Palmera module is enabled.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the Palmera module is enabled.
   */
  async isModuleEnabled(): Promise<boolean> {
    return this.#protocolKit.isModuleEnabled(this.#moduleAddress)
  }

  /**
   * Creates a SafeTransaction to disable the Palmera module.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async disableModuleTx(): Promise<SafeTransaction> {
    return this.#protocolKit.createDisableModuleTx(this.#moduleAddress)
  }
  //#endregion

  //#region Palmera guard
  /**
   * Creates a SafeTransaction to enable the Palmera guard.
   @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async enableGuardTx(): Promise<SafeTransaction> {
    return this.#protocolKit.createEnableGuardTx(this.#guardAddress)
  }

  /**
   * Checks if the Palmera guard is enabled.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the Palmera guard is enabled.
   */
  async isGuardEnabled(): Promise<boolean> {
    const guard = await this.#protocolKit.getGuard()
    return guard !== zeroAddress
  }

  /**
   * Creates a Safe Transaction to disable the Palmera guard.
   @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async disableGuardTx(): Promise<SafeTransaction> {
    return this.#protocolKit.createDisableGuardTx()
  }
  //#endregion

  /**
   * Encodes the inner transaction data to build a transaction on behalf.
   * @param palmeraTransaction  The transaction data to encode.
   * @returns {Promise<SafeTransaction>}  A promise that resolves to the encoded transaction data.
   */
  async encodeTransactionOnBehalfTx(palmeraTransaction: PalmeraTransactionData): Promise<string> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getTransactionHash',
      args: [
        palmeraTransaction.org,
        palmeraTransaction.superSafe,
        palmeraTransaction.targetSafe,
        palmeraTransaction.to as Hex,
        BigInt(palmeraTransaction.value),
        palmeraTransaction.data as Hex,
        palmeraTransaction.nonce,
      ],
    })

    return this.#ethCall<string>(this.#moduleAddress, data)
  }

  //#region Read functions
  /**
   * Checks if a specific organization has the allowed feature activated.
   * @param {Hex} orgHash The organization hash used to check if the feature is enabled, If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * (can be retrieved using `getOrgHashBySafe`)
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the feature is allowed.
   */
  async allowFeature(orgHash?: OrgHash): Promise<boolean> {
    const param = orgHash ? orgHash : this.#orgHash

    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'allowFeature',
      args: [param],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if an external account (EOA) has authorized a root Safe to assign the Safe Lead role.
   * @param {AllowedSafeRolesParams} AllowedSafeRolesParams
   * @param {Hex} AllowedSafeRolesParams.address The user address (EOA or external Safe) to check.
   * @param {Hex} AllowedSafeRolesParams.rootSafeAddress The address of the root Safe to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the external account has authorized the root Safe to assign the Safe Lead role.
   */
  async allowedSafeRoles({ address, rootSafeAddress }: AllowedSafeRolesParams): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'allowedSafeRoles',
      args: [address, rootSafeAddress],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Returns the address of the Palmera Roles contract.
   * @returns {Promise<string>} A promise that resolves to the address of the Palmera Roles contract.
   */
  async authority(): Promise<string> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'authority',
      args: [],
    })

    return this.#ethCall<string>(this.#moduleAddress, data)
  }

  /**
   * Checks if the denyHelper is enabled or disabled in an organization.
   * @param {Hex} orgHash  The organization hash used to check if the denyHelper is enabled or disabled. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * (can be retrieved using `getOrgHashBySafe`)
   * @see getOrgHashBySafe
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the denyHelper is enabled.
   */
  async denyFeature(orgHash?: OrgHash): Promise<boolean> {
    const param = orgHash ? orgHash : this.#orgHash

    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'denyFeature',
      args: [param],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Returns the maximum allowed depth of the organizational tree for a specific organization.
   * @param {Hex} orgHash The organization hash used to get the depth limit. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * (can be retrieved using `getOrgHashBySafe`)
   * @see getOrgHashBySafe
   * @returns {Promise<bigint>} A promise that resolves to the maximum allowed depth of the organizational tree.
   */
  async depthTreeLimit(orgHash?: Hex): Promise<bigint> {
    const param = orgHash ? orgHash : this.#orgHash

    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'depthTreeLimit',
      args: [param],
    })

    return this.#ethCall<bigint>(this.#moduleAddress, data, BigInt)
  }

  /**
   * Checks if a user has a specific role in the Safe.
   * @param {DoesUserHaveRoleParams} DoesUserHaveRoleParams
   * @param {bigint} DoesUserHaveRoleParams.safeId The Safe ID to check.
   * @param {number} DoesUserHaveRoleParams.role The role being verified.
   * @param {Hex} DoesUserHaveRoleParams.user The user address being verified.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the user has the specified role.
   */
  async doesUserHaveRole({ safeId, role, user }: DoesUserHaveRoleParams): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'doesUserHaveRole',
      args: [safeId, user, role],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Returns the ID of the blockchain where the contract is deployed.
   * @returns {Promise<bigint>} A promise that resolves to the ID of the blockchain where the contract is deployed.
   */
  async getChainId(): Promise<bigint> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getChainId',
      args: [],
    })

    return this.#ethCall<bigint>(this.#moduleAddress, data, BigInt)
  }

  /**
   * Gets the organization hash for a given Safe ID.
   * @see getSafeIdBySafe
   * @param {bigint} safeId The Safe ID to get the organization hash for.
   * @returns {Promise<Hex>} A promise that resolves to the organization hash.
   */
  async getOrgBySafe(safeId: bigint): Promise<Hex> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getOrgBySafe',
      args: [safeId],
    })

    return this.#ethCall<Hex>(this.#moduleAddress, data)
  }

  /**
   * Gets the organization hash for a given Safe address. An organization hash is a unique ID that represents an organization in the Palmera system.
   * @param {Hex} safeAddress The Safe's address to get the organization hash for.
   * @returns {Promise<Hex>} A promise that resolves to the organization hash.
   */
  async getOrgHashBySafe(safeAddress: Hex): Promise<Hex> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getOrgHashBySafe',
      args: [safeAddress],
    })

    return this.#ethCall<Hex>(this.#moduleAddress, data)
  }

  /**
   * Gets the previous user in the denyHelper list. The denyHelper list tracks users who have been denied access to certain features or permissions in an organization.
   * @param {GetPrevUserParams} GetPrevUserParams
   * @param {Hex} GetPrevUserParams.orgHash The organization hash used to get the previous user. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * (can be retrieved using `getOrgHashBySafe`)
   * @param {Hex} GetPrevUserParams.address The wallet address to remove from the list.
   * @returns {Promise<string>} A promise that resolves to the previous user in the denyHelper list.
   */
  async getPrevUser({ orgHash = this.#orgHash, address }: GetPrevUserParams): Promise<string> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getPrevUser',
      args: [orgHash, address],
    })

    return this.#ethCall<string>(this.#moduleAddress, data)
  }

  /**
   * Gets the Root Safe ID for a given Safe ID.
   * @param {bigint} safeId The Safe ID to get the Root Safe ID for.
   * @returns {Promise<bigint>} A promise that resolves to the Root Safe ID.
   */
  async getRootSafe(safeId: bigint): Promise<bigint> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getRootSafe',
      args: [safeId],
    })

    return this.#ethCall<bigint>(this.#moduleAddress, data)
  }

  /**
   *  Gets the wallet address of a Safe for a given Safe ID.
   * @param {bigint} safeId The Safe ID to get the wallet address for.
   * @returns {Promise<Hex>} A promise that resolves to the Safe's wallet address.
   */
  async getSafeAddress(safeId: bigint): Promise<Hex> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getSafeAddress',
      args: [safeId],
    })

    return this.#ethCall<Hex>(this.#moduleAddress, data)
  }

  /**
   * Gets the Safe ID based on the organization hash and Safe address.
   * @param {GetSafeIdBySafeParams} GetSafeIdBySafeParams
   * @param {Hex} GetSafeIdBySafeParams.orgHash The organization hash used to get the Safe ID. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * (can be retrieved using `getOrgHashBySafe`)
   * @param {Hex} GetSafeIdBySafeParams.safeAddress The Safe address to get the Safe ID for.
   * @returns {Promise<bigint>} A promise that resolves to the Safe ID.
   */
  async getSafeIdBySafe({ orgHash = this.#orgHash, safeAddress }: GetSafeIdBySafeParams): Promise<bigint> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getSafeIdBySafe',
      args: [orgHash, safeAddress],
    })

    return this.#ethCall<bigint>(this.#moduleAddress, data, BigInt)
  }

  /**
   * Provides detailed information about a specific Safe.
   * @param {bigint} safeId The Safe ID.
   * @returns {Promise<GetSafeInfoResult>} A promise that resolves to the Safe info.
   */
  async getSafeInfo(safeId: bigint): Promise<GetSafeInfoResult> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getSafeInfo',
      args: [safeId],
    })

    const result = await this.#ethCall(this.#moduleAddress, data)
    const decodedResult = decodeFunctionResult({
      abi: palmeraModule.abi,
      functionName: 'getSafeInfo',
      data: result as Hex,
    })

    const [tier, name, lead, safe, childs, superSafe] = decodedResult
    return {
      tier,
      name,
      lead,
      safe,
      childs: [...childs],
      superSafe,
    }
  }

  /**
   * Generates the transaction hash for executing a transaction on behalf of a Safe.
   * use the orgHash of the Safe with which the SDK was initialized.
   * use the Safe address as SuperSafe address of the Safe with which the SDK was initialized.
   * @param {GetTransactionHashParams} GetTransactionHashParams
   * @param {Hex} GetTransactionHashParams.targetSafeAddress The target Safe address.
   * @param {Hex} GetTransactionHashParams.to The recipient address.
   * @param {bigint} GetTransactionHashParams.value The value to send (in wei).
   * @param {Hex} GetTransactionHashParams.data The data to send.
   * @param {bigint} GetTransactionHashParams.nonce The transaction nonce.
   * @returns {Promise<string>} A promise that resolves to the transaction hash.
   */
  async getTransactionHash({ targetSafeAddress, to, value, data, nonce }: GetTransactionHashParams): Promise<string> {
    const orgHash = this.#orgHash
    const superSafeAddress = this.#safeAddress

    const encoded: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'getTransactionHash',
      args: [orgHash, superSafeAddress, targetSafeAddress, to, value, data, nonce],
    })

    return this.#ethCall<string>(this.#moduleAddress, encoded)
  }

  /**
   * Checks if a Safe has permission over a target Safe.
   * use the orgHash of the Safe with which the SDK was initialized.
   * use the Safe address as SuperSafe address of the Safe with which the SDK was initialized.
   * @param {Hex} targetSafeAddress Safe address to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the Safe has permission over the target Safe.
   */
  async hasNotPermissionOverTarget(targetSafeAddress: Hex): Promise<boolean> {
    const safeAddress = this.#safeAddress
    const orgHash = this.#orgHash
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'hasNotPermissionOverTarget',
      args: [safeAddress, orgHash, targetSafeAddress],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Returns the total number of Safes in the module.
   * @returns {Promise<bigint>} A promise that resolves to the number of Safes in the module.
   */
  async indexId(): Promise<bigint> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'indexId',
      args: [],
    })

    return this.#ethCall<bigint>(this.#moduleAddress, data, BigInt)
  }

  /**
   * Checks if a Safe has been invalidated or blacklisted within an organization. This invalidation applies to the Safe's tier and restricts it within the organization's environment.
   * @param {Hex} address The Safe address to check.
   * @returns {Promise<bigint>} A promise that resolves to a bigint indicating the invalidated Safe ID. If zero, no restrictions; otherwise, the Safe is blacklisted within the organization.
   */
  async invalidatedSafeId(address: Hex): Promise<bigint> {
    const orgHash = this.#orgHash
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'invalidatedSafeId',
      args: [orgHash, address],
    })

    return this.#ethCall<bigint>(this.#moduleAddress, data, BigInt)
  }

  /**
   * Checks if the width or depth limit of a Safe's organizational tree has been reached.
   * @param {bigint} superSafeId The SuperSafe ID.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the limit has been reached.
   */
  async isLimitReached(superSafeId: bigint): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isLimitReached',
      args: [superSafeId],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if an address is listed in the denyHelper.
   * @param {IsListedParams} IsListedParams
   * @param {Hex} IsListedParams.orgHash The organization hash used to check if the address is listed. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * @param {Hex} IsListedParams.wallet The wallet address to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the address is listed.
   */
  async isListed({ orgHash = this.#orgHash, wallet }: IsListedParams): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isListed',
      args: [orgHash, wallet],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if an organization is registered.
   * @param {Hex} orgHash The organization hash to check. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the organization is registered.
   */
  async isOrganizationRegistered(orgHash = this.#orgHash): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isOrgRegistered',
      args: [orgHash],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if a Safe has been removed or disconnected.
   * @param {IsPendingRemoveParams} IsPendingRemoveParams
   * @param {bigint} IsPendingRemoveParams.rootSafeId The root Safe ID.
   * @param {bigint} IsPendingRemoveParams.safeId The Safe ID.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the Safe has been removed.
   */
  async isPendingRemove({ rootSafeId, safeId }: IsPendingRemoveParams): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isPendingRemove',
      args: [rootSafeId, safeId],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if a given Safe is a Root Safe.
   * @param {IsRootSafeOfParams} IsRootSafeOfParams
   * @param {Hex} IsRootSafeOfParams.rootSafeAddress The address of the Root Safe.
   * @param {bigint} IsRootSafeOfParams.safeId The Safe ID to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the Safe is a Root Safe.
   */
  async isRootSafeOf({ rootSafeAddress, safeId }: IsRootSafeOfParams): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isRootSafeOf',
      args: [rootSafeAddress, safeId],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if the provided address is a registered Safe
   * @param {Hex} address The address to check
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the address is a registered Safe
   */
  async isSafe(address: Hex): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isSafe',
      args: [address],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if a user is the lead for a given Safe and verifies permissions such as ownership modification and execution.
   * @param {Object} IsSafeLeadParams
   * @param {bigint} IsSafeLeadParams.safeId The Safe ID to check. If not provided, the Safe ID of the Safe with which the SDK was initialized will be used.
   * @param {Hex} IsSafeLeadParams.userAddress The user's wallet address to check.
   * @param {boolean} IsSafeLeadParams.checkExecOnBehalf Indicates whether to check if the user can execute transactions on behalf of the Safe.
   * @param {boolean} IsSafeLeadParams.checkModifyOwner Indicates whether to check if the user can modify the Safe's owner.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the user is the Safe's lead.
   */
  async isSafeLead({ safeId, userAddress, checkExecOnBehalf, checkModifyOwner }: IsSafeLeadParams): Promise<boolean> {
    const safeIdParam = safeId ? safeId : await this.getSafeIdBySafe({ safeAddress: this.#safeAddress })

    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isSafeLead',
      args: [safeIdParam, userAddress, checkModifyOwner, checkExecOnBehalf],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if a Safe is registered in any organization.
   * @param {Hex} SafeAddress The Safe address to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the Safe is registered.
   */
  async isSafeRegistered(SafeAddress: Hex): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isSafeRegistered',
      args: [SafeAddress],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if a given Safe is the parent (SuperSafe) of another Safe.
   * @param {object} IsSuperSafeParams
   * @param {bigint} IsSuperSafeParams.safeId The Safe ID to check.
   * @param {bigint} IsSuperSafeParams.superSafeId The SuperSafe ID to check.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the parent-child relationship exists.
   */
  async isSuperSafe({ safeId, superSafeId }: IsSuperSafeParams): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isSuperSafe',
      args: [superSafeId, safeId],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Checks if a Safe is part of a complete hierarchical tree. A complete hierarchical tree means all the Safes connected under a SuperSafe, showing all relationships in an organization's Safe structure.
   * @param {Object} IsTreeMemberParams
   * @param {bigint} IsTreeMemberParams.superSafeId The SuperSafe ID.
   * @param {bigint} IsTreeMemberParams.safeId The Safe ID to check if it is a member of the SuperSafe.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the Safe is part of the tree.
   */
  async isTreeMember({ superSafeId, safeId }: IsTreeMemberParams): Promise<boolean> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'isTreeMember',
      args: [superSafeId, safeId],
    })

    return this.#ethCall<boolean>(this.#moduleAddress, data, Boolean)
  }

  /**
   * Returns the total number of addresses in the denyHelper list for a given organization.
   * @param orgHash The organization hash used to get the number of addresses in the denyHelper list. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * @returns {Promise<bigint>} A promise that resolves to the number of addresses in the denyHelper list.
   */
  async listCount(orgHash = this.#orgHash): Promise<bigint> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'listCount',
      args: [orgHash],
    })

    return this.#ethCall<bigint>(this.#moduleAddress, data, BigInt)
  }

  /**
   * Gets the next available nonce for executing transactions for an organization. A 'nonce' is a unique number used only once to prevent duplicate transactions and to ensure that each transaction is carried out in the correct order.
   * @param orgHash The organization hash used to get the nonce. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * @returns {Promise<bigint>} A promise that resolves to the next available nonce.
   */
  async getNonce(orgHash = this.#orgHash): Promise<bigint> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'orgNonce',
      args: [orgHash],
    })
    return this.#ethCall<bigint>(this.#moduleAddress, data, BigInt)
  }

  async domainSeparator(): Promise<string> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'domainSeparator',
      args: [],
    })

    return this.#ethCall<string>(this.#moduleAddress, data)
  }

  /**
   * Encodes the transaction data to build a transaction on behalf.
   * @returns {Promise<string>} A promise that resolves to the encoded transaction data.
   */
  async encodeTransactionData({ targetSafe, to, value, data, nonce }: EncodeTransactionDataParams): Promise<string> {
    const safeAddress = this.#safeAddress as Hex
    const orgHash = this.#orgHash

    const encoded: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'encodeTransactionData',
      args: [orgHash, safeAddress, targetSafe, to, value, data, nonce],
    })

    return this.#ethCall<string>(this.#moduleAddress, encoded)
  }

  //#endregion

  //#region Write functions

  /**
   * Creates a batch Safe transaction to enable the Palmera module and guard.
   @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async setUpSafeTx(): Promise<SafeTransaction> {
    const enableModuleTx = await this.enableModuleTx()
    const enableGuardTx = await this.enableGuardTx()

    return this.#protocolKit.createTransaction({
      transactions: [enableModuleTx.data, enableGuardTx.data],
    })
  }

  async addExternalModulesTx(addresses: Hex[], options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'addExternalModules',
      args: [addresses],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to add a new owner and set a new threshold in a child Safe.
   * @param {AddOwnerWithThresholdParams} AddOwnerWithThresholdParams
   * @param {Hex} AddOwnerWithThresholdParams.owner The wallet address to add as an owner.
   * @param {bigint} AddOwnerWithThresholdParams.threshold The new threshold required to execute. transactions.
   * @param {Hex} AddOwnerWithThresholdParams.targetSafe The target Safe address to add the owner to.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async addOwnerWithThresholdTx(
    { owner, threshold, targetSafe }: AddOwnerWithThresholdParams,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const orgHash = this.#orgHash

    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'addOwnerWithThreshold',
      args: [owner, threshold, targetSafe, orgHash],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to add a Safe as child of another Safe.
   * @param {Object} AddSafeTxParams
   * @param {Hex} AddSafeTxParams.superSafeAddress The address of the super safe that will be the parent of the new safe.
   * @param {string} AddSafeTxParams.name The name of the safe to be added as child safe.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async addSafeTx(
    { superSafeAddress, name }: AddSafeTxParams,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const orgHash = await this.getOrgHashBySafe(superSafeAddress)
    const superSafeId = await this.getSafeIdBySafe({ orgHash, safeAddress: superSafeAddress })

    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'addSafe',
      args: [superSafeId, name],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to add wallet addresses to the list, the list behavior is determined by the approach used in the Owner Manager.
   * @param addresses The wallet addresses to add to the list.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async addToListTx(addresses: Hex[], options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'addToList',
      args: [addresses],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to disable the denyHelper feature in an organization.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async disableDenyHelperTx(options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'disableDenyHelper',
      args: [],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to disconnect a Safe from the organizational tree. Call must come from the root safe
   * @param safeId The Safe ID to disconnect.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async disconnectSafeTx(safeId: bigint, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'disconnectSafe',
      args: [safeId, BigInt(50)],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  async dropExternalModulesTx(module: Hex, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'dropExternalModules',
      args: [module, BigInt(50)],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to drop wallet addresses from the list, the list behavior is determined by the approach used in the Owner Manager.
   * @param address The wallet address to drop from the list.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async dropFromListTx(address: Hex, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'dropFromList',
      args: [address],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to enable the Allowlist feature in an organization.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async enableAllowListTx(options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'enableAllowlist',
      args: [],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to enable the DenyList feature in an organization.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async enableDenyListTx(options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'enableDenylist',
      args: [],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to execute a transaction on behalf of a Safe.
   * @param {ExecTransactionOnBehalfTxParams} ExecTransactionOnBehalfTxParams
   * @param {PalmeraTransactionData} ExecTransactionOnBehalfTxParams.palmeraTransaction The transaction data to execute. @see encodeTransactionOnBehalfTx
   * @param {string} ExecTransactionOnBehalfTxParams.signatures The signatures required to execute the transaction.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async execTransactionOnBehalfTx(
    { palmeraTransaction, signatures }: ExecTransactionOnBehalfTxParams,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'execTransactionOnBehalf',
      args: [
        palmeraTransaction.org,
        palmeraTransaction.superSafe,
        palmeraTransaction.targetSafe,
        palmeraTransaction.to as Hex,
        BigInt(palmeraTransaction.value),
        palmeraTransaction.data as Hex,
        signatures,
      ],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  async invalidateSafeTx(safeId: bigint, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'invalidateSafe',
      args: [safeId],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to promote a Safe as a Root Safe.
   * @param {bigint} safeId The Safe ID to promote.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async promoteRootTx(safeId: bigint, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'promoteRoot',
      args: [safeId],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to register an organization.
   * @param {string} orgName The name of the organization to register.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async registerOrganizationTx(orgName: string, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'registerOrg',
      args: [orgName],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to remove a Safe owner.
   * @param {RemoveOwnerParams} RemoveOwnerParams
   * @param {Hex} RemoveOwnerParams.prevOwner The previous owner to remove.
   * @param {Hex} RemoveOwnerParams.ownerRemoved The wallet address of the owner to remove.
   * @param {bigint} RemoveOwnerParams.theshold The new threshold of the Safe.
   * @param {Hex} RemoveOwnerParams.targetSafe The Safe address to remove the owner from.
   * @param {Hex} RemoveOwnerParams.orgHash The organization hash used to remove the owner. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async removeOwnerTx(
    { prevOwner, ownerRemoved, theshold, targetSafe, orgHash = this.#orgHash }: RemoveOwnerParams,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'removeOwner',
      args: [prevOwner, ownerRemoved, theshold, targetSafe, orgHash],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to remove a Safe, and reassign its children to the SuperSafe.
   * @param {BigInt} safeId The Safe ID to remove.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async removeSafeTx(safeId: bigint, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'removeSafe',
      args: [safeId],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to remove whole tree of a RootSafe.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async removeWholeTreeTx(options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'removeWholeTree',
      args: [BigInt(50)],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  async setAllowedSafeRolesTx(
    { address, enabled }: SetAllowedSafeRolesParams,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'setAllowedSafeRoles',
      args: [address, enabled],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  async #setAuthorityTx(newAuthority: Hex, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'setAuthority',
      args: [newAuthority],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  async #setOwnerTx(newOwner: Hex, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'setOwner',
      args: [newOwner],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to set the role of a user in an organization.
   * @param {SetRoleParams} SetRoleParams
   * @param {string} SetRoleParams.role The role to set.
   * @param {Hex} SetRoleParams.user The wallet address of the user to set the role for.
   * @param {bigint} SetRoleParams.safeId The Safe ID to set the role for.
   * @param {boolean} SetRoleParams.enabled The role status.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async setRoleTx(
    { role, user, safeId, enabled }: SetRoleParams,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'setRole',
      args: [role, user, safeId, enabled],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to update the depth and width limits of an organization.
   * @param {UpdateDepthLimitsParams} UpdateDepthLimitsParams
   * @param {bigint} UpdateDepthLimitsParams.newDeepLimit The new depth limit.
   * @param {bigint} UpdateDepthLimitsParams.newWidthLimit The new width limit.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async updateDepthLimitsTx(
    { newDeepLimit, newWidthLimit }: UpdateDepthLimitsParams,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'updateDepthLimits',
      args: [newDeepLimit, newWidthLimit],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  /**
   * Creates a Safe transaction to update the SuperSafe of a Safe. Call must come from the root safe.
   * @param {UpdateSuperParams} UpdateSuperParams
   * @param {bigint} UpdateSuperParams.safeId The Safe ID to update the SuperSafe for.
   * @param {bigint} UpdateSuperParams.newSuperSafeId The new SuperSafe ID.
   * @param {SafeTransactionOptionalProps} options Optional Safe transaction properties.
   * @returns {Promise<SafeTransaction>} A promise that resolves to a SafeTransaction.
   */
  async updateSuperTx(
    { safeId, newSuperSafeId }: UpdateSuperParams,
    options?: SafeTransactionOptionalProps,
  ): Promise<SafeTransaction> {
    const data: Hex = encodeFunctionData({
      abi: palmeraModule.abi,
      functionName: 'updateSuper',
      args: [safeId, newSuperSafeId],
    })

    return this.#createSafeTransaction(this.#moduleAddress, data, options)
  }

  //#endregion
}

export default Palmera
