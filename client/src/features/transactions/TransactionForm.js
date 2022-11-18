import * as React from "react";

import { useState, useEffect } from "react";
import {Card, CardContent, Grid, Autocomplete, Box, Typography, TextField, InputAdornment} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useSelector } from "react-redux";
import { ButtonPrimary, ButtonSecondary } from "../ui";
import { transactionsAPI } from "../../api";
import { CategoryIcon } from "../categories";
import { cutOffSmall } from "../../assets/constants";
import "../../style/index.css";

const initialForm = {
  amount: "",
  description: "",
  date: new Date(),
  category_id: "",
}; //mongo automatically creates an _id field for each member of an array

export default function TransactionForm(props) {
  let categories = useSelector((state) => state.authReducer.user.categories);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({err: false, msg: ""});

  useEffect(() => {
    if (props.editTransaction.amount !== undefined) {
      setForm(props.editTransaction);
    }
  }, [props.editTransaction]); 

  function handleChange(event) {
    let value = event.target.value;  
    if(event.target.id === "amount" ){
      if(value < 0){
        // value = 0;
        setError({err: true, msg: "Amount cannot be less than zero."})
      } else {
      setError({err: false, msg:""})
    }
  }
    setForm({ ...form, [event.target.name]: value });
  }

  function handleDateChange(newDate) {
    setForm({ ...form, date: newDate });
  }

  async function handleSubmit(event) {
    //add or update transaction API call
    event.preventDefault();
    let res;
    if (props.editTransaction.amount === undefined) {
      res = await transactionsAPI.addTransaction(form);
    } else {
      // console.log(props.editTransaction)
      res = await transactionsAPI.updateTransaction(form, props.editTransaction._id);
    }
    if (res.ok) {
      setForm(initialForm);
      props.setEditTransaction({});
      props.setUpdateTransactions(true);
    }
  }

  function getCategoryNameById() {
    //return category name
    return (
      categories.find((category) => category._id === form.category_id) ?? ""
    );
  }

  return (
    <Card
      sx={{
        // minWidth: 275,
        marginTop: 10,
      }}
    >
      <CardContent >
        <Typography variant="h6" sx={{marginBottom: 2}}>
          {props.editTransaction.amount ? "Edit " : "Add New"} Transaction
        </Typography>
        <Box component="form" onSubmit={handleSubmit} >
        {/* sx={{ display: "flex", flexDirection: { xs: "column", md: "row"} , justifyContent: "space-between"}}> */}
        <div className="transactionForm" >

        {/* <div className="formInputGroup">  */}
        <div className="transactionFormInput">

          <TextField
            onChange={handleChange}
            // sx={{ marginRight: 4, }}
            size="small"
            id="amount"
            label="Amount"
            variant="outlined"
            value={form.amount}
            name="amount"
            type="number"
            // className="transactionFormInput"
            required
            error={error.err}
            helperText={error.msg}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </div>
          <div className="transactionFormInput">

          <TextField
            onChange={handleChange}
            // sx={{ marginRight: 4, }}
            size="small"
            id="description"
            label="Description"
            // className="transactionFormInput"
            inputProps={{ maxLength: 35 }}
            variant="outlined"
            value={form.description}
            name="description"
            required
            fullWidth
          />
          </div>
        {/* </div> */}
        {/* <div className="formInputGroup">  */}
          <LocalizationProvider dateAdapter={AdapterDayjs} >
        <div className="transactionFormInput">
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="DD/MM/YYYY"
              onChange={handleDateChange}
              value={form.date}
              renderInput={(params) => (
                <TextField sx={{ display: "inline",  }} size="small" {...params} fullWidth/>
              )}
            />
        </div>
        <div className="transactionFormInput">
            <Autocomplete
              value={!form.category_id?"":(props.getCategoryById(form.category_id)).label}
              onChange={(event, newValue) => {
                // console.log(newValue)
                setForm({ ...form, category_id: newValue._id }); //mongo automatically creates an _id field for each member of an array
              }}
              id="categories-dropdown"
              
              options={categories}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // sx={{display: "inline-block", }}
              // renderOption: Autocomplete uses the category label as a key. If user enters 2 categories with same name, will give error due to identical keys. Using option._id which refers to category._id overwrites the key and makes it unique no matter what
              // renderOption={(props, option) => (
              //   <Box component="li" {...props} key={option._id}>
              //     {option.label}
              //   </Box>
              // )}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Category" required fullWidth/>
              )}
            />
            </div>
          </LocalizationProvider>
        {/* </div> */}
        {/* <div className="formInputGroup"> */}
          {props.editTransaction.amount !== undefined && (
            <ButtonSecondary text="Edit" disabled={error.err}></ButtonSecondary>
          )}
          {props.editTransaction.amount === undefined && (
            <ButtonPrimary text="Submit" disabled={error.err}></ButtonPrimary>
          )}
        {/* </div> */}
        </div>

        </Box>
      </CardContent>
    </Card>
  );
}

