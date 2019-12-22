import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../components/molecules/Card/Card';
import { typesOfItems } from '../static/types';
import GridTemplate from '../templates/GridTemplate';
import withFilteredItems from '../hoc/withFilteredItems';
import { filteredItems } from '../actions/dispatchers/itemsDispatchers';

const Notes = ({ items }) =>
    <GridTemplate pageType={typesOfItems.notes}>
        <>
            {items.map(({
                id,
                title,
                content,
                created
            }) =>
                <Card
                    id={id}
                    key={id}
                    cardType={typesOfItems.notes}
                    title={title}
                    content={content}
                    created={created}
                />
            )}
        </>
    </GridTemplate>;

Notes.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array]),
};
Notes.defaultProps = {
    items: [],
};
const mapStateToProps = ({ items: { notes, filtered }, user: { userID = null } }) => ({
    notes,
    filtered,
    userID,
    pageType: typesOfItems.notes,
});

const mapDispatchToProps = dispatch => ({
    filteredItemsByContext: (itemType, itemContent) => dispatch(filteredItems(itemType, itemContent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withFilteredItems(Notes));
