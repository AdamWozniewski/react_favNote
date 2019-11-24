import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Card from '../components/molecules/Card/Card';
import GridTemplate from '../templates/GridTemplate';

const Articles = ({ articles }) =>
    <GridTemplate pageType='articles'>
        <>
            {articles.map(({
                id,
                title,
                content,
                articleUrl,
                created}) =>
                    <Card
                        id={id}
                        key={id}
                        cardType="articles"
                        title={title}
                        articleURL={articleUrl}
                        content={content}
                        created={created}
                    />)
                }
        </>
    </GridTemplate>;
Articles.propTypes = {
    articles: PropTypes.oneOf([PropTypes.array]),
};
Articles.defaultProps = {
    articles: [],
};
const mapStateToProps = ({ articles }) => ({
    articles,
});

export default connect(mapStateToProps, null)(Articles);
