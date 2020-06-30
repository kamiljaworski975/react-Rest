import firebase from "../config/fbConfig";
const database = firebase.database();

export const editTodo = (todoId, name, task, done, onAction) => {
  var updates = {};
  updates["/todo/" + todoId] = {
    name,
    task,
    done: Boolean(done)
  };

  return database
    .ref()
    .update(updates)
    .then(function() {
      onAction();
    })
    .catch(function(error) {
      alert(`${error.code}: ${error.message}`);
    });
};
