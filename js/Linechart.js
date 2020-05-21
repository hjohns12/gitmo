class Linechart {
    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.5;
        this.margins = { top: 0, bottom: 50, left: 50, right: 20 };
        let xScale;
        let yScale;
        let xAxis;
        let yAxis;
        let svg;
        const parseTime = d3.timeParse("%m/%d/%y")

        svg = d3
          .select("#linechart")
          .append("svg")
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
        yAxis = d3.axisLeft(yScale).ticks(3);

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

        const line = d3
          .line()
          .x(d => xScale(d.date))
          .y(d => yScale(d.count))
        
        svg.append("path")
          .datum(state.lineData)
          .attr("fill", "none")
          .attr("stroke", "black")
          .attr("stroke-width", .5)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line);

        const annotations = [
          {
            note: { label: "Detainees transferred in exchange for release of Bowe Bergdahl",
                    title: "6/2/14",
                    wrap: 130 //custom text wrapping
                  },
            type: d3.annotationCalloutElbow, 
            x: xScale(parseTime("6/2/14")),
            y: yScale(80),
            dy: 37,
            dx: -100,
          },
            {
              note: { label: "Obama sends Congress plan to close Guantánamo Bay",
                      title: "2/23/16",
                      wrap: 250 //custom text wrapping
                    },
              type: d3.annotationCalloutElbow, 
              x: xScale(parseTime("2/23/16")),
              y: yScale(121),
              dx: -100,
              dy: 0
            },
            {
              note: { label: "Trump pledges to send New York truck attacker to Guantánamo Bay",
                      title: "11/2/17",
                      wrap: 125 //custom text wrapping
                    },
              type: d3.annotationCalloutElbow, 
              x: xScale(parseTime("11/2/17")),
              y: yScale(69),
              dy: 37,
              dx: 42,
            }
          ]
          const makeAnnotations = d3.annotation()
            .annotations(annotations)
          
          svg
            .append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations)
    }



}

export { Linechart };