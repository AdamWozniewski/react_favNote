import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import DetailsTemplate from '../templates/DetailsTemplate';
import { routes } from '../routes';
import withContext from '../hoc/withContext';

class DetailPage extends Component {
    state = {
        pageType: 'notes',
        activeItem: {
            title: '',
            created: '',
            content: '',
            articleUrl: '',
            twitterName: '',
        },
    };

    static propTypes = {
        pageContext: PropTypes.string,
        activeItem: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                twitterName: PropTypes.string.isRequired,
                created: PropTypes.string.isRequired,
            }),
        ),
        // match: PropTypes.oneOf([PropTypes.object]),
        match: PropTypes.object,
    };

    static defaultProps = {
        pageContext: 'notes',
        activeItem: [],
        match: {},
    };

    componentDidMount() {
        const { match } = this.props;
        if (!this.props.activeItem) {
            const [ activeItem ] = this.props.activeItem;
            this.setState({
                activeItem,
            });
        } else {
            const { id } = match.params;
            axios.get(`http://localhost:9000/api${match.path}/${id}`)
                .then(({ data: activeItem }) => {
                    return this.setState({
                        activeItem,
                    })
                });
        }
        switch (match.path) {
            case routes.twitter: this.setState({ pageType: 'twitters' }); break;
            case routes.note: this.setState({ pageType: 'notes' }); break;
            case routes.article: this.setState({ pageType: 'articles' }); break;
            default: this.setState({ pageType: 'notes' }); break;
        }
    }

    render() {
        const { pageContext } = this.props;
        const { activeItem } = this.state;
        const { title, created, content, articleUrl, twitterName} = activeItem;
        return (
            <DetailsTemplate
                pageType={pageContext}
                title={title}
                created={created}
                content={content}
                articleUrl={articleUrl}
                twitterName={twitterName}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if (state[ownProps.pageContext])
        return {
            activeItem: state[ownProps.pageContext].filter(item => item.id === ownProps.match.params.id)
        };
    return null
};
export default withContext(connect(mapStateToProps, null)(DetailPage));
