class Linechart {
    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.8;
        this.margins = { top: 0, bottom: 50, left: 40, right: 20 };

        this.svg = d3
          .select("#linechart")
          .append("svg-line")
          .attr("width", this.width)
          .attr("height", this.height)

        const xScale = d3
          .scaleUtc()
          .domain(d3.extent(state.lineData, d => d.date))
          .range([this.margins.left, this.width - this.margins.right])

        console.log("xScale domain-nline chart", xScale.domain())

        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(state.lineData, d => d.count)]).nice()
          .range([this.height - this.margins.bottom, this.margins.top])
        
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

          // add the xAxis
        this.svg
          .append("g")
          .attr("class", "axis x-axis")
          .attr("transform", `translate(0,${this.height - this.margins.bottom})`)
          .call(xAxis)
          .append("text")
          .attr("class", "axis-label")
          .attr("x", "50%")
          .attr("dy", "3em")
          .text("Date");

        // add the yAxis
        this.svg
          .append("g")
          .attr("class", "axis y-axis")
          .attr("transform", `translate(${this.margins.left},0)`)
          .call(yAxis)
          .append("text")
          .attr("class", "axis-label")
          .attr("y", "50%")
          .attr("dx", "-3em")
          .attr("writing-mode", "vertical-rl")
          .text("Stories per day");

        // line = d3.line()
        //   .defined(d => !isNaN(d.value))
        //   .x(d => x(d.date))
        //   .y(d => y(d.count))

    }



}

export { Linechart };