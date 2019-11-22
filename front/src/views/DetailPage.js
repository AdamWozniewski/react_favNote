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
    };
    static defaultProps = {
        pageContext: 'notes',
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
            default: this.setState({ pageType: 'twitters' }); break;
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
