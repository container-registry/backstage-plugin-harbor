
import { createDevApp } from '@backstage/dev-utils';
import { harborPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(harborPlugin)
  .render();
