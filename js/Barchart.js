class Barchart {
    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.8;
        this.margins = { top: 0, bottom: 50, left: 40, right: 20 };

        this.svg = d3
          .select("#barchart")
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height)

        this.color = d3.scaleOrdinal()
          .domain(state.series.map(d => d.key))
          // .range(d3.schemeSet3)
          .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928',
                  '#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','lime','#bc80bd'])
          .unknown("#ccc")

        this.xScale = d3
          .scaleBand()
          .domain(state.data.map(d => d.year))
          .range([this.margins.left, this.width - this.margins.right])
          .paddingInner(0.3)

        let yScale = d3
          .scaleLinear()
          .domain([0, d3.max(state.series, d => d3.max(d, d => d[1]))])
          .range([this.height - this.margins.bottom, this.margins.top]);

        this.xAxis = d3.axisBottom(this.xScale);
        let yAxis = d3.axisLeft(yScale);

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
          .text("# stories");

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
        
      this.container = this.svg.append("g").attr("class", "bars-container")

      // set up drop-down and add value to global state 
      this.selectElement = d3.select("#dropdown").on("change", function() {
        console.log("new selected source is", this.value);
        setGlobalState({selectedSource: this.value})
        });
    
      // add in dropdown options from the unique values in the data
      this.selectElement
        .selectAll("option")
        .data([
          ...Array.from(new Set(state.series.map(d => d.key))),
          state.selectedSource,
        ])
        .join("option")
        .attr("value", d => d)
        .text(d => d);

      this.selectElement.property("value", state.selectedSource);
    }

    draw(state, setGlobalState) {
      let filteredData = state.series;
      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(filteredData, d => d3.max(d, d => d[1]))])
        .range([this.height - this.margins.bottom, this.margins.top]);
      if (state.selectedSource !== "All") {
        filteredData = state.series.filter(d => d.key === state.selectedSource);
        yScale.domain([0, d3.max(filteredData, d => d3.max(d, d => d[1] - d[0]))]);
      }
      let yAxis = d3.axisLeft(yScale);
      console.log("yScale domain", yScale.domain()[1])

      // redraw y-axis
      d3.select("g.y-axis")
        .transition()
        .duration(1000)
        .call(yAxis.scale(yScale)); 

      this.container
        .selectAll("g.child")
        .data(filteredData, d => d.key)
        .join(enter => enter
            .append("g")
            .attr("class", d => `child ${d.key}`)
            .call(sel => sel.append("g")
              .selectAll("rect")
              .data(d => d)
              .join("rect")
              .attr("x", d => this.xScale(d.data.year))
              .attr("y", d => yScale(d[1]))
              .attr("height", d => yScale(d[0]) - yScale(d[1]))
              .attr("width", this.xScale.bandwidth())
              .attr("fill", d => this.color(d.key))
              .attr("opacity", .7)
              .append("title")
              .text(d => `${d.key}, ${d.data.year} `)
              ),
            update =>
            update.call(update =>
              update
                .transition()
                .duration(250)
                .selectAll("rect")
                .attr("y", d => yScale(d[1] - d[0]))
                .attr("height", d => this.height - this.margins.bottom - yScale(d[1] - d[0]))
                ),
            exit => exit.remove()
        )
        .call(
          selection =>
            selection
              .transition() // initialize transition
              .duration(200) // duration 1000ms / 1s
              .attr("opacity", 1)
              // .attr("y", d => yScale(d[1] - d[0])) // started from the bottom, now we're here
              // .attr("height", d => this.height - this.margins.bottom - yScale(d[1] - d[0]))
        );
    }

}

export { Barchart };