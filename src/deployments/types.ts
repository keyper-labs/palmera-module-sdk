import { Hex } from '../types'

export type AddressType = 'canonical' | 'eip155' | 'zksync'
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export interface DeploymentFilter {
  version?: string
  released?: boolean
  network?: string
}

export interface SingletonDeploymentJSON {
  released: boolean
  contractName: string
  version: string
  deployments: AtLeastOne<Record<AddressType, { address: string; codeHash: string }>>
  networkAddresses: Record<string, AddressType[]>
}

export interface SingletonDeploymentNonDeterministicJSON {
  released: boolean
  contractName: string
  version: string
  networkAddress: Record<string, Hex>
}
