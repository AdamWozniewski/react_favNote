import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme/mainTheme';

// automatically import all files ending in *.stories.js
function loadStories() {
    const req = require.context('../src/components', true, /\.stories\.js$/);
    req.keys().forEach(filename => req(filename));
}
addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);
configure(loadStories, module);
