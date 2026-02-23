import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ITThemeProvider } from '../src/index';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <ITThemeProvider>
        <Story />
      </ITThemeProvider>
    ),
  ],
};

export default preview;