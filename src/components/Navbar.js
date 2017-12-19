import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {

    function handleClick(e) {
      e.preventDefault();
      console.log('+ was clicked.');
      fetch('http://localhost:3001/boards', {method:"POST"});
    }


    return (
      <nav className="Navbar">
        <a href="/">
          Kanban
        </a>
        <ul>
          <li>
            <a href="#" onClick={handleClick}>
              +
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;
