import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logoImg from 'assets/icons/logo.svg';
import Heading from '../components/atomic/Heading/Heading';
import messages from '../static/messages';

const { auth } = messages.templates;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.notes};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.img`
  width: 200px;
  height: auto;
`;

const StyledAuthCard = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthTemplate = ({ children }) => (
    <StyledWrapper>
        <StyledLogo src={logoImg} alt={auth.logo} />
        <Heading>{ auth.yourPlaceInWeb }</Heading>
        <StyledAuthCard>{children}</StyledAuthCard>
    </StyledWrapper>
);
AuthTemplate.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default AuthTemplate;
