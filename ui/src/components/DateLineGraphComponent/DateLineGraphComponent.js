import { useEffect, useRef } from "react";
import './DateLineGraphComponent.css'

import * as d3 from 'd3';
import {currencyFormat, numberFormat} from "../../utils/Helper";

const LineChart = ({ data, width, height, valueFormatter }) => {
    const svgRef = useRef();
    const tooltipRef = useRef();
    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);

        const xScale = d3
            .scaleLinear()
            .domain([0, data.length - 1])
            .nice()
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .nice()
            .range([height, 150]);

        const line = d3
            .line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d.y));

        svg
            .append('g')
            .call(d3.axisBottom(xScale)
                .tickFormat((d, i) => data[i].x)
                .tickPadding(12)
                .ticks(data.length+ 2)
            )
            .selectAll('text')
            // .attr('dy', '0.35em') // Adjust label position
            .style('fill', 'black') // Set label color
            .style('font-size', '14px'); // Set label font size



        // svg
        //     .append('g')
        //     .call(d3.axisLeft(yScale)
        //         .tickFormat((d, i) => data[i].y)
        //         .tickPadding(12)
        //         .ticks(10)
        //     )
        //     .selectAll('text')
        //     .attr('dy', '0.35em') // Adjust label position
        //     .style('fill', 'black') // Set label color
        //     .style('font-size', '20px'); // Set label font size);

        svg
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'lightsteelblue')
            .attr('stroke-width', 4)
            .attr('d', line);


        svg.selectAll('visibleCircle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => xScale(i))
            .attr('cy', d => yScale(d.y))
            .attr('r', 7)
            .attr('fill', 'lightsteelblue');
        
        svg.selectAll('tooltipCircle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => xScale(i)) // Use xScale to position circles
            .attr('cy', d => yScale(d.y))
            .attr('r', 18)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseover', (event, d) => {
                const tooltip = d3.select(tooltipRef.current);
                tooltip.transition()
                    .duration(20)
                    .style('opacity', 1);
                tooltip.html(`${valueFormatter(d.y)}`)
                    .style('font-size', "24px")
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY + 50) + 'px');
            })
            .on('mouseout', () => {
                d3.select(tooltipRef.current).transition()
                    .duration(20)
                    .style('opacity', 0);
            });

        // const tooltip = d3.select(svgRef.current)
        //     .append("div")
        //     .style("position", "absolute")
        //     .style("text-align", "center")
        //     .style("width", "120px")
        //     .style("height", "28px")
        //     .style("padding", "2px")
        //     .style("font", "12px sans-serif")
        //     .style("background", "lightsteelblue")
        //     .style("border", "0px")
        //     .style("border-radius", "8px")
        //     .style("pointer-events", "none")
        //     .style("opacity", 0);

        // Circles for tooltip
        // svg.selectAll("dot")
        //     .data(data)
        //     .enter().append("circle")
        //     .attr("r", 5)
        //     .attr("cx", function(d) { return (d.x); })
        //     .attr("cy", function(d) { return (d.y); })
        //     .attr("fill", "white")
        //     .attr("stroke", "steelblue")
        //     .on("mouseover", function(event, d) {
        //         tooltip.transition()
        //             .duration(200)
        //             .style("opacity", .9);
        //         tooltip.html(`X: ${d.x}<br/>Y: ${d.y}`)
        //             .style("left", (event.pageX) + "px")
        //             .style("top", (event.pageY) + "px");
        //     })
        //     .on("mouseout", function() {
        //         tooltip.transition()
        //             .duration(500)
        //             .style("opacity", 0);
        //     });
        
    }, [data, width, height]);
    
    
    return (
        <>
            <svg ref={svgRef} width={width} height={height}>
            </svg>
            <div ref={tooltipRef} className="tooltip">
            </div>
        </>
    )


}

function DateLineGraphComponent(props) {

    return (
        <>
            <div style={{'padding-top': '1em', width: 'fit-content'}}>
                <LineChart data={props.data} width={1800}
                           height={300} valueFormatter={props.valueFormatter ? props.valueFormatter: numberFormat}
                />
                {/*{LineChart data=}*/}
            </div>
        </>

    )
}

export default DateLineGraphComponent;