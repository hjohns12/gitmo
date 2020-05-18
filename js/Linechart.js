class Linechart {
    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.8;
        this.margins = { top: 0, bottom: 50, left: 40, right: 20 };
        let xScale;
        let yScale;
        let xAxis;
        let yAxis;
        let svg;

        svg = d3
          .select("#linechart")
          .append("svg-line")
          .attr("width", this.width)
          .attr("height", this.height)

        xScale = d3
          .scaleTime()
          .domain(d3.extent(state.lineData, d => d.date))
          .range([this.margins.left, this.width - this.margins.right])

        yScale = d3
          .scaleLinear()
          .domain([0, d3.max(state.lineData, d => d.count)])
          .range([this.height - this.margins.bottom, this.margins.top]);

        xAxis = d3.axisBottom(xScale);
        yAxis = d3.axisLeft(yScale);

        // add the yAxis
        svg
          .append("g")
          .attr("class", "axis line-y-axis")
          .attr("transform", `translate(${this.margins.left},0)`)
          .call(yAxis)
          .append("text")
          .attr("class", "axis-label")
          .attr("y", "50%")
          .attr("dx", "-3em")
          .attr("writing-mode", "vertical-rl")
          .text("Stories per day");

        // add the xAxis
        svg
          .append("g")
          .attr("class", "axis line-x-axis")
          .attr("transform", `translate(0,${this.height - this.margins.bottom})`)
          .call(xAxis)
          .append("text")
          .attr("class", "axis-label")
          .attr("x", "50%")
          .attr("dy", "3em")
          .text("Date");

        const line = d3.line()
          .defined(d => !isNaN(d.value))
          .x(d => x(d.date))
          .y(d => y(d.count))
        
        svg.append("path")
          .datum(state.lineData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line);

    }



}

export { Linechart };