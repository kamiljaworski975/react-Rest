import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message
} from "semantic-ui-react";
import firebase from "../config/fbConfig";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class Sign extends React.Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    errorPassword: "",
    errorEmail: ""
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleOnClick = event => {
    event.preventDefault();

    this.isSignUp() ? this.signUp() : this.signIn();
  };

  isSignUp = () => {
    return this.props.match.path.includes("sign-up");
  };

  signIn = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          redirect: true
        });
      })
      .catch(function(error) {
        alert(`${error.code}: ${error.message}`);
      });
  };

  signUp = () => {
    const { email, password } = this.state;
    if (!password || !email) {
      this.setState({
        errorPassword: "Required",
        errorEmail: "Required"
      });
    } else if (password.length < 5) {
      this.setState({
        errorPassword: "Too short. Minimum 5 characters"
      });
    } else if (!email.includes("@")) {
      this.setState({
        errorEmail: "Invalid email"
      });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({
            redirect: true,
            errorPassword: ""
          });
        })
        .catch(function(error) {
          alert(`${error.code}: ${error.message}`);
        });
    }
  };

  render() {
    const { email, password, redirect } = this.state;

    if (redirect) {
      return <Redirect to={"/"} />;
    }

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="red" textAlign="center">
            {this.isSignUp() ? "Welcome stranger" : "Log-in to your account"}
          </Header>
          <Form size="large">
            <Segment stacked>
              <div style={{ color: "red" }}>{this.state.errorEmail}</div>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={email}
                name="email"
                onChange={this.handleOnChange}
              />
              <div style={{ color: "red" }}>{this.state.errorPassword}</div>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                name="password"
                onChange={this.handleOnChange}
              />

              <Button
                color="red"
                fluid
                size="large"
                onClick={this.handleOnClick}
              >
                {this.isSignUp() ? "Register" : "Login"}
              </Button>
            </Segment>
          </Form>
          <Message>
            {this.isSignUp() ? (
              <>
                Already register?{" "}
                <Link style={{ color: "red" }} to="/sign-in">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                New to us?{" "}
                <Link style={{ color: "red" }} to="/sign-up">
                  Sign Up
                </Link>
              </>
            )}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Sign;
