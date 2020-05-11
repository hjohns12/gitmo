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
  