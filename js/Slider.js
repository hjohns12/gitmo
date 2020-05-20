class Slider {
    constructor(state, setGlobalState) {

    this.width = 1000;
    this.height = 220;
    this.margin = { top: 20, right: 50, bottom: 50, left: 40 };

    // const dataSlider = state.historicalData;
    // console.log("data Other", dataSlider);
    
    this.svg = d3
      .select('div#my-slider')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    const padding = 0.1;
    
    // change this to year
    const xBand = d3
      .scaleBand()
      .domain(state.historicalData.map(d => d.year))
      .range([this.margin.left, this.width - this.margin.right])
      .padding(padding);

    this.xLinear = d3
      .scaleLinear()
      .domain([
          d3.min(state.historicalData, d => d.year),
          d3.max(state.historicalData, d => d.year),
      ])
      .range([
        this.margin.left + xBand.bandwidth() / 2 + xBand.step() * padding - 0.5,
        this.width - this.margin.right - xBand.bandwidth() / 2 - xBand.step() * padding - 0.5,
      ]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(state.historicalData, d => d.value)])
      .nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    const yAxis = g => g
      .attr('transform', `translate(${this.width - this.margin.right},0)`)
      .call(d3
            .axisRight(y)
            .ticks(4))  
      .call(g => g.select('.domain').remove());

    // this.slider = g =>
    //   g.attr('transform', `translate(0,${height - margin.bottom})`).call(
    //     d3
    //     .sliderBottom(xLinear)
    //     // .tickFormat(d3.timeFormat('%Y'))
    //     .step(1)
    //     .default(2010)
    //     .on('onchange', value => value)
    // );

    this.bars = this.svg
      .append('g')
      .selectAll('rect')
      .data(state.historicalData);

    this.barsEnter = this.bars
      .enter()
      .append('rect')
      .attr('x', d => xBand(d.year))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', xBand.bandwidth());

    this.svg.append('g').call(yAxis);
    
    // const draw = selected => {
    //   barsEnter
    //     .merge(bars)
    //     .attr('fill', d => (d.year === selected ? '#bad80a' : '#e0e0e0'));
  
    //   d3.select('p#value-slider').text(
    //     d3.format('$,.2r')(dataSlider[selected - 1].value)
    //   );
    // };
  
  
    //   draw(2010);
  
    this.slider = g =>
    g.attr('transform', `translate(0,${this.height - this.margin.bottom})`).call(
      d3
      .sliderBottom(this.xLinear)
      // .tickFormat(d3.timeFormat('%Y'))
      .step(1)
      .default(2010)
      // .on('onchange', value => setGlobalState({selPop: value}))
    );

    this.svg.append('g').call(this.slider);
  
  } 

    draw(state, setGlobalState) {


      d3.selectAll('parameter-value')
        .on('change', value => setGlobalState({selPop: value}))




      // this.barsEnter
      //   .merge(this.bars)
      //   .attr('fill', d => (d.year === this.selected ? '#bad80a' : '#e0e0e0')); // not working


    }






}

export { Slider };
