//date input fields for start and end date and reset button
import * as React from "react";

import { TextField, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { ButtonTertiary } from "../ui";
import { useState } from "react";

export default function DateFilter(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null); 
  const [disabled, setDisabled] = useState(true);

  function handleStartDateChange(newDate) {
    setStartDate(newDate);
    if (endDate) {
      setDisabled(false);
      props.setFilter({...props.filter, startDate: newDate, endDate: endDate});
    } 
  }

  function handleEndDateChange(newDate) {
    setEndDate(newDate);
    setDisabled(false);
    if (startDate) {
      props.setFilter({...props.filter, startDate: startDate, endDate: newDate});
    } 
  }

  function plusMinus1Day(date, operator) {
    //takes a date, adds or subtracts 1 day, and returns the new date
    //-> use to add 1 day to end date 
    if (!date) {
      return null;
    }
    let newDate = new Date(date);
    if (operator === "+") {
      return newDate.setDate(new Date(date).getDate() + 1);
    } else { 
      return newDate.setDate(new Date(date).getDate() - 1);
    }
  }

  function handleReset() {
    //reset input form
    setStartDate(null);
    setEndDate(null);
    setDisabled(true);
    props.setFilter({...props.filter, startDate: null, endDate: null});
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        sx={{
          display: "inline-flex",
          marginRight: "23px",
          marginBottom: "1px",
        }}
      >
        <DesktopDatePicker
          label="Start Date"
          inputFormat="DD/MM/YYYY"
          onChange={handleStartDateChange}
          value={startDate}
          maxDate={plusMinus1Day(endDate, "-")} //at least 1 day between start and end date
          renderInput={(params) => (
            <TextField
              variant="standard"
              sx={{ marginRight: 2 }}
              size="small"
              {...params}
            />
          )}
        />
        <DesktopDatePicker
          label="End Date"
          inputFormat="DD/MM/YYYY"
          onChange={handleEndDateChange}
          value={endDate}
          minDate={plusMinus1Day(startDate, "+")} //at least 1 day between start and end date
          renderInput={(params) => (
            <TextField
              sx={{ marginRight: 1 }}
              variant="standard"
              size="small"
              {...params}
            />
          )}
        />
      </Box>
      <ButtonTertiary handleClick={handleReset} disabled={disabled} text="RESET" />
    </LocalizationProvider>
  );
}
