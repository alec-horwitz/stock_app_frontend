import React, { Component } from 'react';
import UUID from 'uuid';

const sampleStocks = [
  {
    "ticker": "AAPL",
    "revenue": "1124",
    "price": "19342"
  },
  {
    "ticker": "BRK.A",
    "revenue": "2364",
    "price": "17443"
  },
  {
    "ticker": "GOOG",
    "revenue": "3656",
    "price": "34213"
  },
  {
    "ticker": "HOG",
    "revenue": "14323",
    "price": "50321"
  },
  {
    "ticker": "HPQ",
    "revenue": "2657",
    "price": "54273"
  },
  {
    "ticker": "INTC",
    "revenue": "33456",
    "price": "24739"
  },
  {
    "ticker": "MMM",
    "revenue": "17556",
    "price": "59023"
  },
  {
    "ticker": "MSFT",
    "revenue": "29865",
    "price": "39482"
  },
  {
    "ticker": "TGT",
    "revenue": "38535",
    "price": "18729"
  },
  {
    "ticker": "TXN",
    "revenue": "13664",
    "price": "58362"
  },
  {
    "ticker": "WMT",
    "revenue": "29734",
    "price": "48250"
  }
]

class Settings extends Component {
  state = {
    graph: this.props.graph ? JSON.parse(JSON.stringify(this.props.graph)) : {name:"", type:"Value 1", stocks:[]},
    stockTicker: "",
    stockVisible: true
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
        return (<li key={UUID()}><button onClick={() => this.alterStocks(stock, index)} disabled={this.props.navigation.val} >√</button></li>)
      }
      if (stock[atrib] === false) {
        return (<li key={UUID()}><button onClick={() => this.alterStocks(stock, index)} disabled={this.props.navigation.val} >X</button></li>)
      }
      if (atrib === "Add/Remove") {return (<li key={UUID()}><button onClick={() => this.alterStocks(null, index)} disabled={this.props.navigation.val} >-</button></li>)}
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
      return null
    } else {
      const myData = this.props.myStocks.find(function(s) {
        return ticker === s.ticker
      });
      if (myData) {
        graph.stocks = [...graph.stocks, {...stock, ...myData, id: UUID()}]
        this.setState({graph, stockTicker:"", stockVisible: true})
        return myData
      } else {
        this.props.navigation.toggle()
        setTimeout(() => {alert("Checking our database for that stock data. This may take a few seconds.");})
        const newData = sampleStocks.find(function(s) {
          return ticker === s.ticker
        });
        setTimeout(() => {
          this.props.navigation.toggle()
          if (newData) {
            graph.stocks = [...graph.stocks, {...stock, ...newData, id: UUID()}]
            this.setState({graph, stockTicker:"", stockVisible: true})
          } else {
            setTimeout(() => {alert("ERROR: Could not find that stock ticker in our database!");})
            console.error("Could not find that stock ticker in our database!")
            this.setState({graph, stockTicker:"", stockVisible: true})
          }
        }, 10000)
      }
    }
  }

  alterStocks = (stock, index) => {
    let graph = this.state.graph
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
          <button onClick={()=>this.props.handleOnClick(this.props.parent, "Settings")} disabled={this.props.navigation.val} >Cancel</button>
          <button onClick={()=>this.props.graphCUD(this.state.graph, null)} disabled={this.props.navigation.val} >Save</button>
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
        disabled={this.props.navigation.val}
        />
        <br/>
        <h4>Graph</h4>
        Type: <select name="type" onChange={this.alterGraph} value={this.state.graph ? this.state.graph.type : null} disabled={this.props.navigation.val} >
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
              className="stockTicker"
              placeholder="New Ticker"
              value={this.state.stockTicker}
              onChange={this.handleOnChange}
              />
            </li>
          </ul>
          <ul>
            <li className="column-header">visible</li>
            {this.handleStocks("visible")}
            <li><button onClick={() => this.setState({stockVisible: !this.state.stockVisible})} disabled={this.props.navigation.val} >
            {this.state.stockVisible === true? "√" : "X"}
            </button></li>
          </ul>
          <ul>
            <li className="column-header">Add/Remove</li>
            {this.handleStocks("Add/Remove")}
            <li>
              <button onClick={() => this.alterStocks({ticker: this.state.stockTicker, visible: this.state.stockVisible}, null)} disabled={this.props.navigation.val}>+</button>
            </li>
          </ul>
        </div>
        <br/>
        {this.props.graph ? 
          <div><h4>Danger Zone</h4>
          <button onClick={()=>this.props.graphCUD()} disabled={this.props.navigation.val} >Delete Graph</button> </div>:
          null}
      </div>
    );
  }
}

export default Settings;
