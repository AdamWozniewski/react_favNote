import React from 'react';
import { render } from '@testing-library/react';
import Heading from './Heading';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/mainTheme';

describe('Heading Component', () => {
    it('Render children text', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <Heading>Hello</Heading>
            </ThemeProvider>
        );

        getByText('Hello');
    });
});
