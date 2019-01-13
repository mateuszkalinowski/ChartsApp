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
  LineChart
} from "recharts";

export default function PointsChart(props) {

  return (
    <React.Fragment>
      <ScatterChart
        width={760}
        height={500}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="x" name="x" label={{value: props.xLabel, position: 'insideBottom', offset: 0}}/>
        <YAxis type="number" dataKey="y" name="y" label={{ value: props.yLabel, angle: -90, position: 'insideLeft' }} />

        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend align="right" verticalAlign="middle"/>
        <Scatter name="Dane" data={props.points.points} fill={props.color} />
      </ScatterChart>
    </React.Fragment>
  );
}
