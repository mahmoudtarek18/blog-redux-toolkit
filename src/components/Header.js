import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <ul className="nav">
        <li>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/post/add">
            Add Post
          </NavLink>
        </li>
        <li className="login">login</li>
      </ul>
    </div>
  );
};

export default Header;
