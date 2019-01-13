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
    ReferenceLine,
    Pie,
    PieChart
} from "recharts";

export default function CircleChart(props) {

    let data = [];

    props.points.points.forEach(point => {
        data.push({
            name: point.name,
            value: Number(point.value)
        });
    });

    return (
        <React.Fragment>
            <PieChart width={760} height={500}>
                <Pie isAnimationActive={true} data={data} cx={370} cy={250} outerRadius={200} fill={props.color} dataKey="value" label={renderCustomizedLabel}/>
            </PieChart>

        </React.Fragment>
    );
}


const renderCustomizedLabel = (data) => {
    console.log(data);
    return data.name + ": " + data.value;
};