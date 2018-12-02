import React, { Component } from 'react';
import './App.css';
import store from './store';
import Routes from './Routes.js';

import { Provider } from "react-redux";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Routes/>
        </Provider>
      </div>
    );
  }
}

export default App;
