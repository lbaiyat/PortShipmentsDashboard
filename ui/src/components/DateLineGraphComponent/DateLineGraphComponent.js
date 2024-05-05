import { useEffect, useRef } from "react";

import * as d3 from 'd3';

const LineChart = ({ data, width, height }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);

        const xScale = d3
            .scaleLinear()
            .domain([0, data.length - 1])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .nice()
            .range([height, 0]);

        const line = d3
            .line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d.y));

        svg
            .append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        svg
            .append('g')
            .call(d3.axisLeft(yScale));

        svg
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);
    }, [data, width, height]);

    return <svg ref={svgRef} width={width} height={height}/>;
}

function DateLineGraphComponent(props) {
    const data = [
        {
            x: '11:50AM',
            y: 100
        },
        {
            x: '11:55AM',
            y: 125
        }
    ]
    return (
        <div>
            <div style={{border: 'solid 1px black'}}>
                <LineChart data={data} width={'300px'} height={'400px'}/>
                {/*{LineChart data=}*/}
            </div>
        </div>
    )
}

export default DateLineGraphComponent;