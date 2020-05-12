class Barchart {
    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.8;
        this.margins = { top: 0, bottom: 50, left: 20, right: 20 };

        this.svg = d3
          .select("#barchart")
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height);
        
        this.xScale = d3
            .scaleTime()
            .domain(d3.extent(state.data, d => d.year))
            .range([this.margins.left, this.width - this.margins.right])

        this.yScale = d3
            .scaleLinear()
            // .domain([0, d3.max(state.data, d => d.count)])
            .domain([0, 2800])
            .range([this.height - this.margins.bottom, this.margins.top]);

        this.xAxis = d3.axisBottom(this.xScale);
        this.yAxis = d3.axisLeft(this.yScale);

          // add the xAxis
        this.svg
            .append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0,${this.height - this.margins.bottom})`)
            .call(this.xAxis)
            .append("text")
            .attr("class", "axis-label")
            .attr("x", "50%")
            .attr("dy", "3em")
            .text("Year");

        // add the yAxis
        this.svg
            .append("g")
            .attr("class", "axis y-axis")
            .attr("transform", `translate(${this.margins.left},0)`)
            .call(this.yAxis)
            .append("text")
            .attr("class", "axis-label")
            .attr("y", "50%")
            .attr("dx", "-3em")
            .attr("writing-mode", "vertical-rl")
            .text("# stories");

    }

    draw(state, setGlobalState) {


    }

}

export { Barchart };