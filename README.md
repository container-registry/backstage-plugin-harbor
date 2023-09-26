# Backstage Harbor plugin

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=container-registry_backstage-plugin-harbor&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=container-registry_backstage-plugin-harbor)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=container-registry_backstage-plugin-harbor&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=container-registry_backstage-plugin-harbor)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=container-registry_backstage-plugin-harbor&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=container-registry_backstage-plugin-harbor)

[//]: # (![npm]&#40;https://img.shields.io/npm/dt/@bestsellerit/backstage-plugin-harbor&#41;)

Welcome to the harbor plugin!
This plugin will show you information about your docker images within harbor

![Dashboard](docs/img/dashboard.png)
![Docker Image](docs/img/widget.png)

## Getting started

### Enabling frontend

```bash
yarn --cwd packages/app add @bestsellerit/backstage-plugin-harbor
```

```ts
// packages/app/src/plugins.ts
export { plugin as harbor } from '@bestsellerit/backstage-plugin-harbor'
```

```ts
// packages/app/src/components/catalog/EntityPage.tsx
import {
  HarborPage,
  HarborWidget,
  isHarborAvailable,
} from '@bestsellerit/backstage-plugin-harbor'

const serviceEntityPage = (
  <EntityPageLayout>
    // ...
    <EntityLayout.Route path="/harbor" title="Harbor" if={isHarborAvailable}>
      <HarborPage />
    </EntityLayout.Route>
  </EntityPageLayout>
)
```

```ts
// packages/app/src/components/catalog/EntityPage.tsx

const overviewContent = (
  <Grid container spacing={6} alignItems="stretch">
    // ...
    <EntitySwitch>
      <EntitySwitch.Case if={isHarborAvailable}>
        <Grid item>
          <HarborWidget />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
    ...
  </Grid>
)
```

### Enabling backend

```bash
yarn --cwd packages/backend add @bestsellerit/backstage-plugin-harbor-backend
```

Create a new file named `packages/backend/src/plugins/harbor.ts`, and add the following to it

```ts
import { createRouter } from '@bestsellerit/backstage-plugin-harbor-backend'
import { Router } from 'express'
import { PluginEnvironment } from '../types'

export default async function createPlugin({
  logger,
  config,
}: PluginEnvironment): Promise<Router> {
  return await createRouter({ logger, config })
}
```

And finally, wire this into the overall backend router. Edit `packages/backend/src/index.ts`

```ts
import harbor from './plugins/harbor';
// ...
async function main() {
  // ...
  const harborEnv = useHotMemoize(module, () => createEnv('harbor'));
  apiRouter.use('/harbor', await harbor(harborEnv));

```

## Configuration

The plugin requires configuration in the Backstage app-config.yaml to connect to harbors API.

```yaml
harbor:
  baseUrl: https://harbor.yourdomain.com
  username:
    $env: HARBOR_USERNAME
  password:
    $env: HARBOR_PASSWORD
```

Adding annotations and values to your component file.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-component
  description: 'A sample component with Harbor'
  annotations:
    goharbor.io/repository-slug: project/repository
```

## Contributing

Everyone is welcome to contribute to this repository. Feel free to raise [issues](https://github.com/BESTSELLER/backstage-plugin-harbor/issues) or to submit [Pull Requests.](https://github.com/BESTSELLER/backstage-plugin-harbor/pulls)

## History

This backsage plugin was initialy created by [BESTSELLER](https://github.com/BESTSELLER) and transferred to [container-registry](https://github.com/container-registry).
