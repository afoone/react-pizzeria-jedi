import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";
import UsuarioProvider from "./context/UsuarioProvider";
import 'react-toastify/dist/ReactToastify.css';


const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </Provider>,
  document.getElementById("root")
);
