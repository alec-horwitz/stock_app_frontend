import * as d3 from "d3";

let flag = true
const margin = {left:100, right:10, top:10, bottom:100}
const transition = d3.transition().duration(500);

let windowInnerHeight = window.innerHeight
let windowInnerWidth = window.innerWidth
let changeDetected = false

const BarGraph = (settings) => {
  const data = JSON.parse(JSON.stringify(settings.stocks)).filter(function(stock) { return stock.visible; })

      
  let svg = d3.select(".D3Graph")
    .append("svg")
  const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  // X Axis
  const xAxisGroup = g.append("g")
      .attr("class", "x axis");

  // Y Axis
  const yAxisGroup = g.append("g")
      .attr("class", "y axis");

  // X Scale
  const xScale = d3.scaleBand();

  // Y Scale
  const yScale = d3.scaleLinear();

  // X Label
  const xLabel = g.append("text")

  // Y Label
  const yLabel = g.append("text")

  const timer = d3.interval(()=>{
    if (document.visibilityState === "visible") {
      update(data, svg, g, xAxisGroup, yAxisGroup, xScale, yScale, xLabel, yLabel)
    }
  }, 1000)
  const interval = d3.interval(()=> {
    if (document.visibilityState === "visible") {
      flag = !flag
    }
  }, 5000)
  update(data, svg, g, xAxisGroup, yAxisGroup, xScale, yScale, xLabel, yLabel)

  return [interval, timer]
}

const update = (data, svg, g, xAxisGroup, yAxisGroup, xScale, yScale, xLabel, yLabel) => {
  
  if ((windowInnerHeight === window.innerHeight) && (windowInnerWidth === window.innerWidth)) {
    changeDetected = false
  }

  const isRotateLandscape = ((windowInnerHeight > window.innerHeight) && (windowInnerWidth < window.innerWidth))
  const isRotatePortrait = ((windowInnerHeight < window.innerHeight) && (windowInnerWidth > window.innerWidth))

  if (!changeDetected && (isRotateLandscape || isRotatePortrait)) {
    changeDetected = true
    const swap = windowInnerHeight
    windowInnerHeight = windowInnerWidth
    windowInnerWidth = swap
  } else {
    windowInnerHeight = window.innerHeight
    windowInnerWidth = window.innerWidth
  }

  const height = windowInnerHeight - margin.top - margin.bottom - 100
  const width = windowInnerWidth - margin.left - margin.right - 15
  const value = flag ? 1 : 4;

  svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  xLabel
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Stock");

  yLabel
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Price");

  xScale
    .domain(data.map(function(d){ return d.ticker }))
    .range([0, width])
    .padding(0.2)
  yScale
    .domain([0, d3.max(data, function(d) { return d.dataset[0][value] })])
    .range([height, 0])

  // X Axis
  const xAxisCall = d3.axisBottom(xScale);
  xAxisGroup.call(xAxisCall)
    .attr("transform", "translate(0," + height +")")
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -5)
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")

  // Y Axis
  const yAxisCall = d3.axisLeft(yScale)
      .tickFormat(function(d){ return "$" + d; });
  yAxisGroup.call(yAxisCall);

  // JOIN new data with old elements.
  const rects = g.selectAll("rect")
      .data(data);

  // EXIT old elements not present in new data.
  rects.exit()
    .attr("fill", "red")
    .transition(transition)
    .attr("y", yScale[0])
    .attr("height", 0)
    .remove();

  // ENTER new elements present in new data.
  rects.enter()
    .append("rect")
      .attr("fill", "grey")
      .attr("y", yScale[0])
      .attr("height", 0)
      .attr("x", function(d){ return xScale(d.ticker) })
      .attr("width", xScale.bandwidth)
      // AND UPDATE old elements present in new data
      .merge(rects)
      .transition(transition)
        .attr("x", function(d){ return xScale(d.ticker) })
        .attr("width", xScale.bandwidth)
        .attr("y", function(d){ return yScale(d.dataset[0][value]); })
        .attr("height", function(d){ return height - yScale(d.dataset[0][value]); })

    const label = flag ? "Opening Price" : "Closing Price";
    yLabel.text(label);
}

export default BarGraph