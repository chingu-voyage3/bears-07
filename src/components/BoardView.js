import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    var board = this.state.list.map((board, index) => {

      return (

        <div>
          <div key={"title"}>{board.title}</div>



          <div key={"new-list"}>
            <form key={"newListForm"} onSubmit={this.handleListTitleSubmit}>
              <input key={"newListFormText"} type="text" value={this.state.newListTitle} onChange={this.handleListTitleChange} placeholder="New list" maxLength="100" required />
              <input key={"newListFormSubmit"} type="submit" />
            </form>
          </div>

        </div>
      )

    })
    return (
      <div className="BoardView">
        <h3>{board}</h3>
      </div>
    )
  }

}

export default BoardView;
