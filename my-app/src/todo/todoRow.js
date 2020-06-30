import React from "react";
import { Table, Checkbox, Button, Icon, Image } from "semantic-ui-react";

import { editTodo } from "../firebase/edit";
import { removeTodo } from "../firebase/delete";

import avatarPlaceholder from "../assets/yoda.jpg";

class TodoRow extends React.Component {
  state = {
    name: this.props.todoTask.name,
    task: this.props.todoTask.task,
    done: this.props.todoTask.done
  };

  handleOnDeleteClick = () => {
    removeTodo(this.props.todoTask.id, this.props.onDelete);
  };

  handleOnToogleClick = () =>
    this.setState(
      prevState => ({
        done: !prevState.done
      }),
      () => {
        const { name, task, done } = this.state;
        editTodo(this.props.todoTask.id, name, task, done, this.props.onToggle);
      }
    );

  handleOnEditClick = () => {
    this.props.onEdit(this.props.todoTask.id);
  };

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.todoTask.name}</Table.Cell>
        {(() => {
          if (
            this.props.avatarUrl &&
            this.props.avatarUrl.includes(this.props.todoTask.id)
          ) {
            return (
              <Table.Cell>
                <Image src={this.props.avatarUrl} avatar />
              </Table.Cell>
            );
          } else {
            return (
              <Table.Cell>
                <Image src={avatarPlaceholder} avatar />
              </Table.Cell>
            );
          }
        })()}
        <Table.Cell>{this.props.todoTask.task}</Table.Cell>
        <Table.Cell>
          <Checkbox
            checked={this.state.done}
            onClick={this.handleOnToogleClick}
          />
        </Table.Cell>
        <Table.Cell>
          <Button primary icon onClick={this.handleOnEditClick}>
            <Icon name="edit" />
          </Button>
          <Button negative icon onClick={this.handleOnDeleteClick}>
            <Icon name="trash" />
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default TodoRow;
