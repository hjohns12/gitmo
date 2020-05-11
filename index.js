import { Barchart } from "../Barchart.js";
 
let barchart;

// global state
let state = {
    data: [],
};

d3.csv("./data/guantanamo-all-story-urls-20200503233646.csv", d3.autoType).then(data => {
    state.data = data;
    init();
  })

function init() {
  barchart = new Barchart(state, setGlobalState);
  draw();
}