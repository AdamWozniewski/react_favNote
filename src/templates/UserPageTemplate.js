import React from "react";
import PropTypes from "prop-types";
import SideBar from "../components/organisms/Sidebar/Sidebar";
import withContext from "../hoc/withContext";

const UserPageTemplate = ({ children }) =>
    <>
        <SideBar />
        {children}
    </>;

UserPageTemplate.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]).isRequired,
};
export default withContext(UserPageTemplate);
