import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

const Sidebar = () => {
  return (
    // Pass on our props
    <Menu>
      <Link to="/FormTool">pédagogie</Link>
      <Link to="/UpdatePasswordForm">gestion</Link>
    </Menu>
  );
};

export default Sidebar;
