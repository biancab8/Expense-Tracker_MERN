import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  PieSeries,
  Tooltip,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  ArgumentScale,
  EventTracker,
} from "@devexpress/dx-react-chart";
import { scaleBand } from "@devexpress/dx-chart-core";
import { Typography } from "@mui/material";
import { colors } from "../../assets";

export default function TransactionsPieChart(props) {
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 3, marginTop: "80px" }}>
        Transactions by Category:
      </Typography>
      <Paper>
        <Chart
          data={props.data}
          sx={{
            "#center-axis-container": { background: colors.chartBackground },
          }}
        >
          <PieSeries valueField="totalExpenses" argumentField="name" />
          <ArgumentScale factory={scaleBand} />
          <Legend />
          <Animation />
          {/* hover gives amount: */}
          <EventTracker />
          <Tooltip location="edge" />
        </Chart>
      </Paper>
    </>
  );
}
