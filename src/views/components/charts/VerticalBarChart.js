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

export default function VerticalBarChart(props) {

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
                layout="vertical"
                barSize={20}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number" label={{ value: props.valueLabel, position: 'insideBottom', offset: 0}}/>
                <YAxis dataKey="name" type="category" label={{value: props.nameLabel, angle: -90, position: 'insideLeft'}}/>
                <Tooltip/>
                <Legend align="right" verticalAlign="middle"/>
                <ReferenceLine y={0} stroke='#000'/>
                <Bar dataKey="value" name="Dane" fill={props.color}/>
            </BarChart>
        </React.Fragment>
    );
}
