import { Barchart } from "../js/Barchart.js";
 
let barchart;

// global state
let state = {
    data: [],
    domain: [],
    series: []
};

d3.csv("./data/media_occurences_wide.csv", function(d) {
    return {
        year: new Date(+d.year, 0, 1),
        LATimes: +d["LA Times"],
        Reuters: +d['Reuters'],
        NYT: +d["New York Times"],
        CNN: +d["CNN"],
        WaPo: +d["Washington Post"],
        Fox: +d["FOX News"],
        MSNBC: +d["MSNBC"],
        total: +d['total']
    };
    })
    .then(data => {
      console.log("data", data)
      state.data = data;
        // state.domain = [
        //     0,
        //     // need to add maximum y-axis value here
        //     state.data.forEach(year => )
        // ]
      const series = d3.stack()
        .keys(data.columns.slice(2))(data)
        .map(d => (d.forEach(v => v.key = d.key), d))
      state.series = series
      console.log("series", series)
      init();
    })

function init() {
  barchart = new Barchart(state, setGlobalState);
  draw();
}

function draw() {
    barchart.draw(state, setGlobalState);
  }

// UTILITY FUNCTION: 
// state-updating function
function setGlobalState(nextState) {
    state = { ...state, ...nextState };
    console.log("new state:", state);
    draw();
  }
  