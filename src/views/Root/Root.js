import React from 'react';
import { ThemeProvider } from 'styled-components';
import Button from 'components/atomic/Button/Button';
import GlobalStyle from 'theme/GlobalStyles';
import { theme } from 'theme/mainTheme';

const Root = () =>
    <>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
            <>
                <Button>Add</Button>
                <Button secondary width="500px">remove</Button>
            </>
        </ThemeProvider>
    </>;

export default Root;
