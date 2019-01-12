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

export default function LinesChart(props) {
  let data = [];

  props.points.points.forEach(point => {
    data.push({
      x: point.x,
      y: point.y
    });
  });

  return (
    <React.Fragment>
      <LineChart
        width={760}
        height={500}
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="number" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
    </React.Fragment>
  );
}
