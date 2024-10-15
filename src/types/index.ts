import { MetaTransactionData } from '@safe-global/safe-core-sdk-types'

export type Hex = `0x${string}`
export type OrgHash = `0x${string}`

export interface AddSafeTxParams {
  /**
   * The address of the super safe that will be the parent of the new safe
   */
  superSafeAddress: Hex
  /**
   * The name of the safe to be added as child safe.
   */
  name: string
}

export interface EncodeTransactionOnBehalfTxParams {
  /**
   * Transaction data, should be the same parameters used to enconde the transaction in encodeTransactionOnBehalfTx
   */
  palmeraTransaction: PalmeraTransactionData
  /**
   * The signature of the transaction
   */
  signatures: Hex
}

export type ExecTransactionOnBehalfTxParams = EncodeTransactionOnBehalfTxParams

/**
 * Parameters to create a new transaction data and additional parameters to enconde a transaction on behalf
 */
export interface PalmeraTransactionData extends MetaTransactionData {
  /**
   * Organization hash, if not provided, the organization hash of the Safe with which the SDK was initialized will be used
   */
  org: Hex
  /**
   * The address of the SuperSafe that will execute the transaction on behalf of the target Safe
   */
  superSafe: Hex
  /**
   * The child Safe address.
   */
  targetSafe: Hex
  /**
   * The organization's nonce. @see getNonce
   */
  nonce: bigint
}

export interface AddOwnerWithThresholdParams {
  /**
   * The wallet address to add as an owner.
   */
  owner: Hex
  /**
   * The new threshold required to execute.
   */
  threshold: bigint
  /**
   * The target Safe address to add the owner to.
   */
  targetSafe: Hex
}

export interface AllowedSafeRolesParams {
  /**
   * The user address (EOA or external Safe) to check.
   */
  address: Hex
  /**
   * The address of the root Safe to check.
   */
  rootSafeAddress: Hex
}

export interface DoesUserHaveRoleParams {
  /**
   * The Safe ID to check.
   */
  safeId: bigint
  /**
   * The user address being verified.
   */
  user: Hex
  /**
   * The role being verified.
   */
  role: number
}

export interface EncodeTransactionDataParams {
  targetSafe: `0x${string}`
  to: `0x${string}`
  value: bigint
  data: `0x${string}`
  nonce: bigint
}

export interface GetSafeIdBySafeParams {
  /**
   * The organization hash used to get the Safe ID. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   */
  orgHash?: OrgHash
  /**
   * The Safe address to get the Safe ID.
   */
  safeAddress: Hex
}

export interface GetPrevUserParams {
  /**
   * The organization hash used to get the Safe ID. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   */
  orgHash?: OrgHash
  /**
   * The wallet address to remove from the list.
   */
  address: Hex
}

export interface GetTransactionHashParams {
  targetSafeAddress: Hex
  to: Hex
  value: bigint
  data: Hex
  nonce: bigint
}

export interface IsListedParams {
  /**
   * The organization hash used to get the Safe ID. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   */
  orgHash?: OrgHash
  /**
   * The wallet address to check.
   */
  wallet: Hex
}

export interface IsPendingRemoveParams {
  /**
   * The root Safe ID.
   */
  rootSafeId: bigint
  /**
   * The wallet address to check.
   */
  safeId: bigint
}

export interface IsRootSafeOfParams {
  /**
   * The address of the Root Safe.
   */
  rootSafeAddress: Hex
  /**
   * The Safe ID to check.
   */
  safeId: bigint
}

export interface IsSafeLeadParams {
  /**
   * The Safe ID to check. If not provided, the Safe ID of the Safe with which the SDK was initialized will be used.
   */
  safeId?: bigint
  /**
   * The user's wallet address to check.
   */
  userAddress: Hex
  /**
   * Indicates whether to check if the user can modify the Safe's owner.
   */
  checkModifyOwner: boolean
  /**
   * Indicates whether to check if the user can execute transactions on behalf of the Safe.
   */
  checkExecOnBehalf: boolean
}

export interface IsSuperSafeParams {
  /**
   * The SuperSafe ID to check.
   */
  superSafeId: bigint
  /**
   * The Safe ID to check.
   */
  safeId: bigint
}

export interface IsTreeMemberParams {
  /**
   * The SuperSafe ID.
   */
  superSafeId: bigint
  /**
   * The Safe ID to check if it is a member of the SuperSafe.
   */
  safeId: bigint
}

export interface RemoveOwnerParams {
  /**
   * The previous owner to remove.
   */
  prevOwner: Hex
  /**
   * The wallet address of the owner to remove.
   */
  ownerRemoved: Hex
  /**
   * The new threshold of the Safe.
   */
  theshold: bigint
  /**
   * The Safe address to remove the owner from.
   */
  targetSafe: Hex
  /**
   * The organization hash used to get the Safe ID. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available.
   */
  orgHash?: OrgHash
}

export interface SetAllowedSafeRolesParams {
  address: Hex
  /**
   * boolean indicating if the address is allowed to be a super safe
   */
  enabled: boolean
}

export interface SetRoleParams {
  /**
   * The role to set.
   */
  role: number
  /**
   * The wallet address of the user to set the role for.
   */
  user: Hex
  /**
   * The Safe ID to set the role for.
   */
  safeId: bigint
  /**
   * The role status.
   */
  enabled: boolean
}

export interface UpdateDepthLimitsParams {
  /**
   * The new depth limit.
   */
  newDeepLimit: bigint
  /**
   * The new width limit.
   */
  newWidthLimit: bigint
}

export interface UpdateSuperParams {
  /**
   * The Safe ID to update the SuperSafe for.
   */
  safeId: bigint
  /**
   * The new SuperSafe ID.
   */
  newSuperSafeId: bigint
}

export interface GetSafeInfoResult {
  /**
   * The tier level of the Safe.
   */
  tier: number
  /**
   * The name of the Safe.
   */
  name: string
  /**
   * The lead Safe address.
   */
  lead: string
  /**
   * The multisig wallet address of the Safe.
   */
  safe: string
  /**
   * List of child Safes IDs.
   */
  childs: bigint[]
  /**
   * The super Safe ID.
   */
  superSafe: bigint
}
