import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyles';
import { theme } from 'theme/mainTheme';
import PageContext from '../context';
import { typesOfItems } from '../static/types';

const { notes, twitters, articles } = typesOfItems;

class MainTemplate extends Component {
    state = {
        pageType: notes,
    };

    static propTypes = {
        children: PropTypes.element.isRequired,
        location: PropTypes.oneOfType([PropTypes.object]).isRequired,
    };

    componentDidMount () {
        this.setCurrentPage()
    }

    componentDidUpdate (prevProps, prevState) {
        this.setCurrentPage(prevState);
    }

    setCurrentPage = (prevState = '') => {
        const pageTypes = [twitters, articles, notes];
        const {
            location: {
                pathname
            }
        } = this.props;
        const [ currentPage ] = pageTypes.filter(page => pathname.includes(page));
        if (prevState.pageType !== currentPage) this.setState({ pageType: currentPage });
    };

    render () {
        const { children } = this.props;
        const { pageType } = this.state;
        return (
            <PageContext.Provider value={pageType}>
                <GlobalStyle />
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </PageContext.Provider>
        );
    }
}

export default withRouter(MainTemplate);
