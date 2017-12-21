import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class BoardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list : [],
      boardId : this.props.match.params.id
    };
  };

  componentDidMount() {
    axios.get('/api/boardview/' + this.state.boardId)
    .then((response) => {
      console.log(response);
      this.setState({list: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    var board = this.state.list.map((board, index) => {
      return (
        <div key={"title"}>{board.title}</div>
      )
    })
    return (
      <div className="BoardView">
        <div>{board}</div>
      </div>
    )
  }

}

export default BoardView;
