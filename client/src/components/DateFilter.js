import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function BasicDatePicker(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


function handleStartDateChange(newDate){
    setStartDate(newDate);
    if(endDate){
        props.filterTransactions(newDate, endDate);
    }
  
}

function handleEndDateChange(newDate){
    setEndDate(newDate);
    if(startDate){
        props.filterTransactions(startDate, newDate);
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
        setStartDate(null);
        setEndDate(null);
        props.filterTransactions(null, null);
    }
  return (
    // prevent invalid date entries by setting min and max dates
    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              onChange={handleStartDateChange}
              value={startDate}
              maxDate={plusMinus1Day(endDate, "-")}
              renderInput={(params) => (
                <TextField variant="standard" sx={{ marginRight: 2 }} size="small" {...params} />
              )}
            />
                        <DesktopDatePicker
              label="End Date (excluded)"
              inputFormat="DD/MM/YYYY"
              onChange={handleEndDateChange}
              value={endDate}
              minDate={plusMinus1Day(startDate, "+")} //at least 1 day between start and end date
              renderInput={(params) => (
                <TextField sx={{marginRight:1}} variant="standard" size="small" {...params} />
              )}
            />
                   <Button onClick={handleReset} size="small" sx={{whiteSpace:"break-spaces", maxWidth:"10px", color:"#B5B5B5"}}>Reset Dates</Button>
  </LocalizationProvider>
  )
}




