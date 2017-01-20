import React, { Component } from 'react';
import Suggestion from './suggestion/suggestion';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: 'MSFT' },
        { id: 2, text: 'AAPL' }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="suggestion-container">
          <Suggestion items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;
