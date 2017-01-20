import React, { Component } from 'react';
import './suggestion.scss';

class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchFieldData: '',
      nextItemId: 0,
      suggestionListVisible: false
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputPaste = this.handleInputPaste.bind(this);
    this.handleInputDrop = this.handleInputDrop.bind(this);
    this.handleSuggestionInputClick = this.handleSuggestionInputClick.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    this.setState({items: this.props.items});
    const newNextItemId = Math.max(...this.props.items.map(x => x.id)) || 0;
    this.setState({nextItemId: newNextItemId + 1});
    console.log('componentDidMount');
    if (this.suggestionOptionsDOMElement) {
      this.suggestionOptionsDOMElement.style.width = `${this.suggestionDOMElement.offsetWidth}px`;
    }
  }

  handleDeleteClick(e, item) {
    this.setState({items: this.state.items.filter(selecteditem => !Object.is(selecteditem, item))});
  }

  handleInputChange(e) {
    this.setState({searchFieldData: e.target.value});
  }

  handleInputKeyUp(event) {
    if (event.keyCode === 186) {
      // process semicolon
      const boxText = this.state.searchFieldData.substr(0, this.state.searchFieldData.indexOf(';')).trim();
      if (boxText.length === 0) {
        return;
      }

      const restText = this.state.searchFieldData.substr(this.state.searchFieldData.indexOf(';') + 1, this.state.searchFieldData.length).trim();
      this.setState({items: [...this.state.items, {id: this._nextItemId(), text: boxText, notSuggested: true}]});
      this.setState({searchFieldData: restText});
    } else if (event.keyCode === 13) {
      // process enter
      const boxText = this.state.searchFieldData.trim();
      if (boxText.length === 0) {
        return;
      }

      this.setState({items: [...this.state.items, {id: this._nextItemId(), text: boxText, notSuggested: true}]});
      this.setState({searchFieldData: ''});
    } else if (event.keyCode === 38) {
      console.log('process ArrowUp');
    } else if (event.keyCode === 40) {
      console.log('process ArrowDown')
    } else if (event.keyCode === 8) {
      console.log('process Backspace')
    } else {
      this.setState({suggestionListVisible: true});
    }
  }

  handleInputBlur(e) {
    const boxText = this.state.searchFieldData.trim();
    if (boxText.length === 0) {
      return;
    }

    this.setState({items: [...this.state.items, {id: this._nextItemId(), text: boxText, notSuggested: true}]});
    this.setState({searchFieldData: ''});
  }

  handleInputPaste(e) {
    e.preventDefault();
    this._createBlocksFromRawText(e.clipboardData.getData('Text'));
  }

  handleInputDrop(e) {
    e.preventDefault();
    this._createBlocksFromRawText(e.dataTransfer.getData('Text'));
  }

  handleSuggestionInputClick(event) {
    const attrs = [...event.nativeEvent.target.attributes];

    let newItem = {
      id: this._nextItemId()
    };

    attrs.filter(item => item.name.startsWith('data')).forEach(item => {
      const newName = item.name.replace('data-', '');
      newItem[newName] = item.nodeValue
    });

    this.setState({items: [...this.state.items, newItem]});
    this.setState({suggestionListVisible: false});
  }

  _createBlocksFromRawText(str) {
    let newItems = str.split(';').map(i => i.trim());
    if (newItems[newItems.length - 1]) {
      this.setState({searchFieldData: newItems.pop()});
    }

    newItems = newItems.filter(i => i).map(x => {
      return {text: x};
    });

    this.setState({items: [...this.state.items, ...newItems]})
  }

  _nextItemId() {
    let itemId = this.state.nextItemId;
    this.setState({nextItemId: itemId + 1});
    return itemId;
  }

  render() {
    return (
      <div className="suggestion" ref={element => this.suggestionDOMElement = element}>
        <div className="suggestion-tags">
          {this.state.items.map(item => {
            return <div className="suggestion-box" key={item.id}>
              <div>{item.text}</div>
              <span onClick={e => this.handleDeleteClick(e, item)}>
                <i className="remove_icon"></i>
              </span>
            </div>
          })}
          <input type="text" className="form-control" value={this.state.searchFieldData}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
            onBlur={this.handleInputBlur}
            onPaste={this.handleInputPaste}
            onDrop={this.handleInputDrop} />
        </div>
        {this.state.suggestionListVisible &&
          <div className="suggestion-options"
            ref={element => this.suggestionOptionsDOMElement = element}
            onClick={this.handleSuggestionInputClick}>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}

export default Suggestion;
