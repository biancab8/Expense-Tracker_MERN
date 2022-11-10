import * as React from 'react';

import {TextField, Button, Box} from '@mui/material';
import { Fragment } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import {colors} from '../../assets';
import { ButtonTertiary } from '../ui';

export default function DateFilter(props) {




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

    <LocalizationProvider dateAdapter={AdapterDayjs} >
    <Box sx={{display:"inline-flex", marginRight: "23px", marginBottom: "1px"}}>

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
                      
              label="End Date"
              inputFormat="DD/MM/YYYY"
              onChange={handleEndDateChange}
              value={props.endDate}
              minDate={plusMinus1Day(props.startDate, "+")} //at least 1 day between start and end date
              renderInput={(params) => (
                <TextField sx={{marginRight:1}} variant="standard" size="small" {...params} />
              )}
            />
    </Box>
            <ButtonTertiary handleClick={handleReset} text="RESET"/>
  </LocalizationProvider>

 )
}

{/* <Button onClick={handleReset} sx={{color:colors.textTertiary, whiteSpace:"break-spaces"}}   variant="text">Reset</Button> */}
// color:"#B5B5B5"




