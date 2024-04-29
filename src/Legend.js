import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend';
import './Legend.css';

export function Legend({title, colorScale}) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    
    // Create a legend
    const legend = legendColor()
      .scale(colorScale)
      .title(title)
      .titleWidth(80)
      .shapeWidth(10) // Adjust as needed
      .shapeHeight(20) // Adjust as needed
      .orient('vertical');

    // Render the legend
    svg.append('g')
      .attr('transform', 'translate(20,20)')
      .call(legend);
  }, []);

  return <svg ref={svgRef} className='height-250'  />;
};