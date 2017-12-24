import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BoardView.css';

class BoardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list : [],
      newListTitle : '',
      boardId : this.props.match.params.id
    };
    this.handleListTitleChange = this.handleListTitleChange.bind(this);
    this.handleListTitleSubmit = this.handleListTitleSubmit.bind(this);
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

  handleListTitleChange(event) {
    this.setState({newListTitle: event.target.value});
  }

  handleListTitleSubmit(e) {
    e.preventDefault()
    axios.put('/api/boards/' + this.state.boardId, {
      newListTitle: this.state.newListTitle
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) =>  {
      console.log(error);
    });
  };




  render() {

    var boardHeader = this.state.list.map((board, index) => {
      return (
        <div key={"boardHeaderContainer"}>
          <div key={"title"}>{board.title}</div>
        </div>
      )
    })

    var boardLists = this.state.list.map((board, index) => {
      var boardLists2 = board.lists.map((list, index) => {
        return (
          <li key={"list" + index} className="list-item">{list.title}</li>
        )
      })
      return (boardLists2)
    })

    var newList = <li key={"new-list"} className="list-item">
                    <form key={"newListForm"} onSubmit={this.handleListTitleSubmit}>
                      <input key={"newListFormText"} type="text" value={this.state.newListTitle} onChange={this.handleListTitleChange} placeholder="New list" maxLength="100" required />
                      <input key={"newListFormSubmit"} type="submit" />
                    </form>
                  </li>;

    return (
      <div className="BoardView">
        <div key="boardHeader"><h3>{boardHeader}</h3></div>
        <ul key="boardLists" className="list-of-lists">{boardLists} {newList}</ul>
      </div>
    )
  }

}

export default BoardView;
