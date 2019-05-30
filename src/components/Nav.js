import React, { Component } from 'react';

class Nav extends Component {

  getChild = (i) => {
    if (this.props.children && this.props.children[i]) {
      return this.props.children[i]
    } else {
      return <p style={{visibility: "hidden"}} />
    }
  }

  render() {
    return (
      <div className="nav" >
        {this.getChild(0)}
        <h1>StockView</h1>
        {this.getChild(1)}
      </div>
    );
  }
}

export default Nav;