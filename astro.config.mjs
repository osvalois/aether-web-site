import { defineConfig } from 'astro/config';
import { settings } from './src/data/settings';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: settings.site,
  integrations: [
    sitemap(),
    astroClientConfig(),
  ],
  vite: {
    ssr: {
      external: ["svgo"],
    },
    plugins: [
      {
        name: 'client-runtime-config',
        transformIndexHtml() {
          return [
            {
              tag: 'script',
              attrs: { type: 'module' },
              children: `import * as client from 'astro:client';`,
            },
          ];
        },
      },
    ],
  },
  output: 'server',
});

function astroClientConfig() {
  return {
    name: 'astro-client-config',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              {
                name: 'client-runtime-config',
                transformIndexHtml() {
                  return [
                    {
                      tag: 'script',
                      attrs: { type: 'module' },
                      children: `import * as client from 'astro:client';`,
                    },
                  ];
                },
              },
            ],
          },
        });
      },
    },
  };
}