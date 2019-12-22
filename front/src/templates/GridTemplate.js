import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserPageTemplate from './UserPageTemplate';
import Input from '../components/atomic/Input/Input';
import Heading from '../components/atomic/Heading/Heading';
import Paragraph from '../components/atomic/Paragraph/Paragraph';
import withContext from '../hoc/withContext';
import { filteredItems } from '../actions/dispatchers/itemsDispatchers';
import ButtonIcon from '../components/atomic/ButtonIcon/ButtonIcon';
import plus from '../assets/icons/plus.svg';
import NewItemBar from '../components/organisms/NewItemBar/NewItemBar';
import messages from '../static/messages';
import { typesOfItems } from '../static/types';

const { notes } = typesOfItems;
const { grid } = messages.templates;

const StyledWrapper = styled.div`
  position: relative;
  padding: 25px 150px 25px 70px;
`;
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;
`;
const StyledPageHeading = styled(Heading)`
  margin: 25px 0 0 0;
  
  ::first-letter {
    text-transform: uppercase;
  }
`;
const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;
const StyledParagraph = styled(Paragraph)`
    margin: 0;
    font-weight: bold;
`;
const StyledButtonIcon = styled(ButtonIcon)`
  background-color: ${({ activeColor, theme }) => theme[activeColor]};
  border-radius: 50px;
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 10000;
  background-size: 35%;
`;

class GridTemplate extends Component {
    state = {
        isNewItemBarVision: false,
    };

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        pageContext: PropTypes.string,
        filteredItemsByContext: PropTypes.func.isRequired,
        items: PropTypes.oneOfType([PropTypes.object]),
    };

    static defaultProps = {
        pageContext: notes,
        items: {},
    };

    handleNewItemBarToggle = () => this.setState(prevState => ({
        isNewItemBarVision: !prevState.isNewItemBarVision,
    }));

    filterItems = ({ target: { value } }) => {
        const { items, pageContext, filteredItemsByContext } = this.props;
        const filteredItemsByType = items[pageContext].filter(({
                title,
                created,
                twitterName,
                articleURL,
                content,
            }) =>
                title.toLowerCase().includes(value.toLowerCase()) ||
                created.toLowerCase().includes(value.toLowerCase()) ||
                twitterName.toLowerCase().includes(value.toLowerCase()) ||
                articleURL.toLowerCase().includes(value.toLowerCase()) ||
                content.toLowerCase().includes(value.toLowerCase())
        );
        filteredItemsByContext(pageContext, filteredItemsByType);
    };

    render () {
        const { children, pageContext } = this.props;
        const { isNewItemBarVision } = this.state;
        return (
            <UserPageTemplate pageType={pageContext}>
                <StyledWrapper>
                    <StyledPageHeader>
                        <Input onChange={this.filterItems} search placeholder={grid.search} />
                        <StyledPageHeading big>{pageContext}</StyledPageHeading>
                        <StyledParagraph>{pageContext}</StyledParagraph>
                    </StyledPageHeader>
                    <StyledGrid>
                        { children }
                    </StyledGrid>
                    <StyledButtonIcon
                        onClick={this.handleNewItemBarToggle}
                        activeColor={pageContext}
                        icon={plus}
                    />
                    <NewItemBar isVisible={isNewItemBarVision} handleClose={this.handleNewItemBarToggle} />
                </StyledWrapper>
            </UserPageTemplate>
        );
    }
}
const mapStateToProps = ({ items }) => ({
    items,
});
const mapDispatchToProps = dispatch => ({
    filteredItemsByContext: (itemType, itemContent) => dispatch(filteredItems(itemType, itemContent)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withContext(GridTemplate));
