import React from "react";
import { Button, Form, Icon, Table } from "semantic-ui-react";

import { editTodo } from "../firebase/edit";
import { addAvatar } from "../firebase/addStorage";

class TodoEditRow extends React.Component {
  state = {
    ...this.props.todoTask,
    file: null
  };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnChangeImage = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  handleOnSaveClick = () => {
    const { name, task, done, file } = this.state;
    editTodo(this.props.todoTask.id, name, task, done, this.props.onSave);
    addAvatar(file, this.props.onAvatarUpdate, this.props.todoTask.id);
  };

  handleOnCloseClick = () => {
    this.props.onClose();
  };

  render() {
    const { task } = this.state;

    return (
      <Table.Row>
        <Table.Cell>{this.props.todoTask.name}</Table.Cell>
        <Table.Cell>
          <input type="file" onChange={this.handleOnChangeImage} />
        </Table.Cell>
        <Table.Cell>
          <Form.Field>
            <input value={task} name="task" onChange={this.handleOnChange} />
          </Form.Field>
        </Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>
          <Button positive icon onClick={this.handleOnSaveClick}>
            <Icon name="save" />
          </Button>
          <Button icon onClick={this.handleOnCloseClick}>
            <Icon name="close" />
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default TodoEditRow;
