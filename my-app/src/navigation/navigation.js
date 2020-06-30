import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
import firebase from "../config/fbConfig";

class Nav extends React.Component {
  state = {
    user: null
  };

  handleSignOut = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <Menu inverted>
        <Link to="/">
          <Menu.Item name="home" />
        </Link>
        <Link to="/todo">
          <Menu.Item name="To do list" />
        </Link>
        <Link to="/recipe">
          <Menu.Item name="Recipe" />
        </Link>
        <Menu.Menu position="right">
          {!!this.state.user ? (
            <>
              <Button inverted onClick={this.handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Link to="/sign-in">
              <Menu.Item name="Sign in" />
            </Link>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Nav;
