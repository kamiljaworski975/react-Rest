import React, { useState } from "react";
import { Table } from "semantic-ui-react";

import TodoRow from "./todoRow";
import TodoEditRow from "./todoEditRow";

export default ({ todolist, onDelete, onSave, onToggle }) => {
  const [editId, setEditId] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleOnEdit = markedId => {
    setEditId(markedId);
  };
  const handleOnClose = () => {
    setEditId(null);
  };

  const handleOnSave = () => {
    onSave();
    setEditId(null);
  };

  const handleOnAvatarUpdate = url => {
    setAvatarUrl(url);
  };

  return (
    <Table celled textAlign={"center"}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>id</Table.HeaderCell>
          <Table.HeaderCell>Avatar</Table.HeaderCell>
          <Table.HeaderCell>Task</Table.HeaderCell>
          <Table.HeaderCell>Done</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {todolist.map(todoTask => {
          return editId === todoTask.id ? (
            <TodoEditRow
              key={todoTask.id}
              todoTask={todoTask}
              onSave={handleOnSave}
              onClose={handleOnClose}
              onAvatarUpdate={handleOnAvatarUpdate}
            />
          ) : (
            <TodoRow
              key={todoTask.id}
              todoTask={todoTask}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={handleOnEdit}
              avatarUrl={avatarUrl}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};
