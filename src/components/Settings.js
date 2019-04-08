import React, { Component } from 'react';

class Settings extends Component {
  state = {
    GraphName: this.props.graph.name
  }

  handleGraphNameChange = (e) => {
    this.setState({GraphName: e.target.value})
  }

  render() {
  	console.log(this.props)
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
        name="GraphName"
        id="GraphName"
        className="GraphName"
        onChange={this.handleGraphNameChange}
        value={this.state.GraphName}
        />
        <br/>
        <h4>Graph</h4>
        Type: <select name="select1">
          <option>Value 1</option>
          <option>Value 2</option>
          <option>Value 3</option>
        </select>
        <br/>
        <h4>Stocks</h4>
        <div class="column-stack">
          <ul>
            <li class="column-header">Name</li>
            <li>Stock 1</li>
            <li>Stock 2</li>
            <li>
              <input
              type="text"
              name="AddStockName"
              id="AddStockName"
              className="AddStockName"
              value={"Something"}
              />
            </li>
          </ul>
          <ul>
            <li class="column-header">Visable</li>
            <li><button >√</button></li>
            <li><button >X</button></li>
            <li><button >√</button></li>
          </ul>
          <ul>
            <li class="column-header">Add/Remove</li>
            <li><button >-</button></li>
            <li><button >-</button></li>
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
