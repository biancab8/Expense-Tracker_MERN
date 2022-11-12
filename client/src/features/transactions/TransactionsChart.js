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
  // function numToMonth(num) {
  //   const date = new Date();
  //   date.setMonth(num - 1);
  //   return date.toLocaleString("en-US", { month: "long" });
  // }
  //create data for chart: add monthYear key for each month with value string "month year"
  // let newData = [];
  // forEach((monthData) => {
  //   const monthYear = `${numToMonth(monthData._id.month)} ${monthData._id.year}`;

  // })
  // console.log(props.data)
  // props.data.map((monthData) => {
  //   monthData.monthYear = `${numToMonth(monthData._id.month)} ${
  //     monthData._id.year
  //   }`;
  //   return monthData;
  // });

  return (
    <Paper sx={{marginTop: "70px"}}>
      <Chart data={props.data}>
        <Title text="Monthly Expenses ($)" />
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries color={colors.barColor} valueField="totalExpenses" argumentField="_id" />
        <Animation />
        {/* hover gives amount: */}
        <EventTracker />
        <Tooltip location="edge"
        />
      </Chart>
    </Paper>
  );
}

// in strict mode, get error: 'Maximum Depth Exceeded' when using <ArgumentScale>,  <ValueAxis> and <Animation>
// as per devexpress support: 
// it's because in strict mode React hooks run twice to identify unexpected results. 
// This might cause the chart to infinitely receive some new data
// https://supportcenter.devexpress.com/ticket/details/t1123254/reactive-chart-the-maximum-update-depth-exceeded-error-occurs-in-react-18