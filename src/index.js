import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SoftUIControllerProvider } from "./context";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'
import "./index.css"
import { Provider } from 'react-redux';
import { store, persistor  } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import "react-multi-carousel/lib/styles.css";
import {createStore} from 'redux'
import rootReducer from './reducers';
import CartProvider from './store/CartProvider';

const store1 = createStore(rootReducer)


ReactDOM.render(
  <Provider store={store1}>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
  <SoftUIControllerProvider>
  <ToastContainer />
  <CartProvider>
  <App />
  </CartProvider>
  </SoftUIControllerProvider>
</BrowserRouter>
  </PersistGate>
  </Provider>
  </Provider>,
  document.getElementById("root")
);
