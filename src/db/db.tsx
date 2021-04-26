import firebase from "firebase";

firebase.initializeApp({
  databaseURL: process.env.REACT_APP_FIREBASE_URL,
});
export const database = firebase.database().ref("todos");

export const dbConnectState = firebase.database().ref(".info/connected");
