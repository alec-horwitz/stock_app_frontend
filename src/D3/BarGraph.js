import * as d3 from "d3";

const BarGraph = (settings) => {

	const margin = {left:100, right:10, top:10, bottom:100}

	const data = JSON.parse(JSON.stringify(settings.stocks)).filter(function(stock) { return stock.visible; })
	const width = window.innerWidth - margin.left - margin.right - 15
	const height = window.innerHeight - margin.top - margin.bottom - 100

	// X Scale
	const xScale = d3.scaleBand()
		.domain(data.map(function(d){return d.ticker}))
		.range([0,width])
		.paddingInner(0.3)
		.paddingOuter(0.3)

	// Y Scale
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(data, function(d){return d.price})])
		.range([height,0])

	const xAxisCall = d3.axisBottom().scale(xScale)
	const yAxisCall = d3.axisLeft().scale(yScale)

	let svg = d3.select(".D3Graph")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)

	let g = svg.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

	// X Label
	g.append("text")
		.attr("y", height + 50)
		.attr("x", width / 2)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.text("Stock");

	// Y Label
	g.append("text")
		.attr("y", -60)
		.attr("x", -(height / 2))
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.text("Price");

	g.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(xAxisCall)
		.selectAll("text")
		.attr("y", 10)
		.attr("x", -5)
		.attr("text-anchor", "end")
		.attr("transform", "rotate(-40)")

	g.append("g")
		.attr("class", "y axis")
		.call(yAxisCall)

	g.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("y", function(d){return yScale(d.price)})
		.attr("x", function(d){return xScale(d.ticker)})
		.attr("width", xScale.bandwidth)
		.attr("height", function(d){return height - yScale(d.price)})
		.attr("fill", "gray")

	// const margin = {left:100, right:10, top:10, bottom:100}

	// let width = window.innerWidth - margin.left - margin.right - 15
	// let height = window.innerHeight - margin.top - margin.bottom - 100
	
	// let svg = d3.select(".D3Graph")
	// 	.append("svg")
	// 		.attr("width", width + margin.left + margin.right)
	// 		.attr("height", height + margin.top + margin.bottom)
	// let g = svg.append("g")
	// 			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

	// const xAxisGroup = g.append("g")
	// 	.attr("class", "x axis")

	// const yAxisGroup = g.append("g")
	// 	.attr("class", "y axis")

	// // X Scale
	// const xScale = d3.scaleBand()

	// // Y Scale
	// const yScale = d3.scaleLinear()
	
	// // X Label
	// const xLabel = g.append("text")

	// // Y Label
	// const yLabel = g.append("text")

	// const data = JSON.parse(JSON.stringify(settings.stocks)).filter(function(stock) { return stock.visible; })

	// d3.interval(()=> {
	// 	update(data, width, height, margin, svg, xScale, yScale, xAxisGroup, yAxisGroup, xLabel, yLabel, g)
	// }, 1000)
	// update(data, width, height, margin, svg, xScale, yScale, xAxisGroup, yAxisGroup, xLabel, yLabel, g)
}

const update = (data, width, height, margin, svg, xScale, yScale, xAxisGroup, yAxisGroup, xLabel, yLabel, g) => {
	width = window.innerWidth - margin.left - margin.right - 15
	height = window.innerHeight - margin.top - margin.bottom - 100
	svg
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)

	xScale
		.domain(data.map(function(d){return d.ticker}))
		.range([0,width])
		.paddingInner(0.3)
		.paddingOuter(0.3)

	yScale
		.domain([0, d3.max(data, function(d){return d.price})])
		.range([height,0])

	// X Axis
	const xAxisCall = d3.axisBottom().scale(xScale)
	xAxisGroup.call(xAxisCall)
		.attr("transform", "translate(0, " + height + ")")
		.selectAll("text")
		.attr("y", 10)
		.attr("x", -5)
		.attr("text-anchor", "end")
		.attr("transform", "rotate(-40)")

	// Y Axis
	const yAxisCall = d3.axisLeft().scale(yScale)
	yAxisGroup.call(yAxisCall)

	xLabel
		.attr("y", height + 50)
		.attr("x", width / 2)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.text("Stock");

	yLabel
		.attr("x", -(height / 2))
		.attr("y", -60)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.text("Price");

	// Bars

	// JOIN new data with old elements
	let rects = g.selectAll("rect")
		.data(data)

	// EXIT old elements not present in new data
	rects.exit().remove()

	// UPDATE old elements present in new data
	rects
		.append("rect")
		.attr("y", function(d){return yScale(d.price)})
		.attr("x", function(d){return xScale(d.ticker)})
		.attr("width", xScale.bandwidth)
		.attr("height", function(d){return height - yScale(d.price)})
	
	// ENTER new elements present in new data
	rects.enter()
		.append("rect")
		.attr("y", function(d){return yScale(d.price)})
		.attr("x", function(d){return xScale(d.ticker)})
		.attr("width", xScale.bandwidth)
		.attr("height", function(d){return height - yScale(d.price)})
		.attr("fill", "gray")

}

export default BarGraph