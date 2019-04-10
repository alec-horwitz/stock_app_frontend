import React, { Component } from 'react';
import UUID from 'uuid';

class Settings extends Component {
  state = {
    graph: this.props.graph ? JSON.parse(JSON.stringify(this.props.graph)) : {name:"", type:"Value 1", stocks:[]},
    stockName: "",
    stockvisibile: true
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleStocks = (atrib) => {
    let graph = this.state.graph
    return (graph && graph.stocks ? graph.stocks.map(stock => this.handleStock(atrib, stock)) : null)
  }

  handleStock = (atrib, stock) => {
      if (atrib === "name") {return (<li key={UUID()}>{stock[atrib]}</li>)}
      if (stock[atrib] === true) {
        return (<li key={UUID()}><button onClick={() => this.alterExistingStock(stock.id)}>√</button></li>)
      }
      if (stock[atrib] === false) {
        return (<li key={UUID()}><button onClick={() => this.alterExistingStock(stock.id)}>X</button></li>)
      }
      if (atrib === "Add/Remove") {return (<li key={UUID()}><button id={stock.id}>-</button></li>)}
      return null
  }

  alterExistingStock = (id) => {
    let graph = this.state.graph
    graph.stocks[id].visibile = !graph.stocks[id].visibile
    this.setState({graph})
  }

  alterGraph = (e) => {
    let graph = this.state.graph
    graph[e.target.name] = e.target.value
    this.setState({graph})
  }

  render() {
    return (
      <div className="Settings">
        <button onClick={()=>this.props.handleOnClick(this.props.parent, "Settings")} >Cancel</button>
        <button onClick={()=>this.props.handleOnClick(this.props.parent, "Settings")} >Save</button>
        <br/>
        <h1>Settings</h1>
        <br/>
        <h4>Genral</h4>
        Graph Name: <input
        type="text"
        name="name"
        id="graphName"
        className="graphName"
        onChange={this.alterGraph}
        value={this.state.graph ? this.state.graph.name : ""}
        />
        <br/>
        <h4>Graph</h4>
        Type: <select name="type" onChange={this.alterGraph} value={this.state.graph ? this.state.graph.type : null}>
          <option>Value 1</option>
          <option>Value 2</option>
          <option>Value 3</option>
        </select>
        <br/>
        <h4>Stocks</h4>
        <div className="column-stack">
          <ul>
            <li className="column-header">Name</li>
            {this.handleStocks("name")}
            <li>
              <input
              type="text"
              name="stockName"
              id="stockName"
              className="stockName"
              placeHolder="New Stock"
              value={this.state.stockName}
              onChange={this.handleOnChange}
              />
            </li>
          </ul>
          <ul>
            <li className="column-header">visibile</li>
            {this.handleStocks("visibile")}
            <li>
              <button onClick={() => this.setState({stockvisibile: !this.state.stockvisibile})}
              >
            {this.state.stockvisibile === true? "√" : "X"}
            </button></li>
          </ul>
          <ul>
            <li className="column-header">Add/Remove</li>
            {this.handleStocks("Add/Remove")}
            <li><button >+</button></li>
          </ul>
        </div>
        <br/>
        <h4>Danger Zone</h4>
        <button onClick={()=>this.props.handleOnClick("Menu", "Settings")} >Delete Graph</button>
      </div>
    );
  }
}

export default Settings;
