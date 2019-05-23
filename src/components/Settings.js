import React, { Component } from 'react';
import {API_KEY} from '../Secrets';
import UUID from 'uuid';

class Settings extends Component {
  state = {
    graph: this.props.graph ? JSON.parse(JSON.stringify(this.props.graph)) : {name:"", type:"Value 1", stocks:[]},
    stockTicker: "",
    stockVisible: true,
    allowNav: false
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleStocks = (atrib) => {
    let graph = this.state.graph
    return (graph && graph.stocks ? graph.stocks.map((stock, index)=> this.handleStock(atrib, stock, index)) : null)
  }

  handleStock = (atrib, stock, index) => {
      if (atrib === "ticker") {return (<li key={UUID()}>{stock[atrib]}</li>)} //
      if (stock[atrib] === true) {
        return (<li key={UUID()}><button className="button"  onClick={() => this.alterStocks(stock, index)} disabled={this.state.allowNav} >√</button></li>)
      }
      if (stock[atrib] === false) {
        return (<li key={UUID()}><button className="button" onClick={() => this.alterStocks(stock, index)} disabled={this.state.allowNav} >X</button></li>)
      }
      if (atrib === "Add/Remove") {return (<li key={UUID()}><button className="button" onClick={() => this.alterStocks(null, index)} disabled={this.state.allowNav} >-</button></li>)}
      return null
  }

  addStockData = (stock, graph) => {
    const ticker = stock.ticker.replace(/\s/g,'').toUpperCase()
    const double = this.state.graph.stocks.find(function(s) {
      return ticker === s.ticker
    });
    if (double) {
      setTimeout(() => {alert("ERROR: That stock ticker is already in this graph!");})
      console.error("That stock ticker is already in this graph!")
      this.setState({graph, stockTicker:"", stockVisible: true})
    } else {
      const myData = this.props.myStocks.find(function(s) {
        return ticker === s.ticker
      });
      if (myData) {
        graph.stocks = [...graph.stocks, {ticker:myData.ticker, visible:stock.visible, id: UUID()}]
        this.setState({graph, stockTicker:"", stockVisible: true})
      } else {
        this.setState({allowNav: !this.state.allowNav})
        setTimeout(() => {alert("Checking the quandl database for that stock data. This may take a few seconds.");})

        fetch("https://www.quandl.com/api/v3/datasets/WIKI/"+ticker+"/data.json?api_key="+API_KEY)
        .then(res => res.json())
        .then(res => {
          if (res.dataset_data) {
            graph.stocks = [...graph.stocks, {visible:stock.visible, ticker, id:UUID()}]
            this.setState({graph, stockTicker:"", stockVisible: true, allowNav: !this.state.allowNav})
          } else {
            this.setState({stockTicker:"", allowNav: !this.state.allowNav})
            setTimeout(() => {alert("ERROR: Could not find that stock ticker in our database!");})
          }
        }).catch(error => console.error(error));
      }
    }
  }


  alterStocks = (stock, index) => {
    let graph = JSON.parse(JSON.stringify(this.state.graph))
    if (index === null) {
      if (stock) {
        this.addStockData(stock, graph)
      } else {
        console.error("alterStocks() requires atlest one non-null input!")
      }
    } else {
      if (stock) {
        graph.stocks[index].visible = !graph.stocks[index].visible
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
          <button className="button" onClick={()=>this.props.handleOnClick(this.props.parent, "Settings")} disabled={this.state.allowNav} >Cancel</button>
          <button className="button" onClick={()=>this.props.graphCUD(this.state.graph, null)} disabled={this.state.allowNav} >Save</button>
        </div>
        <h1>Settings</h1>
        <br/>
        <h4>Genral</h4>
        Graph Name: <input
        type="text"
        name="name"
        id="graphName"
        className="graphName input"
        onChange={this.alterGraph}
        value={this.state.graph ? this.state.graph.name : ""}
        disabled={this.state.allowNav}
        />
        <br/>
        <h4>Graph</h4>
        Type: <select className="input" name="type" onChange={this.alterGraph} value={this.state.graph ? this.state.graph.type : null} disabled={this.state.allowNav} >
          <option>Line Graph</option>
          <option>Bar Chart</option>
          <option>Scatter Plot</option>
        </select>
        <br/>
        <h4>Stocks</h4>
        <div className="column-stack">
          <ul>
            <li className="column-header">Ticker</li>
            {this.handleStocks("ticker")}
            <li>
              <input
              type="text"
              name="stockTicker"
              id="stockTicker"
              className="stockTicker input"
              placeholder="New Ticker"
              value={this.state.stockTicker}
              onChange={this.handleOnChange}
              />
            </li>
          </ul>
          <ul>
            <li className="column-header">visible</li>
            {this.handleStocks("visible")}
            <li><button className="button" onClick={() => this.setState({stockVisible: !this.state.stockVisible})} disabled={this.state.allowNav} >
            {this.state.stockVisible === true? "√" : "X"}
            </button></li>
          </ul>
          <ul>
            <li className="column-header">Add/Remove</li>
            {this.handleStocks("Add/Remove")}
            <li>
              <button className="button" onClick={() => this.alterStocks({ticker: this.state.stockTicker, visible: this.state.stockVisible}, null)} disabled={this.state.allowNav}>+</button>
            </li>
          </ul>
        </div>
        <br/>
        {this.props.graph ? 
          <div><h4>Danger Zone</h4>
          <button className="button" onClick={()=>this.props.graphCUD()} disabled={this.state.allowNav} >Delete Graph</button> </div>:
          null}
      </div>
    );
  }
}

export default Settings;
