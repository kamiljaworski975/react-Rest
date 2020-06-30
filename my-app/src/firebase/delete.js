import firebase from "../config/fbConfig";
const database = firebase.database();

export const removeTodo = (todoId, onAction) => {
  database
    .ref("todo/" + todoId)
    .remove()
    .then(function() {
      onAction();
    })
    .catch(function(error) {
      alert(`${error.code}: ${error.message}`);
    });
};
