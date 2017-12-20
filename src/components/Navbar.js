import React, { Component } from 'react';
import axios from 'axios';
import './Navbar.css';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/boards', {
      title: this.state.title
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) =>  {
      console.log(error);
    });
  };

  render() {
    return (
      <nav className="Navbar">
        <a href="/">
          Kanban
        </a>
        <ul>
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.title} onChange={this.handleTitleChange} className="text-input" required />
              <input type="submit" value="+" className="submit-button" />
            </form>
          </li>
        </ul>
      </nav>
    )
  }

}

export default Navbar;
