import { Barchart } from "../js/Barchart.js";
 
let barchart;

// global state
let state = {
    data: [],
    domain: [],
};

d3.csv("./data/media_occurences.csv", function(d) {
    return {
        year: new Date(+d.year, 0, 1),
        media_name: d.media_name,
        count: +d.count,
    };
    })
    .then(data => {
        state.data = data;
        // state.domain = [
        //     0,
        //     // need to add maximum y-axis value here
        //     state.data.forEach(year => )
        // ]
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
  