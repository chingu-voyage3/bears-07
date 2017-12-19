import React, { Component } from 'react';
import axios from 'axios';
import './Navbar.css';

class Navbar extends Component {
  render() {

    function handleClick() {
      axios.post('http://localhost:3000/api/boards', {
        name: 'kanban'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
         if (error.response) {
           // The request was made and the server responded with a status code
           // that falls out of the range of 2xx
           console.log(error.response.data);
           console.log(error.response.status);
           console.log(error.response.headers);
         } else if (error.request) {
           // The request was made but no response was received
           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
           // http.ClientRequest in node.js
           console.log(error.request);
         } else {
           // Something happened in setting up the request that triggered an Error
           console.log('Error', error.message);
         }
         console.log(error.config);
       });
    }

    return (
      <nav className="Navbar">
        <a href="/">
          Kanban
        </a>
        <ul>
          <li>
            <button onClick={handleClick}>
              +
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;
