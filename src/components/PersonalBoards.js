import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PersonalBoards.css';

class PersonalBoards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list : [],
    };
  };

  componentDidMount() {
    axios.get('/api/boards')
    .then((response) => {
      console.log(response);
      this.setState({list: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    var boards = this.state.list.map((board, index) => {
      return (
        <li key={index}>
          <Link to={"boardview/" + board._id}>
          {board.title}
          </Link>
        </li>
      )
    })
    return (
      <div className="PersonalBoards">
        <h3>Personal Boards</h3>
        <ul>{boards}</ul>
      </div>
    )
  }

}

export default PersonalBoards;
