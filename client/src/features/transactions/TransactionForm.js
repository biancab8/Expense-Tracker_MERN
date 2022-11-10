import * as React from "react";

import { useState, useEffect } from "react";
import {Card, CardContent, Button, Autocomplete, Box, Typography, TextField, InputAdornment} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
import { ButtonPrimary, ButtonSecondary } from "../ui";

const initialForm = {
  amount: "",
  description: "",
  date: new Date(),
  category_id: "",
}; //mongo automatically creates an _id field for each member of an array

export default function TransactionForm(props) {
  let categories = useSelector((state) => state.authReducer.user.categories);
  const token = Cookie.get("token");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (props.editTransaction.amount !== undefined) {
      setForm(props.editTransaction);
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
      props.setEditTransaction({});
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

  function getCategoryNameById() {
    return (
      categories.find((category) => category._id === form.category_id) ?? ""
    );
    //categories is DB array with name + ids
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        marginTop: 10,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{marginBottom: 2}}>
          {props.editTransaction.amount ? "Edit " : "Add New"} Transaction
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-start-adornment"
            label="Amount"
            variant="outlined"
            value={form.amount}
            name="amount"
            type="number"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Description"
            inputProps={{ maxLength: 35 }}
            variant="outlined"
            value={form.description}
            name="description"
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="DD/MM/YYYY"
              //   value={value}
              onChange={handleDateChange}
              value={form.date}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />

            <Autocomplete
              value={getCategoryNameById()}
              onChange={(event, newValue) => {
                setForm({ ...form, category_id: newValue._id }); //mongo automatically creates an _id field for each member of an array
              }}
              id="categories-dropdown"
              options={categories}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 200, marginRight: 5 }}
              // renderOption: Autocomplete uses the category label as a key. If user enters 2 categories with same name, will give error due to identical keys. Using option._id which refers to category._id overwrites the key and makes it unique no matter what
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option._id}>
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Category" required />
              )}
            />
          </LocalizationProvider>
          {props.editTransaction.amount !== undefined && (
            <ButtonSecondary text="Edit"></ButtonSecondary>
          )}
          {props.editTransaction.amount === undefined && (
            <ButtonPrimary text="Submit"></ButtonPrimary>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

