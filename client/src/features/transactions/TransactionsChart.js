import { scaleBand } from "@devexpress/dx-chart-core";
import {
  Animation,
  ArgumentScale,
  EventTracker,
} from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Tooltip,
  ValueAxis,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack } from "@devexpress/dx-react-chart";
import { styled } from "@mui/material/styles";
import colors from "../../assets/colors";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import * as React from "react";

const data = [
  { year: "1950", population: 2.525 },
  { year: "1960", population: 3.018 },
  { year: "1970", population: 3.682 },
  { year: "1980", population: 4.44 },
  { year: "1990", population: 5.31 },
  { year: "2000", population: 6.127 },
  { year: "2010", population: 6.93 },
];

export default function TransactionChart(props) {
  function numToMonth(num) {
    const date = new Date();
    date.setMonth(num - 1);
    return date.toLocaleString("en-US", { month: "long" });
  }
  //create data for chart: add monthYear field for each month
  const chartData = props.data.map((monthData) => {
    monthData.monthYear = `${numToMonth(monthData._id.month)} ${
      monthData._id.year
    }`;
    return monthData;
  });


  return (
    <Paper>
      <Chart data={props.data}>
        <Title text="Monthly Expenses ($)" />
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries color={colors.barColor} valueField="totalExpenses" argumentField="monthYear" />

        <Animation />
        {/* hover gives amount */}
        <EventTracker />
        <Tooltip location="edge"
        />
      </Chart>
    </Paper>
  );
}
