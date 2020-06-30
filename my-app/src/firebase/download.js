import firebase from "../config/fbConfig";
const database = firebase.database();

export const fbDownload = () => database.ref("todo").once("value");
