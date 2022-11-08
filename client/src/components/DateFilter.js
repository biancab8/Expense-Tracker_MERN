import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function BasicDatePicker(props) {




function handleStartDateChange(newDate){
  props.setStartDate(newDate);
    if(props.endDate){
        props.filterTransactions(newDate, props.endDate);
    }
  
}

function handleEndDateChange(newDate){
  props.setEndDate(newDate);
    if(props.startDate){
        props.filterTransactions(props.startDate, newDate);
    }
  
  
}

function plusMinus1Day(date, operator){
    //takes a date, adds or subtracts 1 day, and returns the new date
    if(!date){
        return null; 
    }
    let newDate = new Date(date);
    if(operator === "+"){
        return newDate.setDate(new Date(date).getDate() + 1);
    } else{
        return newDate.setDate(new Date(date).getDate() - 1)
    }
}

    function handleReset(){
        props.setStartDate(null);
        props.setEndDate(null);
        props.filterTransactions(null, null, props.categoryFilter);
    }
  return (
    // prevent invalid date entries by setting min and max dates
    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              onChange={handleStartDateChange}
              value={props.startDate}
              maxDate={plusMinus1Day(props.endDate, "-")}
              renderInput={(params) => (
                <TextField variant="standard" sx={{ marginRight: 2 }} size="small" {...params} />
              )}
            />
                        <DesktopDatePicker
              label="End Date (excluded)"
              inputFormat="DD/MM/YYYY"
              onChange={handleEndDateChange}
              value={props.endDate}
              minDate={plusMinus1Day(props.startDate, "+")} //at least 1 day between start and end date
              renderInput={(params) => (
                <TextField sx={{marginRight:1}} variant="standard" size="small" {...params} />
              )}
            />
                   <Button onClick={handleReset} size="small" sx={{whiteSpace:"break-spaces", maxWidth:"10px", color:"#B5B5B5"}}>Reset Dates</Button>
  </LocalizationProvider>
  )
}



