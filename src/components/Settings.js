import React, { Component } from 'react';

class Settings extends Component {
  render() {
  	console.log(this.props)
    return (
      <div className="Settings">
        <button onClick={()=>this.props.handleOnClick(this.props.parent, "Settings")} >Back</button>
        <br/>
        <h1>Settings</h1>
      </div>
    );
  }
}

export default Settings;
