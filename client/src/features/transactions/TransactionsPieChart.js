import * as React from "react";
import Paper from "@mui/material/Paper";
import { Chart, PieSeries, ArgumentAxis, AreaSeries, Tooltip, ValueAxis, Title } from "@devexpress/dx-react-chart-material-ui";
import {
    Animation,
    ArgumentScale,
    EventTracker,
  } from "@devexpress/dx-react-chart";
  import { scaleBand } from "@devexpress/dx-chart-core";
  import { Legend } from '@devexpress/dx-react-chart-material-ui';
import { useEffect, useState } from "react";
import { getDatePickerToolbarUtilityClass } from "@mui/x-date-pickers/DatePicker/datePickerToolbarClasses";
import { useSelector } from "react-redux";
import { sliderClasses, Typography } from "@mui/material";


export default function TransactionsPieChart(props) {

    // //   async function getData(){
    // //     const dataSet = await props.getData();
    //     props.data.map((category) => {
    //         category.name = props.categoryNameById(category._id);
    //         return category; 
    //     })
    //     // setData(dataSet);
      

  return (
    <>
    <Typography variant="h6" sx={{marginBottom: 2, marginTop: "80px"}}>
        Transactions by Category:
        </Typography>
    <Paper sx={{marginBottom: "70px"}}>
    {/* {console.log("asdfasdfasdf")}
    {console.log(data)} */}
      <Chart data={props.data}>
        <PieSeries valueField="totalExpenses" argumentField="name"/>
        <ArgumentScale factory={scaleBand} />
        {/* <Title text="by Category ($)" /> */}
          <Legend/>
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

