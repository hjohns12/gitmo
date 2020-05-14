class Barchart {
    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.8;
        this.margins = { top: 0, bottom: 50, left: 40, right: 20 };

        this.svg = d3
          .select("#barchart")
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height);
        
        // this.color = d3.scaleOrdinal()
        //   .domain(state.series.map(d => d.key))
        //   .range(d3.schemeSpectral[state.series.length])
        //   .unknown("#ccc")

        // this.color = d3.scaleSequential(d => d3.interpolateBuPu(d));
        // this.cScale = d3.scaleOrdinal(d3.schemePaired);
        // this.cScale
        //     .domain(state.series.map(d => d.type));

        this.color = d3.scaleOrdinal(d3.schemeSpectral)
            .domain(state.series.map(d => d.key))
            // .range(d3.schemeSpectral[series.length])
            .unknown("#ccc")

        
        this.xScale = d3
          .scaleBand()
          .domain(state.data.map(d => d.year))
          .range([this.margins.left, this.width - this.margins.right])

        this.yScale = d3
          .scaleLinear()
          .domain([0, d3.max(state.series, d => d3.max(d, d => d[1]))])
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
        
      this.container = this.svg.append("g").attr("class", "bars-container")

    }

    draw(state, setGlobalState) {
        this.container
          .selectAll("g.child")
          .data(state.series)
          .join("g")
          .attr("fill", d => this.color(d.key))
          .selectAll("rect")
          .data(d => d)
          .join("rect")
          .attr("x", (d, i) => this.xScale(d.data.year))
          .attr("y", d => this.yScale(d[1]))
          .attr("height", d => this.yScale(d[0]) - this.yScale(d[1]))
          .attr("width", this.xScale.bandwidth())
          .append("title")
        //   .text(d => `${d.data.year} ${d.key} ${formatValue(d.data[d.key])}`);





    }

}

export { Barchart };