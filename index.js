import { Barchart } from "../js/Barchart.js";
import { Linechart } from "../js/Linechart.js";
 
let barchart;
let linechart;
const parser = d3.timeParse("%m/%d/%y");


// global state
let state = {
    data: [],
    series: [],
    selectedSource: "All",
    lineData: []
};

//read in data (by year+news source)
d3.csv("../data/media_occurences_wide.csv", d3.autoType)
  .then(data => {
    state.data = data;
    const series = d3.stack()
      .keys(data.columns.slice(1))(data)
      .map(d => (d.forEach(v => v.key = d.key), d))
    state.series = series
    })
// read in data (by day)
d3.csv("../data/media_by_date.csv", d => ({
  year: parser(d.date),
  count: +d.count,
})).then(raw_data => {
  state.lineData = raw_data;
  init();
});

function init() {
  barchart = new Barchart(state, setGlobalState);
  linechart = new Linechart(state, setGlobalState);
  draw();
}

function draw() {
    barchart.draw(state, setGlobalState);
  }

// state-updating function
function setGlobalState(nextState) {
    state = { ...state, ...nextState };
    console.log("new state:", state);
    draw();
  }
  