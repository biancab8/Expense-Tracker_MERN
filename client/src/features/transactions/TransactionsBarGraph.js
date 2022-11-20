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
} from "@devexpress/dx-react-chart-material-ui";
import {colors} from "../../assets";
import {Paper, Typography} from "@mui/material";
import * as React from "react";

export default function TransactionsBarGraph(props) {
  return (
    <>
    <Typography variant="h6" sx={{marginTop: "70px", marginBottom: 2}}>
        Transactions by Month:
        </Typography>
    <Paper sx={{paddingTop: "15px"}}>
      <Chart data={props.data}>
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
    </>
  );
}
