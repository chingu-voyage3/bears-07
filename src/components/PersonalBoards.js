import React, { Component } from 'react';
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
      return <li key={index} className="board"> {board.title} </li>
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
