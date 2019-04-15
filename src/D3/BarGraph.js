
import React, { Component } from 'react';
import * as d3 from "d3";

const graphImg = require('../assets/images/graph.svg')


class BarGraph extends Component {
	state = {
		data: JSON.parse(JSON.stringify(this.props.data)),
		settings: JSON.parse(JSON.stringify(this.props.settings))
	}
	// xScale = d3.scaleBand()
	// 	.domain(data.map(function(d){return d.month}))
	// 	.range([0,width])
	// 	.paddingInner(0.3)
	// 	.paddingOuter(0.3)
	// yScale = d3.scaleLinear()
	// 	.domain([d3.extend(data, function(d){return d.revenue})])
	// 	.range([height,0])
	// xAxis = d3.axisBottom().scale(this.xScale)
	// yAxisCall = d3.axisLeft().scale(this.yScale)

	render() {
		return (
			<div className="barGraph">
				<img alt={this.props.settings.name+" image"} src={graphImg} height="400rem" width="300rem"/>
			</div>
		);
	}
}

export default BarGraph;
