import React, { Component } from 'react';
import UUID from 'uuid';

const sampleStocks = [
  {
    "ticker": "AAPL",
    "price": "19342"
  },
  {
    "ticker": "BRK.A",
    "price": "17443"
  },
  {
    "ticker": "GOOG",
    "price": "34213"
  },
  {
    "ticker": "HOG",
    "price": "50321"
  },
  {
    "ticker": "HPQ",
    "price": "54273"
  },
  {
    "ticker": "INTC",
    "price": "24739"
  },
  {
    "ticker": "MMM",
    "price": "59023"
  },
  {
    "ticker": "MSFT",
    "price": "39482"
  },
  {
    "ticker": "TGT",
    "price": "18729"
  },
  {
    "ticker": "TXN",
    "price": "58362"
  },
  {
    "ticker": "WMT",
    "price": "48250"
  }
]

function sleep(milliseconds) {
  const start = new Date().getTime();
  for (const i = 0; i < 1; i) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

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
        return (<li key={UUID()}><button onClick={() => this.alterStocks(stock, index)}>√</button></li>)
      }
      if (stock[atrib] === false) {
        return (<li key={UUID()}><button onClick={() => this.alterStocks(stock, index)}>X</button></li>)
      }
      if (atrib === "Add/Remove") {return (<li key={UUID()}><button onClick={() => this.alterStocks(null, index)}>-</button></li>)}
      return null
  }

  getStockData = (ticker) => {
    ticker = ticker.replace(/\s/g,'').toUpperCase()
    const double = this.state.graph.stocks.find(function(s) {
      return ticker === s.ticker
    });
    if (double) {
      alert("ERROR: That stock ticker is already in this graph!");
      console.error("That stock ticker is already in this graph!")
      return null
    } else {
      const myData = this.props.myStocks.find(function(s) {
        return ticker === s.ticker
      });
      if (myData) {
        return myData
      } else {
        this.props.navigation.toggle()
        let newData
        alert("Checking our database for that stock data. This may take a few seconds.");
        sleep(10000)
        newData = sampleStocks.find(function(s) {
          return ticker === s.ticker
        });
        setTimeout(() => {
          this.props.navigation.toggle()
        }, 1000)
        if (newData) {
          return newData
        } else {
          alert("ERROR: Could not find that stock ticker in our database!");
          console.error("Could not find that stock ticker in our database!")
          return null
        }
      }
    }
  }

  alterStocks = (stock, index) => {
    let graph = this.state.graph
    if (index === null) {
      if (stock) {
        const stockData = this.getStockData(stock.ticker)
        if ( stockData ) {
          graph.stocks = [...graph.stocks, {...stock, ...stockData, id: UUID()}]
          this.setState({graph, stockTicker:"", stockVisible: true})
        } else {
          this.setState({graph, stockTicker:"", stockVisible: true})
        }
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
          <button onClick={()=>this.props.graphCUD(this.state.graph, this.props.graphIndex)} disabled={this.props.navigation.val} >Save</button>
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
          <button onClick={()=>this.props.graphCUD(null, this.props.graphIndex)} disabled={this.props.navigation.val} >Delete Graph</button> </div>:
          null}
      </div>
    );
  }
}

export default Settings;
