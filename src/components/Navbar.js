import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar">
        <a href="/">
          Kanban
        </a>
        <ul>
          <li>
            <a href="#">
              +
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;
