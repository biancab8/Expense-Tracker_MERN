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
} from "@devexpress/dx-react-chart-material-ui";
import {colors} from "../../assets";
import Paper from "@mui/material/Paper";
import * as React from "react";

export default function TransactionChart(props) {
  function numToMonth(num) {
    const date = new Date();
    date.setMonth(num - 1);
    return date.toLocaleString("en-US", { month: "long" });
  }
  //create data for chart: add monthYear field for each month
  props.data.map((monthData) => {
    monthData.monthYear = `${numToMonth(monthData._id.month)} ${
      monthData._id.year
    }`;
    return monthData;
  });


  return (
    <Paper sx={{marginTop: "70px"}}>
      <Chart data={props.data}>
        <Title text="Monthly Expenses ($)" />
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries color={colors.barColor} valueField="totalExpenses" argumentField="monthYear" />
        <Animation />
        {/* hover gives amount: */}
        <EventTracker />
        <Tooltip location="edge"
        />
      </Chart>
    </Paper>
  );
}
