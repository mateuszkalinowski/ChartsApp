import React from "react";

import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
    LineChart,
    BarChart,
    Bar,
    ReferenceLine
} from "recharts";

export default function HorizontalBarChart(props) {

    let data = [];

    props.points.points.forEach(point => {
        data.push({
            name: point.name,
            value: point.value
        });
    });

    return (
        <React.Fragment>
            <BarChart
                width={760}
                height={500}
                data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                barSize={20}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name" label={{value: props.nameLabel, position: 'insideBottom', offset: 0}}/>
                <YAxis label={{ value: props.valueLabel, angle: -90, position: 'insideLeft' }}/>
                <Tooltip/>
                <Legend align="right" verticalAlign="middle"/>
                <ReferenceLine y={0} stroke='#000'/>
                <Bar dataKey="value" name="Dane" fill={props.color}/>
            </BarChart>
        </React.Fragment>
    );
}
