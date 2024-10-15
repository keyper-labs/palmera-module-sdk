import PALMERA_MODULE_V1 from './v1/palmeraModule.json'
import PALMERA_MODULE_V1_NON_DETERMINISTIC from './v1/palmeraModuleNonDeterministic.json'
import {
  AddressType,
  DeploymentFilter,
  SingletonDeploymentJSON,
  SingletonDeploymentNonDeterministicJSON,
} from './types'

const PALMERA_MODULE_DEPLOYMENTS = [PALMERA_MODULE_V1] as SingletonDeploymentJSON[]
const PALMERA_MODULE_DEPLOYMENTS_NON_DETERMINISTIC = [
  PALMERA_MODULE_V1_NON_DETERMINISTIC,
] as SingletonDeploymentNonDeterministicJSON[]

export const getPalmeraModuleDeployment = (filter?: DeploymentFilter) => {
  return findDeployment(filter, PALMERA_MODULE_DEPLOYMENTS)
}

const findDeployment = (
  filter: DeploymentFilter = {},
  deployments: SingletonDeploymentJSON[],
  type: AddressType = 'canonical',
) => {
  const { version, released, network } = filter
  const deploymentJson = deployments.find((deployment) => {
    if (version && deployment.version === version) return false
    if (typeof released === 'boolean' && deployment.released !== filter.released) return false
    if (network && !deployment.networkAddresses[network]) return false

    return true
  })

  if (!deploymentJson) return undefined
  if (!deploymentJson.deployments[type]) return undefined

  return deploymentJson.deployments[type].address
}

export const getPalmeraModuleDeploymentNonDeterministic = (filter?: DeploymentFilter) => {
  return findDeploymentNonDeterministic(filter, PALMERA_MODULE_DEPLOYMENTS_NON_DETERMINISTIC)
}

const findDeploymentNonDeterministic = (
  filter: DeploymentFilter = {},
  deployments: SingletonDeploymentNonDeterministicJSON[],
) => {
  const { version, released, network } = filter
  const deploymentJson = deployments.find((deployment) => {
    if (version && deployment.version === version) return false
    if (typeof released === 'boolean' && deployment.released !== filter.released) return false
    if (network && !deployment.networkAddress[network]) return false

    return true
  })

  if (!deploymentJson || !network) return undefined
  if (!deploymentJson.networkAddress[network]) return undefined

  return deploymentJson.networkAddress[network]
}
