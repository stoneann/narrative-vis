import * as d3 from "d3"; // we will need d3.js
import { useEffect, useRef, useState } from "react";
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
    data,
    }) => {
    // The force simulation mutates links and nodes, so create a copy first
    // Node positions are initialized by d3
    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    // const [currNodeIndex, setCurrNodeIndex] = useState(-1);
    // const [text, setText] = useState('')

    const canvasRef = useRef(null);
    const tipRef = useRef(null);
    const maxLineWidth = 50;

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

    
    // show tooltip when mouse hovers over dot
    function handleMouseMove(e) {
        const tipCanvas = tipRef.current;
        const tipCtx = tipCanvas?.getContext('2d');

        let elem = document.querySelector("canvas");
        let rect = elem.getBoundingClientRect();
        var offsetX = rect['x'];
        var offsetY = rect['y'];
        var mouseX = parseInt(e.clientX - offsetX);
        var mouseY = parseInt(e.clientY - offsetY);

        var hit = false;
        for (var i = 0; i < nodes.length; i++) {
            var dot = nodes[i]
            if (Math.abs(nodes[i].x - mouseX) < 2*RADIUS && Math.abs(nodes[i].y - mouseY) < 2*RADIUS) {
                // tipCanvas.style.left = (dot.x) + "px";
                // tipCanvas.style.top = (dot.y) + "px";
                tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
                                 tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
                var l = 0;
                var n = 1;
                while (l < maxLineWidth) {
                    // console.log(dot.value.substring(l, Math.min(l + maxLineWidth, dot.value.length)))
                    console.log(l)
                    // console.log(n)
                    tipCtx.fillText(dot.value.substring(l, Math.min(l + maxLineWidth, dot.value.length)), 0, n*10)
                    l = maxLineWidth + l
                    n += 1
                }
                tipCtx.font = '10pt Helvetica';
                hit = true;
                break;
            }
        }
        // if (!hit) {
        //     tipCanvas.style.left = "-200px";
        // }
    }

    return (
        <div className="network-graph">
        <canvas
            onMouseMove={(ev) => handleMouseMove(ev)}
            ref={canvasRef}
            style={{
                width,
                height,
            }}
            width={width}
            height={height}
        />
        <canvas ref={tipRef} width={width} height={50}></canvas>
        </div>
    );
};