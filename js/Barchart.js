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

      // set up drop-down 
      this.selectElement = d3.select("#dropdown").on("change", function() {
        console.log("new selected source is", this.value);
        setGlobalState({selectedSource: this.value})
      });
    
      // add in dropdown options from the unique values in the data
      this.selectElement
        .selectAll("option")
        .data([
          ...Array.from(new Set(state.series.map(d => d.key))),
          "Select a source",
        ])
        .join("option")
        .attr("value", d => d)
        .text(d => d);

      this.selectElement.property("value", "Select a source");
    }

    draw(state, setGlobalState) {
        this.container
          .selectAll("g.child")
          .data(state.series)
          .join("g")
          .selectAll("rect")
          .data(d => d)
          .join("rect")
          .attr("x", (d, i) => this.xScale(d.data.year))
          .attr("y", d => this.yScale(d[1]))
          .attr("height", d => this.yScale(d[0]) - this.yScale(d[1]))
          .attr("width", this.xScale.bandwidth())
          .attr("fill", d => this.color(d.key))
          .append("title")
          .text(d => `${d.key}, ${d.data.year} `);





    }

}

export { Barchart };