import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const initialForm = {
  amount: 0,
  description: "",
  date: new Date(),
};

export default function TransactionForm(props) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    setForm({...form, [event.target.name] : event.target.value});
  }

  function handleDateChange(newDate){
    setForm({...form, date: newDate});
  }

  async function handleSubmit(event) {
    event.preventDefault(); 
    const res = await fetch("http://localhost:4000/transactions", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json"
      }
    }) 
    //if receive response
    //fetch transactions again so that can update rendered page with new ones
    if(res.ok){
      setForm(initialForm);
      props.fetchTransactions();
    }
    
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        marginTop: 10,
      }}
    >
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={form.amount}
            name="amount"
          />
          <TextField
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={form.description}
            name="description"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              //   value={value}
              onChange={handleDateChange}
              value={form.date}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
