import React, { Component } from 'react';
import UUID from 'uuid';

class Settings extends Component {
  state = {
    graph: this.props.graph ? JSON.parse(JSON.stringify(this.props.graph)) : {name:"", type:"Value 1", stocks:[]},
    stockName: "",
    stockVisibile: true
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleStocks = (atrib) => {
    let graph = this.state.graph
    return (graph && graph.stocks ? graph.stocks.map((stock, index)=> this.handleStock(atrib, stock, index)) : null)
  }

  handleStock = (atrib, stock, index) => {
      if (atrib === "name") {return (<li key={UUID()}>{stock[atrib]}</li>)}
      if (stock[atrib] === true) {
        return (<li key={UUID()}><button onClick={() => this.alterStocks(stock, index)}>√</button></li>)
      }
      if (stock[atrib] === false) {
        return (<li key={UUID()}><button onClick={() => this.alterStocks(stock, index)}>X</button></li>)
      }
      if (atrib === "Add/Remove") {return (<li key={UUID()}><button onClick={() => this.alterStocks(null, index)}>-</button></li>)}
      return null
  }

  alterStocks = (stock, index) => {
    let graph = this.state.graph
    if (index === null) {
      if (stock) {
        if (stock.name.replace(/\s/g,'') === "") {stock.name = "N/A"}
        graph.stocks = [...graph.stocks, {...stock, id: UUID()}]
        this.setState({graph, stockName:"", stockVisibile: true})
      } else {
        console.error("alterStocks() require atlest one non-null input!")
      }
    } else {
      if (stock) {
        graph.stocks[index].visibile = !graph.stocks[index].visibile
      } else {
        graph.stocks = [...graph.stocks.slice(0, index), ...graph.stocks.slice(index+1)]
      }
      this.setState({graph})
    }
  }

  alterGraph = (e) => {
    let graph = this.state.graph
    graph[e.target.name] = e.target.value
    this.setState({graph})
  }

  render() {
    return (
      <div className="Settings">
        <div className="titleButtons">
          <button onClick={()=>this.props.handleOnClick(this.props.parent, "Settings")} >Cancel</button>
          <button onClick={()=>this.props.graphCUD(this.state.graph, this.props.graphIndex)} >Save</button>
        </div>
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
          <option>Line Graph</option>
          <option>Bar Chart</option>
          <option>Scatter Plot</option>
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
              placeholder="New Stock"
              value={this.state.stockName}
              onChange={this.handleOnChange}
              />
            </li>
          </ul>
          <ul>
            <li className="column-header">visibile</li>
            {this.handleStocks("visibile")}
            <li>
              <button onClick={() => this.setState({stockVisibile: !this.state.stockVisibile})}
              >
            {this.state.stockVisibile === true? "√" : "X"}
            </button></li>
          </ul>
          <ul>
            <li className="column-header">Add/Remove</li>
            {this.handleStocks("Add/Remove")}
            <li>
              <button onClick={() => this.alterStocks({name: this.state.stockName, visibile: this.state.stockVisibile}, null)}>+</button>
            </li>
          </ul>
        </div>
        <br/>
        {this.props.graph ? 
          <div><h4>Danger Zone</h4>
          <button onClick={()=>this.props.graphCUD(null, this.props.graphIndex)} >Delete Graph</button> </div>:
          null}
      </div>
    );
  }
}

export default Settings;
