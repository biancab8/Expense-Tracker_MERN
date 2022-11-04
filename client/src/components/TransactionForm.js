import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Cookie from "js-cookie";
import { useSelector, useDispatch } from 'react-redux';

const initialForm = {
  amount: "",
  description: "",
  date: new Date(),
  category_id: "",
};//mongo automatically creates an _id field for each member of an array


export default function TransactionForm(props) {
  // const categories =  useSelector(state => state.authReducer.user.categories);
  // const categories = cats?cats:[{label: "abc"}]
  const token = Cookie.get("token");
  const [form, setForm] = useState(initialForm);

  const [categories, setCategories] = useState([]);
  const categoryOptions = useSelector(state => state.authReducer.user.categories);
// TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// made categories a state variable because: 
// useSelector returns undefined on first render, so will get err msg until refresh page
// -> find better way to do this. If so, also remove the if/else part for categoryOptions from useEffect

  useEffect(() => {
    if (props.editTransaction.amount !== undefined) {
      setForm(props.editTransaction);
    }
    if(categoryOptions){
      setCategories(categoryOptions);
    } else {
      window.location.reload();
    }
  }, [props.editTransaction.amount]); //run whenever this var changes/is updated

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleDateChange(newDate) {
    setForm({ ...form, date: newDate });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let res;
    if (props.editTransaction.amount === undefined) {
      res = await addTransaction();
    } else {
      res = await updateTransaction();
    }
    if (res.ok) {
      setForm(initialForm);
      props.fetchTransactions();
    }
  }

  async function addTransaction() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }

  async function updateTransaction() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transactions/${props.editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
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
        <Box component="form" onSubmit={handleSubmit} sx={{display: "flex"}}>
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

            <Autocomplete
              value={form.category_id} //
              onChange={(event, newValue) => {
                setForm({ ...form, category_id: newValue._id }); //mongo automatically creates an _id field for each member of an array
              }}
              id="controllable-states-demo"
              options={categories}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 200, marginRight: 5 }}
              // defaultValue={[]}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Category" />
              )}
            />

          </LocalizationProvider>
          {props.editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              Edit
            </Button>
          )}
          {props.editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
