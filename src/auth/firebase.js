import * as firebase from "firebase/app";
import "firebase/auth";

import { SuccessStatus, ErrorStatus } from "../model/Status";
import User from "../model/User";

// ------------------------------ firebase ----------------------------------

const config = {
  apiKey: "AIzaSyCxHMfzcasDC_xIYpfI_DEierYjMc9rJ-0",
  authDomain: "jag-rest-api.firebaseapp.com",
  databaseURL: "https://jag-rest-api.firebaseio.com",
  projectId: "jag-rest-api",
  storageBucket: "jag-rest-api.appspot.com",
  messagingSenderId: "758355963510",
  appId: "1:758355963510:web:02af12a8d148c31bdfb957",
  measurementId: "G-6NCX9826ZH"
};

// const app = firebase.initializeApp(config);
// export default app;

// ------------------------------ Auth ----------------------------------

class Auth {
  constructor() {
    // this.app = firebase.initializeApp(config);
    this.app = !firebase.apps.length
      ? firebase.initializeApp(config)
      : firebase.app();
    console.log("Auth:", this.app);
  }

  async signup(user) {
    console.log("signup:", user);
    let newUser = null;

    try {
      await this.app
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      await this.app.auth().currentUser.updateProfile({
        displayName: user.name
      });
    } catch (err) {
      throw new ErrorStatus({
        code: "SIGNUP_FAILED",
        message: err.message
      });
    }
  }

  async login(user) {
    try {
      await this.app
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      return new SuccessStatus({
        code: "LOGIN_SUCCESS",
        message: "User logged in successfully"
      });
    } catch (err) {
      console.log("login: ", err);
      throw new ErrorStatus({
        code: "LOGIN_ERRROR",
        message: err.message
      });
    }
  }

  async logout() {
    try {
      await this.app.auth().signOut();
      return new SuccessStatus({
        code: "LOGOUT_SUCCESS",
        message: "User logged out successfully"
      });
    } catch (err) {
      throw new ErrorStatus({
        code: "LOGOUT_ERRROR",
        message: err.message
      });
    }
  }

  getUser(user) {
    // return this.app.auth().currentUser;
    const authUser = user || this.app.auth().currentUser;
    if (!authUser) {
      return null;
    }

    const { displayName, email, photoURL } = authUser;
    return new User({
      name: authUser.displayName,
      email,
      avatarUrl: photoURL
    });
  }

  onAuthStateChanged(cb) {
    return this.app.auth().onAuthStateChanged(authUser => {
      // console.log("onAuthStateChanged:: authUser:", JSON.stringify(authUser));
      cb(this.getUser(authUser));
    });
  }
}

export default new Auth();
