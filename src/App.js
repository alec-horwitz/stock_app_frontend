import React, { Component } from 'react';
import Menu from './components/Menu';
import Graph from './components/Graph';
import Settings from './components/Settings';
import Suggestions from './components/Suggestions';
import './App.css';

class App extends Component {
  state={
    page: "Menu",
    parent: null
  }
  handleOnClick = (page, parent) => {
    this.setState({page, parent})
  }
  render() {
    return (
      <div className="App">
        {this.state.page === "Menu" ? <Menu handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Graph" ? <Graph handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Settings" ? <Settings parent={this.state.parent} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Suggestions" ? <Suggestions handleOnClick={this.handleOnClick} /> : null}

      </div>
    );
  }
}

export default App;
