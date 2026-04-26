import React, { useEffect, useState } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";

function TimelineChart({ productId }) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `http://localhost:5000/stock-history/${productId}`
      );
      const data = await res.json();

      let total = 0;

      const timeline = data.map(item => {
        total += item.change;
        return {
          date: new Date(item.date).toLocaleString(),
          stock: total
        };
      });

      setPoints(timeline);
    }

    if (productId) load();
  }, [productId]);

  return (
        <div className="timeline-container">
    <h3 className="chart-title">Stock Timeline</h3>

    {points.length === 0 ? (
      <p>No data</p>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={points}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="stock"
            stroke="#178221"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>
    )}
  </div>
  );
}

export default TimelineChart;
