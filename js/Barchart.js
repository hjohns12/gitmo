class Barchart {
    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.4;
        this.margins = { top: 0, bottom: 50, left: 20, right: 20 };

        this.svg = d3
          .select("#barchart")
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height);

    }

    draw(state, setGlobalState) {
        
    }

}

export { Barchart };