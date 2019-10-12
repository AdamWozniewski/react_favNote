import React, {Component} from "react";
import DetailsTemplate from "../templates/DetailsTemplate";
import { routes } from "../routes";
import withContext from "../hoc/withContext";
import PropTypes from "prop-types";

class DetailPage extends Component {
    state = {
        pageType: 'notes',
    };
    static propTypes = {
        pageContext: PropTypes.string,
    };
    static defaultProps = {
        pageContext: 'notes',
    };
    componentDidMount() {
        switch (this.props.match.path) {
            case routes.twitter: this.setState({ pageType: 'twitters' }); break;
            case routes.note: this.setState({ pageType: 'notes' }); break;
            case routes.article: this.setState({ pageType: 'articles' }); break;
        }
    }

    render() {
        const article1 = {
            id: 1,
            title: 'You gave React a bad name',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci, dolore odit animi',
            articleUrl: 'https://youtube.com/helloroman',
            created: '5 days',
            twitterName: "hello_roman",
        };
        const { pageContext } = this.props;
        return (
            <DetailsTemplate
                pageType={pageContext}
                title={article1.title}
                created={article1.created}
                content={article1.content}
                articleUrl={article1.articleUrl}
                twitterName={article1.twitterName}
            />
        );
    }
}


export default withContext(DetailPage);