import React, { Component } from 'react';

class Settings extends Component {
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
        <button >Something</button>
        <br/>
        <h4>Graph</h4>
        <button >Something</button>
        <br/>
        <h4>Danger Zone</h4>
        <button onClick={()=>this.props.handleOnClick("Menu", "Settings")} >Delete Graph</button>
      </div>
    );
  }
}

export default Settings;
