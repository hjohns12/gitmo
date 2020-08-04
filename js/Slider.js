class Slider {
  constructor(state, setGlobalState) {

  const width = 565,
        height = 180,
        margin = { top: 20, right: 50, bottom: 20, left: 40 },
        paddingInner = 0.2;


  const xScale = d3
    .scaleBand() //time 
    .domain(state.historicalData.map(d => d.year))
    .range([margin.left, width - margin.right])
    .paddingInner(paddingInner);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(state.historicalData, d => d.value)])
    .range([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom(xScale).ticks(state.historicalData.length);

  const svg = d3
    .select("#small-bars")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const rect = svg
    .selectAll("rect")
    .data(state.historicalData)
    .join("rect")
    .attr("y", d => yScale(d.value))
    .attr("x", d => xScale(d.year))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d.value))
    .attr("fill", "steelblue")

  const text = svg
    .selectAll("text")
    .data(state.historicalData)
    .join("text")
    .attr("class", "label")
    // this allows us to position the text in the center of the bar
    .attr("x", d => xScale(d.year) + (xScale.bandwidth() / 5))
    .attr("y", d => yScale(d.value) - 23)
    .text(d => d.value)
    .attr("dy", "1.25em");

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);


  }
}

export { Slider };