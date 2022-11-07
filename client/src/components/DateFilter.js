import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';

export default function BasicDatePicker(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


function handleStartDateChange(newDate){
    setStartDate(newDate);
  
}

function handleEndDateChange(newDate){
    setEndDate(newDate);
  
}



  return (
    // prevent invalid date entries by setting min and max dates
    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              onChange={handleStartDateChange}
              value={startDate}
              maxDate={endDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
                        <DesktopDatePicker
              label="End Date"
              inputFormat="DD/MM/YYYY"
              onChange={handleEndDateChange}
              value={endDate}
              minDate={startDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
  </LocalizationProvider>
  )
}




