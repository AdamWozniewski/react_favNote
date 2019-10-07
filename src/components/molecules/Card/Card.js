import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from '../../atomic/Button/Button';
import Heading from '../../atomic/Heading/Heading';
import Paragraph from '../../atomic/Paragraph/Paragraph';
import linkIcon from 'assets/icons/link.svg';

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
  background: white url('${linkIcon}') no-repeat;
  background-size: contain;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 1;
`;
const Card = ({ cardType }) =>
    <StyledWrapper flex>
        <InnerWrapper activeColor={cardType}>
            <StyledHeading>Hello Adam</StyledHeading>
            <DataInfo>3 dni temu</DataInfo>
            {cardType === CARD_TYPE.twitters && <StyledAvatar src='https://avatars.io/twitter/hello_roman'/>}
            {cardType === CARD_TYPE.articles && <StyledLinkButton href="https://strefakursow.pl"/>}
        </InnerWrapper>
        <InnerWrapper>
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti facilis repellendus rerum sed. Ad architecto aut eum iste magnam minus molestiae officiis omnis recusandae? Accusamus eaque quae quas quibusdam voluptas.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti facilis repellendus rerum sed. Ad architecto aut eum iste magnam minus molestiae officiis omnis recusandae? Accusamus eaque quae quas quibusdam voluptas.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti facilis repellendus rerum sed. Ad architecto aut eum iste magnam minus molestiae officiis omnis recusandae? Accusamus eaque quae quas quibusdam voluptas.
            </Paragraph>
        </InnerWrapper>
        <InnerWrapper>
            <Button secondary>Remove</Button>
        </InnerWrapper>
    </StyledWrapper>;

Card.propTypes = {
  cardType: PropTypes.oneOf([CARD_TYPE.notes, CARD_TYPE.articles, CARD_TYPE.twitters]),
};
Card.defaultProps = {
  cardType: CARD_TYPE.notes,
};
export default Card;