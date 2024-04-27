import * as d3 from "d3"; // we will need d3.js
import { useEffect, useRef } from "react";
import './NetworkGraph.css';

export const RADIUS = 4;

export const drawNetwork = (
    context,
    width,
    height,
    nodes,
    links
    ) => {
    context.clearRect(0, 0, width, height);

    // Draw the links first
    links.forEach((link) => {
        context.beginPath();
        context.moveTo(link.source.x, link.source.y);
        context.lineTo(link.target.x, link.target.y);
        context.stroke();
    });

    // Draw the nodes
    nodes.forEach((node) => {
        if (!node.x || !node.y) {
            return;
        }

        context.beginPath();
        context.moveTo(node.x + RADIUS, node.y);
        context.arc(node.x, node.y, RADIUS, 0, 2 * Math.PI);
        context.fillStyle = '#4292c6';
        context.fill();
    });
};

export const NetworkDiagram = ({
    width,
    height,
    data
    }) => {
    // The force simulation mutates links and nodes, so create a copy first
    // Node positions are initialized by d3
    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const canvasRef = useRef(null);

    useEffect(() => {
        // set dimension of the canvas element
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!context) {
            return;
        }

        // run d3-force to find the position of nodes on the canvas
        d3.forceSimulation(nodes)

        // list of forces we apply to get node positions
        .force(
            'link',
            d3.forceLink(links).id((d) => d.id)
        )
        .force('collide', d3.forceCollide().radius(RADIUS + 10).iterations(10))
        .force('charge', d3.forceManyBody().strength(0.01))
        .force('center', d3.forceCenter(width / 2, height / 2))

        // at each iteration of the simulation, draw the network diagram with the new node positions
        .on('tick', () => {
            drawNetwork(context, width, height, nodes, links);
        });
    }, [width, height, nodes, links]);

    return (
        <div className="network-graph">
        <canvas
            ref={canvasRef}
            style={{
                width,
                height,
            }}
            width={width}
            height={height}
        />
        </div>
    );
};