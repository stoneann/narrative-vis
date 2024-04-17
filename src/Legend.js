import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend';

export function Legend({title, minNumPosts, maxNumPosts, numPostsIncrement, colors}) {
  const svgRef = useRef(null);
  const colorScale = d3.scaleOrdinal().domain(d3.range(minNumPosts, maxNumPosts, numPostsIncrement)).range(colors);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    
    // Create a legend
    const legend = legendColor()
      .scale(colorScale)
      .title(title)
      .shapeWidth(30) // Adjust as needed
      .shapeHeight(10) // Adjust as needed
      .orient('horizontal');

    // Render the legend
    svg.append('g')
      .attr('transform', 'translate(20,20)')
      .call(legend);
  }, []);

  return <svg ref={svgRef}  />;
};