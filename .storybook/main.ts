import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  "viteFinal": (config) => {
    // En Storybook 10, `@storybook/blocks` ya no es un paquete instalado por
    // addon-docs; se resuelve contra su propio export. Sin este alias, las
    // páginas MDX (`.doc.mdx`) no compilan en el build de preview.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@storybook/blocks": "@storybook/addon-docs/blocks",
    };
    return config;
  }
};
export default config;