import {
  createApiRef,
  DiscoveryApi,
  FetchApi,
} from '@backstage/core-plugin-api'

export interface harborApi {}

export const harborApiRef = createApiRef<harborApi>({
  id: 'plugin.harbor.service',
})

export type Options = {
  discoveryApi: DiscoveryApi
  fetchApi: FetchApi
  proxyPath?: string
}

export class HarborApiClient implements harborApi {
  // @ts-ignore
  private readonly discoveryApi: DiscoveryApi
  private readonly fetchApi: FetchApi

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi
    this.fetchApi = options.fetchApi
  }
}
