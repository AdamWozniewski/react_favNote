import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { routes } from '../routes';
import { itemsState } from '../reducers/defaultStates';
import PropTypes from "prop-types";

const { login } = routes;

const withFilteredItems = Comp => {
    return class FilterItemsByTypes extends Component {
        static propTypes = {
            userID: PropTypes.oneOfType([PropTypes.object]).isRequired,
            filtered: PropTypes.oneOfType([PropTypes.array]).isRequired,
            pageType: PropTypes.string.isRequired,
            filteredItemsByContext: PropTypes.func.isRequired,
        };

        componentDidMount() {
            const { pageType, filteredItemsByContext } = this.props;
            filteredItemsByContext(pageType, itemsState.filtered);
        }

        render() {
            const { userID, filtered, pageType } = this.props;
            const items = filtered.length ? filtered : this.props[pageType];

            if  (!userID) return <Redirect to={login} />;
            return <Comp items={items} />
        }
    }
};

export default withFilteredItems;

