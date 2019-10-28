import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import ButtonIcon from "../../atomic/ButtonIcon/ButtonIcon";
import logo from 'assets/icons/logo.svg';
import bulb from 'assets/icons/bulb.svg';
import logout from 'assets/icons/logout.svg';
import pen from 'assets/icons/pen.svg';
import twitter from 'assets/icons/twitter.svg';
import withContext from "../../../hoc/withContext";

const StylledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  background-color: ${({ activeColor, theme }) => activeColor ? theme[activeColor] : theme.notes};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url('${logo}');
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;
`;
const StyledLogoutButton = styled(ButtonIcon)`
  margin-top: auto;
`;
const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SideBar = ({ pageContext }) =>
    <StylledWrapper activeColor={pageContext}>
        <StyledLogoLink to="/notes" />
        <StyledLinksList>
            <li>
                <ButtonIcon as={NavLink} activeclass="active" to="/notes" icon={pen} />
            </li>
            <li>
                <ButtonIcon as={NavLink} activeclass="active" to="/twitters" icon={twitter} />
            </li>
            <li>
                <ButtonIcon as={NavLink} activeclass="active" to="/articles" icon={bulb} />
            </li>
        </StyledLinksList>
        <StyledLogoutButton as={NavLink} to="/login" icon={logout} />
    </StylledWrapper>;

export default withContext(SideBar);
