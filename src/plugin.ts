import { Entity } from "@backstage/catalog-model";
import {
  createApiFactory,
  createPlugin,
  createComponentExtension,
  createRoutableExtension,
  createRouteRef,
  discoveryApiRef,
} from "@backstage/core-plugin-api";

import { HarborApiClient, harborApiRef } from "./api";
import { HARBOR_ANNOTATION_REPOSITORY } from "./components/useHarborAppData";

export const isHarborAvailable = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[HARBOR_ANNOTATION_REPOSITORY]);

export const entityContentRouteRef = createRouteRef({
  id: "Harbor Entity Content",
});

export const harborPlugin = createPlugin({
  id: "harbor",
  apis: [
    createApiFactory({
      api: harborApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new HarborApiClient({ discoveryApi }),
    }),
  ],
  routes: {
    entityContent: entityContentRouteRef,
  },
});

export const EntityHarborContent = harborPlugin.provide(
  createRoutableExtension({
    name: "HarborPage",
    component: () => import("./Router").then((m) => m.Router),
    mountPoint: entityContentRouteRef,
  })
);

export const EntityHarborWidgetCard = harborPlugin.provide(
  createComponentExtension({
    name: "HarborPage",
    component: {
      lazy: () =>
        import("./components/HarborWidget").then((m) => m.HarborWidget),
    },
  })
);
