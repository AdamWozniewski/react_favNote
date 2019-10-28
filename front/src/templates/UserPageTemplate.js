import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SideBar from "../components/organisms/Sidebar/Sidebar";
import withContext from "../hoc/withContext";

const StyledWrapper = styled.div`
    padding-left: 150px;
`;

const UserPageTemplate = ({ children }) =>
    <StyledWrapper>
        <SideBar />
        {children}
    </StyledWrapper>;

UserPageTemplate.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]).isRequired,
};
export default withContext(UserPageTemplate);
