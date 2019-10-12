import React from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import UserPageTemplate from "./UserPageTemplate";
import Input from "../components/atomic/Input/Input";
import Heading from "../components/atomic/Heading/Heading";
import Paragraph from "../components/atomic/Paragraph/Paragraph";
import withContext from "../hoc/withContext";

const StyledWrapper = styled.div`
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
const GridTemplate = ({ children, pageContext }) =>
    <UserPageTemplate pageType={pageContext}>
        <StyledWrapper>
            <StyledPageHeader>
                <Input search placeholder="Szukaj" />
                <StyledPageHeading big>{pageContext}</StyledPageHeading>
                <StyledParagraph>{pageContext}</StyledParagraph>
            </StyledPageHeader>
            <StyledGrid>
                {children}
            </StyledGrid>
        </StyledWrapper>
    </UserPageTemplate>;

GridTemplate.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
export default withContext(GridTemplate);
