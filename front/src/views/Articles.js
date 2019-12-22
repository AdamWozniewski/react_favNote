import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../components/molecules/Card/Card';
import GridTemplate from '../templates/GridTemplate';
import { typesOfItems } from '../static/types';
import withFilteredItems from '../hoc/withFilteredItems';
import { filteredItems } from '../actions/dispatchers/itemsDispatchers';

const Articles = ({ items }) =>
    <GridTemplate pageType={typesOfItems.articles}>
        <>
            {items.map(({
                id,
                title,
                content,
                articleUrl,
                created
            }) =>
                <Card
                    id={id}
                    key={id}
                    cardType={typesOfItems.articles}
                    title={title}
                    articleURL={articleUrl}
                    content={content}
                    created={created}
                />)
            }
        </>
    </GridTemplate>;

Articles.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array]),
};
Articles.defaultProps = {
    items: [],
};
const mapStateToProps = ({ items: { articles, filtered }, user: { userID = null } }) => ({
    articles,
    filtered,
    userID,
    pageType: typesOfItems.articles,
});

const mapDispatchToProps = dispatch => ({
    filteredItemsByContext: (itemType, itemContent) => dispatch(filteredItems(itemType, itemContent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withFilteredItems(Articles));
