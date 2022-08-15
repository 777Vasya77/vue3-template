import { ViteSSG } from 'vite-ssg';
import { setupLayouts } from 'virtual:generated-layouts';
import App from './App.vue';
import type { UserPlugin } from './types';
import generatedRoutes from '~pages';

import './styles/main.scss';

const routes = setupLayouts(generatedRoutes);

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  // install all plugins under `plugins/`
  Object.values(
    import.meta.glob<{ install: UserPlugin }>('./plugins/*.ts', {
      eager: true,
    }),
  ).forEach((i) => i.install?.(ctx));
});
