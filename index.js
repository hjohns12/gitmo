import { Barchart } from "../js/Barchart.js";
 
let barchart;

// global state
let state = {
    data: [],
    series: [],
    selectedSource: null,
    filteredSeries: []
};

d3.csv("./data/media_occurences_wide.csv", d3.autoType)
  .then(data => {
    state.data = data;
    const series = d3.stack()
      .keys(data.columns.slice(1))(data)
      .map(d => (d.forEach(v => v.key = d.key), d))
    state.series = series
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
  