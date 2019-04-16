import * as d3 from "d3";

const BarGraph = (data, settings) => {
	const margin = {left:100, right:10, top:10, bottom:100}

	const width = 300 - margin.left - margin.right
	const height = 400 - margin.top - margin.bottom
 
	const xScale = d3.scaleBand()
		.domain(data.map(function(d){return d.ticker}))
		.range([0,width])
		.paddingInner(0.3)
		.paddingOuter(0.3)

	const yScale = d3.scaleLinear()
		.domain(d3.extent(data, function(d){return d.price}))
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
}

export default BarGraph