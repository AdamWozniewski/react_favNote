import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from 'axios';
import DetailsTemplate from "../templates/DetailsTemplate";
import { routes } from "../routes";
import withContext from "../hoc/withContext";

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
        if (this.props.activeItem) {
            const [ activeItem ] = this.props.activeItem;
            this.setState({
                activeItem,
            });
        } else {
            const { id } = this.props.match.params;
            axios.get(`http://localhost:9000/api${this.props.match.path}/${id}`)
                .then(({ data }) => console.log(data));
        }
        switch (this.props.match.path) {
            case routes.twitter: this.setState({ pageType: 'twitters' }); break;
            case routes.note: this.setState({ pageType: 'notes' }); break;
            case routes.article: this.setState({ pageType: 'articles' }); break;
        }
    }

    render() {
        const { pageContext } = this.props;
        const { activeItem } = this.state;
        return (
            <DetailsTemplate
                pageType={pageContext}
                title={activeItem.title}
                created={activeItem.created}
                content={activeItem.content}
                articleUrl={activeItem.articleUrl}
                twitterName={activeItem.twitterName}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => { // ownProps zbiera propsy które są przekazywane do komponentu
    if (state[ownProps.pageContext])
        return {
            activeItem: state[ownProps.pageContext].filter(item => item.id === ownProps.match.params.id)
        };
    return null
};
export default withContext(connect(mapStateToProps, null)(DetailPage)); // tym razem inaczej