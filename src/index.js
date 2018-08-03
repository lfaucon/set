import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDNj9LKGGzXNm6xKPEAOouSTsqlfhY8BlA",
  authDomain: "set-6dbb7.firebaseapp.com",
  databaseURL: "https://set-6dbb7.firebaseio.com",
  projectId: "set-6dbb7",
  storageBucket: "set-6dbb7.appspot.com",
  messagingSenderId: "741173943721"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
