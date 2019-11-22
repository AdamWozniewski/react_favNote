import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../components/molecules/Card/Card';
import GridTemplate from '../templates/GridTemplate';

const Notes = ({ notes, userID }) => {
    if  (!userID) return <Redirect to="/login" />;
    else return (
        <GridTemplate pageType='notes'>
            <>
                {notes.map(({
                   id,
                   title,
                   content,
                   created}) =>
                        <Card
                            id={id}
                            key={id}
                            cardType="notes"
                            title={title}
                            content={content}
                            created={created}
                        />)
                }
            </>
        </GridTemplate>
    )
};
Notes.propsTypes = {
    notes: PropTypes.array.isRequired,
};
const mapStateToProps = ({ notes, userID = null }) => ({
    notes,
    userID
});

export default connect(mapStateToProps, null)(Notes);
