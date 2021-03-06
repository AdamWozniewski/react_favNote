import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserPageTemplate from './UserPageTemplate';
import Paragraph from '../components/atomic/Paragraph/Paragraph';
import Button from '../components/atomic/Button/Button';
import Heading from '../components/atomic/Heading/Heading';
import withContext from '../hoc/withContext';
import { routes } from '../routes/index';
import { typesOfItems } from '../static/types';
import messages from '../static/messages';

const { home } = routes;
const { details } = messages.templates;

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 70px;
  max-width: 50vw;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 80vw;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const StyledImage = styled.img`
  position: absolute;
  right: -80px;
  top: 50px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const DetailsTemplate = ({ pageContext, title, created, content, articleUrl, twitterName }) =>
  <UserPageTemplate pageType={pageContext}>
    <StyledWrapper>
      <StyledPageHeader>
        <StyledHeading big as="h1">{title}</StyledHeading>
        <StyledParagraph>{created}</StyledParagraph>
      </StyledPageHeader>
      <Paragraph>{content}</Paragraph>
      {pageContext === typesOfItems.articles && <StyledLink href={articleUrl}>{details.openArticle}</StyledLink>}
      {pageContext === typesOfItems.twitters && <StyledImage alt={title} src={`${details.twittersAvatar}${twitterName}`} />}
      <Button as={Link} to={`${home}${pageContext}`} activecolor={pageContext}>{details.closeSave}</Button>
    </StyledWrapper>
  </UserPageTemplate>;

DetailsTemplate.propTypes = {
  pageContext: PropTypes.string,
  title: PropTypes.string,
  created: PropTypes.string,
  content: PropTypes.string,
  articleUrl: PropTypes.string,
  twitterName: PropTypes.string,
};

DetailsTemplate.defaultProps = {
  pageContext: typesOfItems.notes,
  title: '',
  created: '',
  content: '',
  articleUrl: '',
  twitterName: '',
};

export default withContext(DetailsTemplate);
