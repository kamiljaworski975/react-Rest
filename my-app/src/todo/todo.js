import React from "react";
import { Wrapper } from "../themeComponents/wrapper";

import ToDoTable from "./todoTable";
import ToDoForm from "./todoForm";
import Auth from "../components/auth";
import { fbDownload } from "../firebase/download";

export const BASE_URL = "https://todolist-191ad.firebaseio.com";

class Todo extends React.Component {
  state = {
    todolist: [],
    err: ""
  };

  fetchTodos = () => {
    fbDownload()
      .then(snapshot => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        const formattedData = keys.map(key => {
          return {
            id: key,
            ...data[key]
          };
        });
        this.setState({
          todolist: formattedData
        });
      })
      .catch(() => {
        alert("Add new tasks");
        this.setState({
          todolist: []
        });
      });
  };

  handleOnAction = () => {
    this.fetchTodos();
  };

  componentDidMount() {
    this.fetchTodos();
  }

  render() {
    const { todolist } = this.state;

    return (
      <Wrapper>
        <Auth>
          <ToDoTable
            todolist={todolist}
            onDelete={this.handleOnAction}
            onSave={this.handleOnAction}
            onToggle={this.handleOnAction}
          />
          <ToDoForm
            todolist={todolist}
            todolenght={todolist.length}
            onAdd={this.handleOnAction}
          />
        </Auth>
      </Wrapper>
    );
  }
}

export default Todo;
