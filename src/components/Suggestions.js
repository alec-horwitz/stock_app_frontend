import React, { Component } from 'react';

class Suggestions extends Component {
  render() {
    return (
      <div className="Suggestions">
        <button onClick={()=>this.props.handleOnClick("Graph", "Suggestions")} >Back</button>
        <br/>
        <h1>Suggestions</h1>
      </div>
    );
  }
}

export default Suggestions;
