import firebase from "../config/fbConfig";
const database = firebase.database();

export const addTodo = (name, task, done) => {
  var id = database
    .ref()
    .child("todo")
    .push().key;

  database
    .ref("todo/" + id)
    .set({
      name,
      task: String(task),
      done: Boolean(done)
    })
    .catch(function(error) {
      alert(`${error.code}: ${error.message}`);
    });
};
