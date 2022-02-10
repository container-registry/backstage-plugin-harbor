import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { harborPlugin, EntityHarborContent } from '../src/plugin';

createDevApp()
  .registerPlugin(harborPlugin)
  .addPage({
    element: <EntityHarborContent />,
    title: 'Root Page',
    path: '/harbor'
  })
  .render();
