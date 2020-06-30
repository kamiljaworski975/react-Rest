import React from "react";
import { Route, Switch } from "react-router";

import Todo from "../todo/todo";
import Sign from "../components/sign";
import Recipe from "../recipe/Recipe";

import { Wrapper } from "../themeComponents/wrapper";

export default ({ theme }) => (
  <Switch>
    <Route exact path="/">
      <Wrapper>
        <h1>Home</h1>
        <h2>This is beta. Will be finished soon</h2>
        <p>Register or login to see content.</p>
        <p>You can use test account.</p>
        <p>Login: kamil@haha.pl</p>
        <p>Password: kamil123</p>
      </Wrapper>
    </Route>
    <Route path="/todo">
      <Wrapper>
        <h2>To Do List</h2>
      </Wrapper>
      <Todo />
    </Route>
    <Route path="/recipe">
      <Wrapper>
        <h1>Recipe App</h1>
        <Recipe theme={theme} />
      </Wrapper>
    </Route>
    <Route path="/sign-in" component={Sign} />
    <Route path="/sign-up" component={Sign} />
  </Switch>
);
