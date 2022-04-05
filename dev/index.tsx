import { Entity } from '@backstage/catalog-model'
import { createDevApp } from '@backstage/dev-utils'
import { EntityProvider } from '@backstage/plugin-catalog-react'
import React from 'react'
import { HarborPage, harborPlugin, HarborWidget } from '../src/plugin'

const mockEntity: Entity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'mock-service',
    description: 'this is a mock service',
    annotations: {
      'goharbor.io/repository-slug': 'project/repo',
    },
  },
  spec: {
    lifecycle: 'production',
    type: 'service',
    owner: 'user:guest',
  },
}

createDevApp()
  .registerPlugin(harborPlugin)
  .addPage({
    element: (
      <EntityProvider entity={mockEntity}>
        <HarborPage />
        <HarborWidget />
      </EntityProvider>
    ),
    title: 'Root Page',
    path: '/backstage-plugin-harbor',
  })
  .render()
