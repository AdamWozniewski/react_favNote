import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '../../atomic/Button/Button';
import Heading from '../../atomic/Heading/Heading';
import Paragraph from '../../atomic/Paragraph/Paragraph';
import linkIcon from 'assets/icons/link.svg';
import { removeItemAction } from '../../../actions/itemsActions';
import withContext from '../../../hoc/withContext';
import messages from '../../../static/messages';

const { remove } = messages.components.card;

const CARD_TYPE = {
  notes: 'notes',
  twitters: 'twitters',
  articles: 'articles',
};
const StyledWrapper = styled.div`
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.3);
  border-radius: 10px;
  overflow: hidden;
  min-height: 380px;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
  
  ${({ flex }) => flex && css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`}
`;
const InnerWrapper = styled.div`
  position: relative;
  padding: 17px 30px;
  background-color: ${({ activeColor, theme }) => activeColor ? theme[activeColor] : 'white'};
`;
const DataInfo = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;
const StyledHeading = styled(Heading)`
  margin: 10px 0 0;
`;
const StyledAvatar = styled.img`
  width: 86px;
  height: 86px;
  border: 5px solid ${({ theme }) => theme.twitters};
  border-radius: 50%;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 1;
`;
const StyledLinkButton = styled.a`
  display: block;
  width: 47px;
  height: 47px;
  border-radius: 50px;
  background: white url('${ linkIcon }') no-repeat;
  background-size: contain;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 1;
`;
class Card extends Component {
    state = {
        redirect: false,
    };

    handleCardClick = () => this.setState({
        redirect: true,
    });

    render () {
        const { redirect } = this.state;
        const {
            id,
            pageContext,
            title,
            twitterName,
            articleURL,
            content,
            created,
            removeItem,
        } = this.props;
        if (redirect) return <Redirect to={`${pageContext}/${id}`} />;
        return (
            <StyledWrapper>
                <InnerWrapper onClick={this.handleCardClick} activeColor={pageContext}>
                    <StyledHeading>{title}</StyledHeading>
                    <DataInfo>{created}</DataInfo>
                    {pageContext === CARD_TYPE.twitters && <StyledAvatar src={twitterName} />}
                    {pageContext === CARD_TYPE.articles && <StyledLinkButton href={articleURL} />}
                </InnerWrapper>
                <InnerWrapper>
                    <Paragraph>
                        {content}
                    </Paragraph>
                </InnerWrapper>
                <InnerWrapper>
                    <Button secondary onClick={() => removeItem(pageContext, id)}>{remove}</Button>
                </InnerWrapper>
            </StyledWrapper>
        );
    }
}


Card.propTypes = {
  pageContext: PropTypes.oneOf([CARD_TYPE.notes, CARD_TYPE.articles, CARD_TYPE.twitters]),
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleURL: PropTypes.string,
  content: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
Card.defaultProps = {
  pageContext: CARD_TYPE.notes,
  twitterName: null,
  articleURL: null,
};
const mapDispatchToProps = dispatch => ({
    removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});
export default connect(null, mapDispatchToProps)(withContext(Card));
