import firebase from "../config/fbConfig";

export const addAvatar = (file, onAvatarUpdate, taskId) => {
  firebase
    .storage()
    .ref("avatars/" + taskId)
    .put(file)
    .then(res => {
      res.ref.getDownloadURL().then(url => {
        onAvatarUpdate(url);
      });
      alert("Added successfully! Yay!");
    });
};
