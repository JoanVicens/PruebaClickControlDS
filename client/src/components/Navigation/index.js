import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">PRUEBA TÉCNICA</NavLink>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/add">Add a new book</NavLink>
            </li>
          </ul>
      </nav>
    )
  }
}

export default Navigation
