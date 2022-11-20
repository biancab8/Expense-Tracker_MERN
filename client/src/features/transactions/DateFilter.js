import * as React from "react";
import { TextField, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { ButtonTertiary } from "../ui";
import { useState } from "react";
import "../../style/index.css";

export default function DateFilter(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabled, setDisabled] = useState(true);

  function handleStartDateChange(newDate) {
    setStartDate(newDate);
    if (endDate) {
      setDisabled(false);
      props.setFilter({
        ...props.filter,
        startDate: newDate,
        endDate: endDate,
      });
    }
  }

  function handleEndDateChange(newDate) {
    setEndDate(newDate);
    setDisabled(false);
    if (startDate) {
      props.setFilter({
        ...props.filter,
        startDate: startDate,
        endDate: newDate,
      });
    }
  }

  function handleReset() {
    //reset input form
    setStartDate(null);
    setEndDate(null);
    setDisabled(true);
    props.setFilter({ ...props.filter, startDate: null, endDate: null });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        className="dateFilter"
        sx={{
          marginBottom: "1px",
          marginLeft: "0",
        }}
      >
        <DesktopDatePicker
          label="Start Date"
          inputFormat="DD/MM/YYYY"
          onChange={handleStartDateChange}
          value={startDate}
          maxDate={endDate}
          renderInput={(params) => (
            <TextField
              variant="standard"
              sx={{ marginRight: 2, maxWidth: "35%" }}
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
          minDate={startDate}
          renderInput={(params) => (
            <TextField
              sx={{ marginRight: 2, maxWidth: "35%" }}
              variant="standard"
              size="small"
              {...params}
            />
          )}
        />
        <ButtonTertiary
          handleClick={handleReset}
          disabled={disabled}
          text="RESET"
        />
      </Box>
    </LocalizationProvider>
  );
}
