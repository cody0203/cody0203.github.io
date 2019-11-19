import React from "react";
import Loadable from "react-loadable";

const Loading = ({ error }) => {
  if (error) {
    return <div>Oh nooess</div>;
  }
  return <div>Loading...</div>;
};

const Home = Loadable({
  loader: () => import("./Home"),
  loading: Loading
});

const Login = Loadable({
  loader: () => import("./Login"),
  loading: Loading
});

const Table = Loadable({
  loader: () => import("./App"),
  loading: Loading
});

const NotFound = Loadable({
  loader: () => import("./NotFound"),
  loading: Loading
});

export default [
  {
    path: "/",
    title: "Home",
    components: Home
  },
  {
    path: "/login",
    title: "Login",
    components: Login
  },
  {
    path: "/table",
    title: "Table ",
    components: Table
  }
];
