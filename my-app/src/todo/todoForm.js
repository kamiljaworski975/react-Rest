import React from "react";
import { Button, Form } from "semantic-ui-react";

import { addTodo } from "../firebase/add";

const initialFormState = {
  name: "",
  task: "",
  done: false
};

class TodoForm extends React.Component {
  state = {
    ...initialFormState,
    error: ""
  };

  handleOnChange = event => {
    this.setState({
      task: event.target.value,
      name: this.props.todolenght + 1
    });
  };

  handleOnClick = event => {
    const { name, task, done } = this.state;
    event.preventDefault();

    if (!task) {
      this.setState({
        error: "Required"
      });
    } else if (task.length < 3) {
      this.setState({
        error: "Too short. Minimum 3 characters"
      });
    } else if (typeof task !== "string") {
      this.setState({
        error: "This is not a task"
      });
    } else {
      addTodo(name, task, done);
      this.props.onAdd();
      this.setState({
        task: "",
        error: ""
      });
    }
  };

  render() {
    const { task } = this.state;

    return (
      <Form>
        <h2>Add task</h2>
        <div>{this.state.error}</div>
        <Form.Field>
          <input
            value={task}
            onChange={this.handleOnChange}
            name="task"
            placeholder="task"
          />
        </Form.Field>
        <Button type="submit" onClick={this.handleOnClick}>
          Add
        </Button>
      </Form>
    );
  }
}

export default TodoForm;
