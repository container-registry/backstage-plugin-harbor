import { Entity } from '@backstage/catalog-model'
import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api'
import { HarborApiClient, harborApiRef } from './api'
import { HARBOR_ANNOTATION_REPOSITORY } from './components/useHarborAppData'
import { rootRouteRef } from './routes'

export const harborPlugin = createPlugin({
  id: 'backstage-plugin-harbor',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: harborApiRef,
      deps: { discoveryApi: discoveryApiRef, fetchApi: fetchApiRef },
      factory: ({ discoveryApi, fetchApi }) =>
        new HarborApiClient({ discoveryApi, fetchApi }),
    }),
  ],
})

export const HarborWidget = harborPlugin.provide(
  createComponentExtension({
    name: 'HarborWidget',
    component: {
      lazy: () =>
        import('./components/HarborWidget').then((m) => m.HarborWidget),
    },
  })
)

export const HarborPage = harborPlugin.provide(
  createComponentExtension({
    name: 'HarborPage',
    component: {
      lazy: () =>
        import('./components/HarborDashboardPage').then(
          (m) => m.HarborDashboardPage
        ),
    },
  })
)

export const isHarborAvailable = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[HARBOR_ANNOTATION_REPOSITORY])
