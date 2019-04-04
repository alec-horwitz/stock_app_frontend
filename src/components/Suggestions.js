import React, { Component } from 'react';
import './Suggestions.css';

class Suggestions extends Component {
  render() {
    return (
      <div className="Suggestions">
        <button onClick={()=>this.props.handleOnClick("Graph", "Suggestions")} >Back</button>
        <br/>
        <h1>Suggestions</h1>
        <br/>
        <p>Using the stock data from your [graph name here] graph and a mechine learning algorithem, the following stock recomendatitions have been generated.</p>
        <br/>
        <p>Be Advised: These suggestions may not be reliable for a number of reasons(for example the stock data being used is out of date and the mechine learning algorithem is not very sophisticated). Should you decide to act on these suggestions, please do so at your own risk.</p>
        <br/>
        <div class="column-stack">
		  <ul>
		    <li class="column-header">Buy</li>
		    <li>Stock 1</li>
		    <li>Stock 2</li>
		    <li>Stock 3</li>
		    <li>Stock 4</li>
		  </ul>
		  <ul>
		    <li class="column-header">Sell</li>
		    <li>Stock 1</li>
		    <li>Stock 2</li>
		    <li>Stock 3</li>
		    <li>Stock 4</li>
		  </ul>
		</div>
      </div>
    );
  }
}

export default Suggestions;
