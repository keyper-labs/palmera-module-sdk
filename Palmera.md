<a name="Palmera"></a>

## Palmera

The Palmera class provides a set of methods to interact with the Palmera module and guard.

**Kind**: global class

- [Palmera](#Palmera)

  - [.init(safe)](#Palmera.init) ⇒ [<code>Promise.&lt;Palmera&gt;</code>](#Palmera)
  - [.create(config)](#Palmera.create) ⇒ [<code>Promise.&lt;Palmera&gt;</code>](#Palmera)

  - [.getSafeSDK()](#Palmera+getSafeSDK) ⇒ <code>Safe</code>
  - [.enableModuleTx()](#Palmera+enableModuleTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.isModuleEnabled()](#Palmera+isModuleEnabled) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.disableModuleTx()](#Palmera+disableModuleTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.enableGuardTx()](#Palmera+enableGuardTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.isGuardEnabled()](#Palmera+isGuardEnabled) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.disableGuardTx()](#Palmera+disableGuardTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.encodeTransactionOnBehalfTx(palmeraTransaction)](#Palmera+encodeTransactionOnBehalfTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.allowFeature(orgHash)](#Palmera+allowFeature) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.allowedSafeRoles(AllowedSafeRolesParams)](#Palmera+allowedSafeRoles) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.authority()](#Palmera+authority) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.denyFeature(orgHash)](#Palmera+denyFeature) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.depthTreeLimit(orgHash)](#Palmera+depthTreeLimit) ⇒ <code>Promise.&lt;bigint&gt;</code>
  - [.doesUserHaveRole(DoesUserHaveRoleParams)](#Palmera+doesUserHaveRole) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.getChainId()](#Palmera+getChainId) ⇒ <code>Promise.&lt;bigint&gt;</code>
  - [.getOrgBySafe(safeId)](#Palmera+getOrgBySafe) ⇒ <code>Promise.&lt;Hex&gt;</code>
  - [.getOrgHashBySafe(safeAddress)](#Palmera+getOrgHashBySafe) ⇒ <code>Promise.&lt;Hex&gt;</code>
  - [.getPrevUser(GetPrevUserParams)](#Palmera+getPrevUser) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.getRootSafe(safeId)](#Palmera+getRootSafe) ⇒ <code>Promise.&lt;bigint&gt;</code>
  - [.getSafeAddress(safeId)](#Palmera+getSafeAddress) ⇒ <code>Promise.&lt;Hex&gt;</code>
  - [.getSafeIdBySafe(GetSafeIdBySafeParams)](#Palmera+getSafeIdBySafe) ⇒ <code>Promise.&lt;bigint&gt;</code>
  - [.getSafeInfo(safeId)](#Palmera+getSafeInfo) ⇒ <code>Promise.&lt;GetSafeInfoResult&gt;</code>
  - [.getTransactionHash(GetTransactionHashParams)](#Palmera+getTransactionHash) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.hasNotPermissionOverTarget(targetSafeAddress)](#Palmera+hasNotPermissionOverTarget) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.indexId()](#Palmera+indexId) ⇒ <code>Promise.&lt;bigint&gt;</code>
  - [.invalidatedSafeId(address)](#Palmera+invalidatedSafeId) ⇒ <code>Promise.&lt;bigint&gt;</code>
  - [.isLimitReached(superSafeId)](#Palmera+isLimitReached) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isListed(IsListedParams)](#Palmera+isListed) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isOrganizationRegistered(orgHash)](#Palmera+isOrganizationRegistered) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isPendingRemove(IsPendingRemoveParams)](#Palmera+isPendingRemove) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isRootSafeOf(IsRootSafeOfParams)](#Palmera+isRootSafeOf) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isSafe(address)](#Palmera+isSafe) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isSafeLead(IsSafeLeadParams)](#Palmera+isSafeLead) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isSafeRegistered(SafeAddress)](#Palmera+isSafeRegistered) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isSuperSafe(IsSuperSafeParams)](#Palmera+isSuperSafe) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.isTreeMember(IsTreeMemberParams)](#Palmera+isTreeMember) ⇒ <code>Promise.&lt;boolean&gt;</code>
  - [.listCount(orgHash)](#Palmera+listCount) ⇒ <code>Promise.&lt;bigint&gt;</code>
  - [.getNonce(orgHash)](#Palmera+getNonce) ⇒ <code>Promise.&lt;bigint&gt;</code>
  - [.encodeTransactionData()](#Palmera+encodeTransactionData) ⇒ <code>Promise.&lt;string&gt;</code>
  - [.setUpSafeTx()](#Palmera+setUpSafeTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.addOwnerWithThresholdTx(AddOwnerWithThresholdParams)](#Palmera+addOwnerWithThresholdTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.addSafeTx(AddSafeTxParams, options)](#Palmera+addSafeTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.addToListTx(addresses, options)](#Palmera+addToListTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.disableDenyHelperTx(options)](#Palmera+disableDenyHelperTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.disconnectSafeTx(safeId, options)](#Palmera+disconnectSafeTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.dropFromListTx(address, options)](#Palmera+dropFromListTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.enableAllowListTx(options)](#Palmera+enableAllowListTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.enableDenyListTx(options)](#Palmera+enableDenyListTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.execTransactionOnBehalfTx(ExecTransactionOnBehalfTxParams, options)](#Palmera+execTransactionOnBehalfTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.promoteRootTx(safeId, options)](#Palmera+promoteRootTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.registerOrganizationTx(orgName, options)](#Palmera+registerOrganizationTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.removeOwnerTx(RemoveOwnerParams)](#Palmera+removeOwnerTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.removeSafeTx(safeId, options)](#Palmera+removeSafeTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.removeWholeTreeTx(options)](#Palmera+removeWholeTreeTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.setRoleTx(SetRoleParams, options)](#Palmera+setRoleTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.updateDepthLimitsTx(UpdateDepthLimitsParams, options)](#Palmera+updateDepthLimitsTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>
  - [.updateSuperTx(UpdateSuperParams, options)](#Palmera+updateSuperTx) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

<a name="Palmera+getSafeSDK"></a>

### palmera.getSafeSDK() ⇒ <code>Safe</code>

Gets the SafeSDK instance used by the Palmera instance.

**Returns**: <code>Safe</code> - The SafeSDK instance used by the Palmera instance.  
<a name="Palmera+enableModuleTx"></a>

### palmera.enableModuleTx() ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a SafeTransaction to enable the Palmera module.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.  
<a name="Palmera+isModuleEnabled"></a>

### palmera.isModuleEnabled() ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if the Palmera module is enabled.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the Palmera module is enabled.  
<a name="Palmera+disableModuleTx"></a>

### palmera.disableModuleTx() ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a SafeTransaction to disable the Palmera module.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.  
<a name="Palmera+enableGuardTx"></a>

### palmera.enableGuardTx() ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a SafeTransaction to enable the Palmera guard.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.  
<a name="Palmera+isGuardEnabled"></a>

### palmera.isGuardEnabled() ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if the Palmera guard is enabled.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the Palmera guard is enabled.  
<a name="Palmera+disableGuardTx"></a>

### palmera.disableGuardTx() ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe Transaction to disable the Palmera guard.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.  
<a name="Palmera+encodeTransactionOnBehalfTx"></a>

### palmera.encodeTransactionOnBehalfTx(palmeraTransaction) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Encodes the inner transaction data to build a transaction on behalf.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to the encoded transaction data.

| Param              | Description                     |
| ------------------ | ------------------------------- |
| palmeraTransaction | The transaction data to encode. |

<a name="Palmera+allowFeature"></a>

### palmera.allowFeature(orgHash) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a specific organization has the allowed feature activated.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the feature is allowed.

| Param   | Type             | Description                                                                                                                                                                                                                               |
| ------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orgHash | <code>Hex</code> | The organization hash used to check if the feature is enabled, If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. (can be retrieved using `getOrgHashBySafe`) |

<a name="Palmera+allowedSafeRoles"></a>

### palmera.allowedSafeRoles(AllowedSafeRolesParams) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if an external account (EOA) has authorized a root Safe to assign the Safe Lead role.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the external account has authorized the root Safe to assign the Safe Lead role.

| Param                                  | Type                                | Description                                       |
| -------------------------------------- | ----------------------------------- | ------------------------------------------------- |
| AllowedSafeRolesParams                 | <code>AllowedSafeRolesParams</code> |                                                   |
| AllowedSafeRolesParams.address         | <code>Hex</code>                    | The user address (EOA or external Safe) to check. |
| AllowedSafeRolesParams.rootSafeAddress | <code>Hex</code>                    | The address of the root Safe to check.            |

<a name="Palmera+authority"></a>

### palmera.authority() ⇒ <code>Promise.&lt;string&gt;</code>

Returns the address of the Palmera Roles contract.

**Returns**: <code>Promise.&lt;string&gt;</code> - A promise that resolves to the address of the Palmera Roles contract.  
<a name="Palmera+denyFeature"></a>

### palmera.denyFeature(orgHash) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if the denyHelper is enabled or disabled in an organization.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the denyHelper is enabled.  
**See**: getOrgHashBySafe

| Param   | Type             | Description                                                                                                                                                                                                                                              |
| ------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orgHash | <code>Hex</code> | The organization hash used to check if the denyHelper is enabled or disabled. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. (can be retrieved using `getOrgHashBySafe`) |

<a name="Palmera+depthTreeLimit"></a>

### palmera.depthTreeLimit(orgHash) ⇒ <code>Promise.&lt;bigint&gt;</code>

Returns the maximum allowed depth of the organizational tree for a specific organization.

**Returns**: <code>Promise.&lt;bigint&gt;</code> - A promise that resolves to the maximum allowed depth of the organizational tree.  
**See**: getOrgHashBySafe

| Param   | Type             | Description                                                                                                                                                                                                                   |
| ------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orgHash | <code>Hex</code> | The organization hash used to get the depth limit. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. (can be retrieved using `getOrgHashBySafe`) |

<a name="Palmera+doesUserHaveRole"></a>

### palmera.doesUserHaveRole(DoesUserHaveRoleParams) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a user has a specific role in the Safe.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the user has the specified role.

| Param                         | Type                                | Description                      |
| ----------------------------- | ----------------------------------- | -------------------------------- |
| DoesUserHaveRoleParams        | <code>DoesUserHaveRoleParams</code> |                                  |
| DoesUserHaveRoleParams.safeId | <code>bigint</code>                 | The Safe ID to check.            |
| DoesUserHaveRoleParams.role   | <code>number</code>                 | The role being verified.         |
| DoesUserHaveRoleParams.user   | <code>Hex</code>                    | The user address being verified. |

<a name="Palmera+getChainId"></a>

### palmera.getChainId() ⇒ <code>Promise.&lt;bigint&gt;</code>

Returns the ID of the blockchain where the contract is deployed.

**Returns**: <code>Promise.&lt;bigint&gt;</code> - A promise that resolves to the ID of the blockchain where the contract is deployed.  
<a name="Palmera+getOrgBySafe"></a>

### palmera.getOrgBySafe(safeId) ⇒ <code>Promise.&lt;Hex&gt;</code>

Gets the organization hash for a given Safe ID.

**Returns**: <code>Promise.&lt;Hex&gt;</code> - A promise that resolves to the organization hash.  
**See**: getSafeIdBySafe

| Param  | Type                | Description                                   |
| ------ | ------------------- | --------------------------------------------- |
| safeId | <code>bigint</code> | The Safe ID to get the organization hash for. |

<a name="Palmera+getOrgHashBySafe"></a>

### palmera.getOrgHashBySafe(safeAddress) ⇒ <code>Promise.&lt;Hex&gt;</code>

Gets the organization hash for a given Safe address. An organization hash is a unique ID that represents an organization in the Palmera system.

**Returns**: <code>Promise.&lt;Hex&gt;</code> - A promise that resolves to the organization hash.

| Param       | Type             | Description                                          |
| ----------- | ---------------- | ---------------------------------------------------- |
| safeAddress | <code>Hex</code> | The Safe's address to get the organization hash for. |

<a name="Palmera+getPrevUser"></a>

### palmera.getPrevUser(GetPrevUserParams) ⇒ <code>Promise.&lt;string&gt;</code>

Gets the previous user in the denyHelper list. The denyHelper list tracks users who have been denied access to certain features or permissions in an organization.

**Returns**: <code>Promise.&lt;string&gt;</code> - A promise that resolves to the previous user in the denyHelper list.

| Param                     | Type                           | Description                                                                                                                                                                                                                     |
| ------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GetPrevUserParams         | <code>GetPrevUserParams</code> |                                                                                                                                                                                                                                 |
| GetPrevUserParams.orgHash | <code>Hex</code>               | The organization hash used to get the previous user. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. (can be retrieved using `getOrgHashBySafe`) |
| GetPrevUserParams.address | <code>Hex</code>               | The wallet address to remove from the list.                                                                                                                                                                                     |

<a name="Palmera+getRootSafe"></a>

### palmera.getRootSafe(safeId) ⇒ <code>Promise.&lt;bigint&gt;</code>

Gets the Root Safe ID for a given Safe ID.

**Returns**: <code>Promise.&lt;bigint&gt;</code> - A promise that resolves to the Root Safe ID.

| Param  | Type                | Description                              |
| ------ | ------------------- | ---------------------------------------- |
| safeId | <code>bigint</code> | The Safe ID to get the Root Safe ID for. |

<a name="Palmera+getSafeAddress"></a>

### palmera.getSafeAddress(safeId) ⇒ <code>Promise.&lt;Hex&gt;</code>

Gets the wallet address of a Safe for a given Safe ID.

**Returns**: <code>Promise.&lt;Hex&gt;</code> - A promise that resolves to the Safe's wallet address.

| Param  | Type                | Description                                |
| ------ | ------------------- | ------------------------------------------ |
| safeId | <code>bigint</code> | The Safe ID to get the wallet address for. |

<a name="Palmera+getSafeIdBySafe"></a>

### palmera.getSafeIdBySafe(GetSafeIdBySafeParams) ⇒ <code>Promise.&lt;bigint&gt;</code>

Gets the Safe ID based on the organization hash and Safe address.

**Returns**: <code>Promise.&lt;bigint&gt;</code> - A promise that resolves to the Safe ID.

| Param                             | Type                               | Description                                                                                                                                                                                                               |
| --------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GetSafeIdBySafeParams             | <code>GetSafeIdBySafeParams</code> |                                                                                                                                                                                                                           |
| GetSafeIdBySafeParams.orgHash     | <code>Hex</code>                   | The organization hash used to get the Safe ID. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. (can be retrieved using `getOrgHashBySafe`) |
| GetSafeIdBySafeParams.safeAddress | <code>Hex</code>                   | The Safe address to get the Safe ID for.                                                                                                                                                                                  |

<a name="Palmera+getSafeInfo"></a>

### palmera.getSafeInfo(safeId) ⇒ <code>Promise.&lt;GetSafeInfoResult&gt;</code>

Provides detailed information about a specific Safe.

**Returns**: <code>Promise.&lt;GetSafeInfoResult&gt;</code> - A promise that resolves to the Safe info.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| safeId | <code>bigint</code> | The Safe ID. |

<a name="Palmera+getTransactionHash"></a>

### palmera.getTransactionHash(GetTransactionHashParams) ⇒ <code>Promise.&lt;string&gt;</code>

Generates the transaction hash for executing a transaction on behalf of a Safe.
use the orgHash of the Safe with which the SDK was initialized.
use the Safe address as SuperSafe address of the Safe with which the SDK was initialized.

**Returns**: <code>Promise.&lt;string&gt;</code> - A promise that resolves to the transaction hash.

| Param                                      | Type                                  | Description                 |
| ------------------------------------------ | ------------------------------------- | --------------------------- |
| GetTransactionHashParams                   | <code>GetTransactionHashParams</code> |                             |
| GetTransactionHashParams.targetSafeAddress | <code>Hex</code>                      | The target Safe address.    |
| GetTransactionHashParams.to                | <code>Hex</code>                      | The recipient address.      |
| GetTransactionHashParams.value             | <code>bigint</code>                   | The value to send (in wei). |
| GetTransactionHashParams.data              | <code>Hex</code>                      | The data to send.           |
| GetTransactionHashParams.nonce             | <code>bigint</code>                   | The transaction nonce.      |

<a name="Palmera+hasNotPermissionOverTarget"></a>

### palmera.hasNotPermissionOverTarget(targetSafeAddress) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a Safe has permission over a target Safe.
use the orgHash of the Safe with which the SDK was initialized.
use the Safe address as SuperSafe address of the Safe with which the SDK was initialized.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the Safe has permission over the target Safe.

| Param             | Type             | Description            |
| ----------------- | ---------------- | ---------------------- |
| targetSafeAddress | <code>Hex</code> | Safe address to check. |

<a name="Palmera+indexId"></a>

### palmera.indexId() ⇒ <code>Promise.&lt;bigint&gt;</code>

Returns the total number of Safes in the module.

**Returns**: <code>Promise.&lt;bigint&gt;</code> - A promise that resolves to the number of Safes in the module.  
<a name="Palmera+invalidatedSafeId"></a>

### palmera.invalidatedSafeId(address) ⇒ <code>Promise.&lt;bigint&gt;</code>

Checks if a Safe has been invalidated or blacklisted within an organization. This invalidation applies to the Safe's tier and restricts it within the organization's environment.

**Returns**: <code>Promise.&lt;bigint&gt;</code> - A promise that resolves to a bigint indicating the invalidated Safe ID. If zero, no restrictions; otherwise, the Safe is blacklisted within the organization.

| Param   | Type             | Description                |
| ------- | ---------------- | -------------------------- |
| address | <code>Hex</code> | The Safe address to check. |

<a name="Palmera+isLimitReached"></a>

### palmera.isLimitReached(superSafeId) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if the width or depth limit of a Safe's organizational tree has been reached.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the limit has been reached.

| Param       | Type                | Description       |
| ----------- | ------------------- | ----------------- |
| superSafeId | <code>bigint</code> | The SuperSafe ID. |

<a name="Palmera+isListed"></a>

### palmera.isListed(IsListedParams) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if an address is listed in the denyHelper.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the address is listed.

| Param                  | Type                        | Description                                                                                                                                                                                  |
| ---------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IsListedParams         | <code>IsListedParams</code> |                                                                                                                                                                                              |
| IsListedParams.orgHash | <code>Hex</code>            | The organization hash used to check if the address is listed. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. |
| IsListedParams.wallet  | <code>Hex</code>            | The wallet address to check.                                                                                                                                                                 |

<a name="Palmera+isOrganizationRegistered"></a>

### palmera.isOrganizationRegistered(orgHash) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if an organization is registered.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the organization is registered.

| Param   | Type             | Description                                                                                                                                                    |
| ------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orgHash | <code>Hex</code> | The organization hash to check. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. |

<a name="Palmera+isPendingRemove"></a>

### palmera.isPendingRemove(IsPendingRemoveParams) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a Safe has been removed or disconnected.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the Safe has been removed.

| Param                            | Type                               | Description       |
| -------------------------------- | ---------------------------------- | ----------------- |
| IsPendingRemoveParams            | <code>IsPendingRemoveParams</code> |                   |
| IsPendingRemoveParams.rootSafeId | <code>bigint</code>                | The root Safe ID. |
| IsPendingRemoveParams.safeId     | <code>bigint</code>                | The Safe ID.      |

<a name="Palmera+isRootSafeOf"></a>

### palmera.isRootSafeOf(IsRootSafeOfParams) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a given Safe is a Root Safe.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the Safe is a Root Safe.

| Param                              | Type                            | Description                   |
| ---------------------------------- | ------------------------------- | ----------------------------- |
| IsRootSafeOfParams                 | <code>IsRootSafeOfParams</code> |                               |
| IsRootSafeOfParams.rootSafeAddress | <code>Hex</code>                | The address of the Root Safe. |
| IsRootSafeOfParams.safeId          | <code>bigint</code>             | The Safe ID to check.         |

<a name="Palmera+isSafe"></a>

### palmera.isSafe(address) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if the provided address is a registered Safe

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the address is a registered Safe

| Param   | Type             | Description          |
| ------- | ---------------- | -------------------- |
| address | <code>Hex</code> | The address to check |

<a name="Palmera+isSafeLead"></a>

### palmera.isSafeLead(IsSafeLeadParams) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a user is the lead for a given Safe and verifies permissions such as ownership modification and execution.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the user is the Safe's lead.

| Param                              | Type                 | Description                                                                                                     |
| ---------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| IsSafeLeadParams                   | <code>Object</code>  |                                                                                                                 |
| IsSafeLeadParams.safeId            | <code>bigint</code>  | The Safe ID to check. If not provided, the Safe ID of the Safe with which the SDK was initialized will be used. |
| IsSafeLeadParams.userAddress       | <code>Hex</code>     | The user's wallet address to check.                                                                             |
| IsSafeLeadParams.checkExecOnBehalf | <code>boolean</code> | Indicates whether to check if the user can execute transactions on behalf of the Safe.                          |
| IsSafeLeadParams.checkModifyOwner  | <code>boolean</code> | Indicates whether to check if the user can modify the Safe's owner.                                             |

<a name="Palmera+isSafeRegistered"></a>

### palmera.isSafeRegistered(SafeAddress) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a Safe is registered in any organization.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the Safe is registered.

| Param       | Type             | Description                |
| ----------- | ---------------- | -------------------------- |
| SafeAddress | <code>Hex</code> | The Safe address to check. |

<a name="Palmera+isSuperSafe"></a>

### palmera.isSuperSafe(IsSuperSafeParams) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a given Safe is the parent (SuperSafe) of another Safe.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating if the parent-child relationship exists.

| Param                         | Type                | Description                |
| ----------------------------- | ------------------- | -------------------------- |
| IsSuperSafeParams             | <code>object</code> |                            |
| IsSuperSafeParams.safeId      | <code>bigint</code> | The Safe ID to check.      |
| IsSuperSafeParams.superSafeId | <code>bigint</code> | The SuperSafe ID to check. |

<a name="Palmera+isTreeMember"></a>

### palmera.isTreeMember(IsTreeMemberParams) ⇒ <code>Promise.&lt;boolean&gt;</code>

Checks if a Safe is part of a complete hierarchical tree. A complete hierarchical tree means all the Safes connected under a SuperSafe, showing all relationships in an organization's Safe structure.

**Returns**: <code>Promise.&lt;boolean&gt;</code> - A promise that resolves to a boolean indicating whether the Safe is part of the tree.

| Param                          | Type                | Description                                              |
| ------------------------------ | ------------------- | -------------------------------------------------------- |
| IsTreeMemberParams             | <code>Object</code> |                                                          |
| IsTreeMemberParams.superSafeId | <code>bigint</code> | The SuperSafe ID.                                        |
| IsTreeMemberParams.safeId      | <code>bigint</code> | The Safe ID to check if it is a member of the SuperSafe. |

<a name="Palmera+listCount"></a>

### palmera.listCount(orgHash) ⇒ <code>Promise.&lt;bigint&gt;</code>

Returns the total number of addresses in the denyHelper list for a given organization.

**Returns**: <code>Promise.&lt;bigint&gt;</code> - A promise that resolves to the number of addresses in the denyHelper list.

| Param   | Description                                                                                                                                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orgHash | The organization hash used to get the number of addresses in the denyHelper list. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. |

<a name="Palmera+getNonce"></a>

### palmera.getNonce(orgHash) ⇒ <code>Promise.&lt;bigint&gt;</code>

Gets the next available nonce for executing transactions for an organization. A 'nonce' is a unique number used only once to prevent duplicate transactions and to ensure that each transaction is carried out in the correct order.

**Returns**: <code>Promise.&lt;bigint&gt;</code> - A promise that resolves to the next available nonce.

| Param   | Description                                                                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orgHash | The organization hash used to get the nonce. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. |

<a name="Palmera+encodeTransactionData"></a>

### palmera.encodeTransactionData() ⇒ <code>Promise.&lt;string&gt;</code>

Encodes the transaction data to build a transaction on behalf.

**Returns**: <code>Promise.&lt;string&gt;</code> - A promise that resolves to the encoded transaction data.  
<a name="Palmera+setUpSafeTx"></a>

### palmera.setUpSafeTx() ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a batch Safe transaction to enable the Palmera module and guard.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.  
<a name="Palmera+addOwnerWithThresholdTx"></a>

### palmera.addOwnerWithThresholdTx(AddOwnerWithThresholdParams) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to add a new owner and set a new threshold in a child Safe.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param                                  | Type                                     | Description                                          |
| -------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| AddOwnerWithThresholdParams            | <code>AddOwnerWithThresholdParams</code> |                                                      |
| AddOwnerWithThresholdParams.owner      | <code>Hex</code>                         | The wallet address to add as an owner.               |
| AddOwnerWithThresholdParams.threshold  | <code>bigint</code>                      | The new threshold required to execute. transactions. |
| AddOwnerWithThresholdParams.targetSafe | <code>Hex</code>                         | The target Safe address to add the owner to.         |

<a name="Palmera+addSafeTx"></a>

### palmera.addSafeTx(AddSafeTxParams, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to add a Safe as child of another Safe.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param                            | Type                                      | Description                                                            |
| -------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------- |
| AddSafeTxParams                  | <code>Object</code>                       |                                                                        |
| AddSafeTxParams.superSafeAddress | <code>Hex</code>                          | The address of the super safe that will be the parent of the new safe. |
| AddSafeTxParams.name             | <code>string</code>                       | The name of the safe to be added as child safe.                        |
| options                          | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties.                                  |

<a name="Palmera+addToListTx"></a>

### palmera.addToListTx(addresses, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to add wallet addresses to the list, the list behavior is determined by the approach used in the Owner Manager.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param     | Type                                      | Description                              |
| --------- | ----------------------------------------- | ---------------------------------------- |
| addresses |                                           | The wallet addresses to add to the list. |
| options   | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties.    |

<a name="Palmera+disableDenyHelperTx"></a>

### palmera.disableDenyHelperTx(options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to disable the denyHelper feature in an organization.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                           |
| ------- | ----------------------------------------- | ------------------------------------- |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties. |

<a name="Palmera+disconnectSafeTx"></a>

### palmera.disconnectSafeTx(safeId, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to disconnect a Safe from the organizational tree. Call must come from the root safe

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                           |
| ------- | ----------------------------------------- | ------------------------------------- |
| safeId  |                                           | The Safe ID to disconnect.            |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties. |

<a name="Palmera+dropFromListTx"></a>

### palmera.dropFromListTx(address, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to drop wallet addresses from the list, the list behavior is determined by the approach used in the Owner Manager.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                               |
| ------- | ----------------------------------------- | ----------------------------------------- |
| address |                                           | The wallet address to drop from the list. |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties.     |

<a name="Palmera+enableAllowListTx"></a>

### palmera.enableAllowListTx(options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to enable the Allowlist feature in an organization.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                           |
| ------- | ----------------------------------------- | ------------------------------------- |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties. |

<a name="Palmera+enableDenyListTx"></a>

### palmera.enableDenyListTx(options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to enable the DenyList feature in an organization.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                           |
| ------- | ----------------------------------------- | ------------------------------------- |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties. |

<a name="Palmera+execTransactionOnBehalfTx"></a>

### palmera.execTransactionOnBehalfTx(ExecTransactionOnBehalfTxParams, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to execute a transaction on behalf of a Safe.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param                                              | Type                                         | Description                                                       |
| -------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| ExecTransactionOnBehalfTxParams                    | <code>ExecTransactionOnBehalfTxParams</code> |                                                                   |
| ExecTransactionOnBehalfTxParams.palmeraTransaction | <code>PalmeraTransactionData</code>          | The transaction data to execute. @see encodeTransactionOnBehalfTx |
| ExecTransactionOnBehalfTxParams.signatures         | <code>string</code>                          | The signatures required to execute the transaction.               |
| options                                            | <code>SafeTransactionOptionalProps</code>    | Optional Safe transaction properties.                             |

<a name="Palmera+promoteRootTx"></a>

### palmera.promoteRootTx(safeId, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to promote a Safe as a Root Safe.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                           |
| ------- | ----------------------------------------- | ------------------------------------- |
| safeId  | <code>bigint</code>                       | The Safe ID to promote.               |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties. |

<a name="Palmera+registerOrganizationTx"></a>

### palmera.registerOrganizationTx(orgName, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to register an organization.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                               |
| ------- | ----------------------------------------- | ----------------------------------------- |
| orgName | <code>string</code>                       | The name of the organization to register. |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties.     |

<a name="Palmera+removeOwnerTx"></a>

### palmera.removeOwnerTx(RemoveOwnerParams) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to remove a Safe owner.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param                          | Type                           | Description                                                                                                                                                                    |
| ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RemoveOwnerParams              | <code>RemoveOwnerParams</code> |                                                                                                                                                                                |
| RemoveOwnerParams.prevOwner    | <code>Hex</code>               | The previous owner to remove.                                                                                                                                                  |
| RemoveOwnerParams.ownerRemoved | <code>Hex</code>               | The wallet address of the owner to remove.                                                                                                                                     |
| RemoveOwnerParams.theshold     | <code>bigint</code>            | The new threshold of the Safe.                                                                                                                                                 |
| RemoveOwnerParams.targetSafe   | <code>Hex</code>               | The Safe address to remove the owner from.                                                                                                                                     |
| RemoveOwnerParams.orgHash      | <code>Hex</code>               | The organization hash used to remove the owner. If it is not provided, the organization hash of the Safe with which the SDK was initialized will be used when it is available. |

<a name="Palmera+removeSafeTx"></a>

### palmera.removeSafeTx(safeId, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to remove a Safe, and reassign its children to the SuperSafe.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                           |
| ------- | ----------------------------------------- | ------------------------------------- |
| safeId  | <code>BigInt</code>                       | The Safe ID to remove.                |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties. |

<a name="Palmera+removeWholeTreeTx"></a>

### palmera.removeWholeTreeTx(options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to remove whole tree of a RootSafe.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param   | Type                                      | Description                           |
| ------- | ----------------------------------------- | ------------------------------------- |
| options | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties. |

<a name="Palmera+setRoleTx"></a>

### palmera.setRoleTx(SetRoleParams, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to set the role of a user in an organization.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param                 | Type                                      | Description                                         |
| --------------------- | ----------------------------------------- | --------------------------------------------------- |
| SetRoleParams         | <code>SetRoleParams</code>                |                                                     |
| SetRoleParams.role    | <code>string</code>                       | The role to set.                                    |
| SetRoleParams.user    | <code>Hex</code>                          | The wallet address of the user to set the role for. |
| SetRoleParams.safeId  | <code>bigint</code>                       | The Safe ID to set the role for.                    |
| SetRoleParams.enabled | <code>boolean</code>                      | The role status.                                    |
| options               | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties.               |

<a name="Palmera+updateDepthLimitsTx"></a>

### palmera.updateDepthLimitsTx(UpdateDepthLimitsParams, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to update the depth and width limits of an organization.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param                                 | Type                                      | Description                           |
| ------------------------------------- | ----------------------------------------- | ------------------------------------- |
| UpdateDepthLimitsParams               | <code>UpdateDepthLimitsParams</code>      |                                       |
| UpdateDepthLimitsParams.newDeepLimit  | <code>bigint</code>                       | The new depth limit.                  |
| UpdateDepthLimitsParams.newWidthLimit | <code>bigint</code>                       | The new width limit.                  |
| options                               | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties. |

<a name="Palmera+updateSuperTx"></a>

### palmera.updateSuperTx(UpdateSuperParams, options) ⇒ <code>Promise.&lt;SafeTransaction&gt;</code>

Creates a Safe transaction to update the SuperSafe of a Safe. Call must come from the root safe.

**Returns**: <code>Promise.&lt;SafeTransaction&gt;</code> - A promise that resolves to a SafeTransaction.

| Param                            | Type                                      | Description                              |
| -------------------------------- | ----------------------------------------- | ---------------------------------------- |
| UpdateSuperParams                | <code>UpdateSuperParams</code>            |                                          |
| UpdateSuperParams.safeId         | <code>bigint</code>                       | The Safe ID to update the SuperSafe for. |
| UpdateSuperParams.newSuperSafeId | <code>bigint</code>                       | The new SuperSafe ID.                    |
| options                          | <code>SafeTransactionOptionalProps</code> | Optional Safe transaction properties.    |

<a name="Palmera.init"></a>

### Palmera.init(safe) ⇒ [<code>Promise.&lt;Palmera&gt;</code>](#Palmera)

Initializes a new instance of the Palmera class.

**Kind**: static method of [<code>Palmera</code>](#Palmera)  
**Returns**: [<code>Promise.&lt;Palmera&gt;</code>](#Palmera) - A promise that resolves to an initialized Palmera instance.

| Param | Type              | Description                                                      |
| ----- | ----------------- | ---------------------------------------------------------------- |
| safe  | <code>Safe</code> | The SafeSDK instance to initialize the PalmeraSDK instance with. |

<a name="Palmera.create"></a>

### Palmera.create(config) ⇒ [<code>Promise.&lt;Palmera&gt;</code>](#Palmera)

Creates a new Safe instance and initializes a new Palmera instance with it.

**Kind**: static method of [<code>Palmera</code>](#Palmera)  
**Returns**: [<code>Promise.&lt;Palmera&gt;</code>](#Palmera) - A promise that resolves to an initialized Palmera instance.

| Param  | Type                    | Description                                              |
| ------ | ----------------------- | -------------------------------------------------------- |
| config | <code>SafeConfig</code> | The configuration object for creating the Safe instance. |
