import { Barchart } from "./js/Barchart.js";
import { Slider } from "./js/Slider.js"
// import { Linechart } from "./js/Linechart.js";
 
let barchart;
// let linechart;
let slider;
const parser = d3.timeParse("%m/%d/%y");


// global state
let state = {
    data: [],
    series: [],
    selectedSource: "All",
    lineData: [],
    historicalData: [],
    selPop: null,
};

//read in all data
Promise.all([
  d3.csv("./data/media_occurences_wide.csv", d3.autoType),
  d3.csv("./data/media_by_date.csv", d => ({
    date: parser(d.date),
    count: +d.count })),
  d3.csv("./data/history.csv", d => ({
      year: +d.year,
      value: +d.nDetained })),
]).then(data => {
  state.data = data[0];
  const series = d3.stack()
    .keys(data[0].columns.slice(1))(data[0])
    .map(d => (d.forEach(v => v.key = d.key), d))
  state.series = series;
  state.lineData = data[1];
  state.historicalData = data[2];
  init();
})

function init() {
  barchart = new Barchart(state, setGlobalState);
  // linechart = new Linechart(state, setGlobalState);
  slider = new Slider(state, setGlobalState);
  draw();
}

function draw() {
    barchart.draw(state, setGlobalState);
    slider.draw(state, setGlobalState);
  }

// state-updating function
function setGlobalState(nextState) {
    state = { ...state, ...nextState };
    console.log("new state:", state);
    draw();
  }
  