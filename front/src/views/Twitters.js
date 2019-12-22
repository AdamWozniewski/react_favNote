import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../components/molecules/Card/Card';
import GridTemplate from '../templates/GridTemplate';
import { typesOfItems } from '../static/types';
import { fetchItemsAction } from '../actions/itemsActions';
import { filteredItems } from '../actions/dispatchers/itemsDispatchers';
import { routes } from '../routes';
import { itemsState } from '../reducers/defaultStates';

const { login } = routes;

class Twitters extends Component {
    static propTypes = {
        twitters: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                twitterName: PropTypes.string.isRequired,
                created: PropTypes.string.isRequired,
            }),
        ),
        filtered: PropTypes.oneOfType([PropTypes.array]),
        fetchTwitters: PropTypes.func.isRequired,
        filteredItemsByContext: PropTypes.func.isRequired,
        userID: PropTypes.oneOfType([PropTypes.object]),
    };

    static defaultProps = {
        twitters: itemsState.twitters,
        filtered: itemsState.filtered,
        userID: {},
    };

    componentDidMount () {
        const { fetchTwitters, filteredItemsByContext } = this.props;
        fetchTwitters();
        filteredItemsByContext(typesOfItems.twitters, itemsState.filtered);
    }

    render () {
        const { twitters, userID, filtered } = this.props;
        const items = filtered.length ? filtered : twitters;
        if  (!userID) return <Redirect to={login} />;
        return (
            <GridTemplate pageType={typesOfItems.twitters}>
                {items.map(({ title, content, twitterName, created, _id: id }, index) => (
                    <Card
                        id={id}
                        key={id}
                        cardType={typesOfItems.twitters}
                        title={title}
                        content={content}
                        twitterName={twitterName}
                        created={created}
                    />
                ))}
            </GridTemplate>
        );
    }
}

const mapStateToProps = ({ items: { twitters, filtered }, user: { userID = null } }) => ({
    twitters,
    filtered,
    userID,
});
const mapDispatchToProps = dispatch => ({
    fetchTwitters: () => dispatch(fetchItemsAction(typesOfItems.twitters)),
    filteredItemsByContext: (itemType, itemContent) => dispatch(filteredItems(itemType, itemContent)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Twitters);
