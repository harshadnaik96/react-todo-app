import firebase from "firebase";

firebase.initializeApp({
  databaseURL: "https://react-todo-app-6bc35-default-rtdb.firebaseio.com/",
});
export const database = firebase.database().ref("todos");

export const dbConnectState = firebase.database().ref(".info/connected");
