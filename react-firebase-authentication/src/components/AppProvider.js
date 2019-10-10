import { React, Component, createContext } from "react";
import { firebase } from "../firebase";
export const { Provider, Consumer } = createContext();

class Provider extends Component {
  state = {
    currentUser: AppProvider.defaultProps.currentUser,
    message: AppProvider.defaultProps.message
  };
}
