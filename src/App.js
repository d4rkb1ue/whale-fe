import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as semantic from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <button class='ui button' role='button'>
          Click Here
        </button>
      </div>
    );
  }
}

export default App;
