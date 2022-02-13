import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Rechart({ data }) {
  const lines = getLineKeys(data);

  function newLine(name, key) {
    return (
      <Line
        dataKey={name}
        stroke="#8884d8"
        strokeWidth="2"
        dot={{
          fill: "#FFFFFF",
          stroke: "#8884d8",
          strokeWidth: 2,
          r: 3.2,
        }}
        activeDot={{
          fill: "#2e4355",
          stroke: "#8884d8",
          strokeWidth: 5,
          r: 5,
        }}
        isAnimationActive={false}
        key={key}
      />
    );
  }

  return (
    <div>
      <ResponsiveContainer aspect={4.5}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <Legend
            align="left"
            verticalAlign="top"
            height={50}
            iconType={"circle"}
            iconSize={10}
            wrapperStyle={{
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "11px",
              lineHeight: "13px",
            }}
          />
          <CartesianGrid horizontal="" vertical="" stroke="#243240" />
          <XAxis
            dataKey="name"
            tick={{
              fill: "#485465",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: 10,
            }}
            padding={{ left: 35, right: 35 }}
            tickLine={false}
          />
          <YAxis
            tick={{
              fill: "#485465",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: 10,
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={0}
            width={35}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            cursor={false}
          />
          {lines.map((name, index) => {
            const key = `rechart_line_${name}_${index}`;
            return newLine(name, key);
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Rechart;

const getLineKeys = (data) => {
  const lines = [];
  data.map(({ name, ...plotData }) => {
    const entries = Object.keys(plotData);
    entries.map((key) => {
      !lines.includes(key) && lines.push(key);
    });
  });

  return lines;
};
