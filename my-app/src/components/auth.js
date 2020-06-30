import React from "react";
import firebase from "../config/fbConfig";
import { Link } from "react-router-dom";

class Auth extends React.Component {
  state = {
    user: null,
    ref: null
  };

  componentDidMount() {
    const authRef = firebase.auth().onAuthStateChanged(user =>
      this.setState({
        user
      })
    );
    this.setState({
      ref: authRef
    });
  }

  componentWillUnmount() {
    if (this.state.ref) {
      this.state.ref();
    }
  }

  render() {
    return this.state.user ? (
      this.props.children
    ) : (
      <>
        <h1>Sign in to see this list!</h1>
        <Link to="/sign-in">Sign in</Link>
      </>
    );
  }
}

export default Auth;
