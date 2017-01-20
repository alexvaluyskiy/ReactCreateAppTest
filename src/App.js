import React, { Component } from 'react';
import Suggestion from './suggestion/suggestion';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: 'MSFT' },
        { id: 2, text: 'AAPL' }
      ],
      suggestions: [
        { ticker: 'MSFT', companyName: 'Microsoft Corp', cik: '0000054354'},
        { ticker: 'APPL', companyName: 'Apple Inc.', cik: '0000054352'},
        { ticker: 'EPAM', companyName: 'EPAM SYSTEMS INC.', cik: '0000054353'},
        { ticker: 'LXFT', companyName: 'Luxoft Holding Inc.', cik: '0000054351'},
        { ticker: 'APPL', companyName: 'Apple Inc.', cik: '0000054350'}
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
          <Suggestion items={this.state.items}>
            <ul>
              {this.state.suggestions.map(item => {
                return <li
                  key={item.cik}
                  data-cik={item.cik}
                  data-ticker={item.ticker}
                  data-company={item.companyName}
                  data-text={item.companyName}
                  >{item.companyName} ({item.ticker})</li>;
              })}
            </ul>
          </Suggestion>
        </div>
        <p>Text below suggestion Text below suggestion Text below suggestion Text below suggestion Text below suggestion</p>
      </div>
    );
  }
}

export default App;
