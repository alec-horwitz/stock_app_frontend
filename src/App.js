import React, { Component } from 'react';
import Menu from './components/Menu';
import Graph from './components/Graph';
import Settings from './components/Settings';
import Suggestions from './components/Suggestions';
import './App.css';

const sampleGraphs = [
  {
    id:0, 
    name:"Graphı", 
    type:"Line Graph", 
    stocks:[
      {
        id:0, 
        ticker: "GOOG",
        revenue: 14584,
        price: 34213,
        visible:true
      },
      {
        id:1, 
        ticker: "HOG",
        revenue: 23577,
        price: 58362, 
        visible:false
      },
      {
        id:2, 
        ticker: "TXN",
        revenue: 53434,
        price: 18729, 
        visible:false
      },
    ]
  },
  {
    id:1, 
    name:"GrÁf 2", 
    type:"Bar Chart", 
    stocks:[
      {
        id:0, 
        ticker: "HPQ",
        revenue: 47083,
        price: 48250, 
        visible:false
      },
      {
        id:1, 
        ticker: "INTC",
        revenue: 38292,
        price: 24739, 
        visible:true
      },
      {
        id:2, 
        ticker: "BRK.A",
        revenue: 29769,
        price: 59023, 
        visible:false
      },
    ]
  },
  {
    id:2, 
    name:"gRAPHπ", 
    type:"Scatter Plot", 
    stocks:[
      {
        id:0, 
        ticker: "WMT",
        revenue: 19875,
        price: 54273, 
        visible:false
      },
      {
        id:1, 
        ticker: "MSFT",
        revenue: 35857,
        price: 34213, 
        visible:false
      },
      {
        id:2, 
        ticker: "TGT",
        revenue: 18759,
        price: 19342, 
        visible:true
      },
    ]
  }]

function sleep(milliseconds) {
  const start = new Date().getTime();
  for (const i = 0; i < 1; i) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

class App extends Component {
  state={
    graphs: [],
    graphIndex: null,
    page: "Menu",
    parent: null,
    allowNav: true
  }

  componentDidMount() {
    setTimeout(() => {
      alert("Loading your graphs from our database. This may take a few seconds.");
      sleep(5000)
      this.setState({graphs: sampleGraphs})
    }, 0)
    setTimeout(() => {
      this.toggleNavigation()
    }, 1000)
  }

  toggleNavigation = () => {
    this.setState({allowNav: !this.state.allowNav})
  }

  handleOnClick = (page, parent, graphIndex=this.state.graphIndex, graphs=this.state.graphs) => {
    this.setState({page, parent, graphIndex, graphs})
  }

  graphCUD = (newGraph, newGraphIndex) => {
    const graphs = this.state.graphs
    const len = this.state.graphs.length
    if (newGraph) {  
      if (newGraphIndex !== null) {
        this.setState({
          graphs: [...graphs.slice(0, newGraphIndex), newGraph, ...graphs.slice(newGraphIndex+1)],
          graphIndex: newGraphIndex,
          page: "Graph",
          parent: "Menu"
        })
      } else {
        this.setState({
          graphs: [...this.state.graphs, {...newGraph, id:len}],
          graphIndex: len,
          page: "Graph",
          parent: "Menu"
        })
      }
    } else {
      this.setState({
        graphs: newGraphIndex !== null ? [...graphs.slice(0, newGraphIndex), ...graphs.slice(newGraphIndex+1)] : graphs,
        graphIndex: null,
        page: "Menu",
        parent: null
      })
    }

  }

  render() {
    let myStocks = []
    const {graphs, graphIndex, allowNav} = this.state
    const stockLists = graphs.map(graph => {return graph.stocks})
    stockLists.forEach(function(stockList) {
        myStocks = [...myStocks, ...stockList]
    });

    return (
      <div className="App">
        {this.state.page === "Menu" ? <Menu navigation={{toggle: this.toggleNavigation, val: allowNav}} graphs={graphs} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Graph" ? <Graph graph={graphs[graphIndex]} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Settings" ? <Settings navigation={{toggle: this.toggleNavigation, val: allowNav}} myStocks={myStocks} graph={graphs[graphIndex]} graphIndex={graphIndex} graphCUD={this.graphCUD} parent={this.state.parent} handleOnClick={this.handleOnClick} /> : null}
        {this.state.page === "Suggestions" ? <Suggestions graph={graphs[graphIndex]} handleOnClick={this.handleOnClick} /> : null}

      </div>
    );
  }
}

export default App;