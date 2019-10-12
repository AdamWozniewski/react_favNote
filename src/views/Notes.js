import React from 'react';
import { connect } from "react-redux";
import Card from "../components/molecules/Card/Card";
import GridTemplate from "../templates/GridTemplate";

const Notes = ({ notes }) =>
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
    </GridTemplate>;

const mapStateToProps = ({ notes }) => ({
    notes,
});

export default connect(mapStateToProps, null)(Notes);
