import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';



const MultiLineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
      .domain(data[0].values.map(d => `S${d.x}`))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, 10])
      .range([innerHeight, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const line = d3.line()
      .x(d => xScale(`S${d.x}`))
      .y(d => yScale(d.y));

    data.forEach(series => {
      g.append('path')
        .attr('class', 'line')
        .attr('d', line(series.values))
        .style('stroke', series.color)
        .style('fill', 'none');
        

      g.selectAll('.dot')
        .data(series.values)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(`S${d.x}`))
        .attr('cy', d => yScale(d.y))
        .attr('r', 5)
        .style('fill', series.color);
    });

    const yAxis = d3.axisLeft(yScale)
      .ticks(10)
      .tickSize(-innerWidth)
      .tickFormat(d3.format('.0f'));

      g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('fill', 'white');
    
    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', 'white');
    
    // Make all horizontal lines gray
    g.selectAll('line')
      .attr('stroke', 'gray');

    // Make y-axis path white
    g.selectAll('.y-axis path')
      .attr('stroke', 'white');  

    // Make x-axis path white
    g.selectAll('.x-axis path')
      .attr('stroke', 'white');

  }, [data]);

  return (
    <svg width={400} height={250} ref={svgRef}></svg>
  );
};

export default MultiLineChart;
