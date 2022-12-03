import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Autocomplete,
  Box,
  Typography,
  TextField,
  InputAdornment,
  CardActions,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useSelector } from "react-redux";
import { ButtonPrimary, ButtonSecondary, ErrorModal } from "../ui";
import { transactionsAPI } from "../../api";
import "../../style/index.css";
import { colors } from "../../assets";

const initialForm = {
  amount: "",
  description: "",
  date: new Date(),
  category_id: "",
}; //mongo automatically creates an _id field for each member of an array

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return (
    <IconButton
      sx={{ backgroundColor: colors.tableBackgroundSecondary }}
      {...other}
    />
  );
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  align: "right",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function TransactionForm(props) {
  let categories = useSelector((state) => state.userReducer.user.categories);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({ err: false, msg: "" });
  const [expanded, setExpanded] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (props.editTransaction.amount !== undefined) {
      setForm({...props.editTransaction, amount: Number(props.editTransaction.amount)});
      setExpanded(true);
    }
  }, [props.editTransaction]);


  function toTwoDecimals(num) {
    //format num to number with max of 2 decimal places
    //does NOT add a thousands separator
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2, //max nr of decimals
      useGrouping: false,
    });
    return formatter.format(num);
  }


  function handleChange(event) {
    let value = event.target.value;
    if (event.target.id === "amount") {
      value=Number(value);
      if (value < 0) {
        setError({ err: true, msg: "Amount cannot be less than zero." });
      } else {
        setError({ err: false, msg: "" });
        value=toTwoDecimals(value)
      }
    }
    console.log(typeof(value))
    setForm({ ...form, [event.target.name]: value });
  }

  function handleDateChange(newDate) {
    setForm({ ...form, date: newDate });
  }

  async function handleSubmit(event) {
    //add or update transaction API call
    event.preventDefault();
    let res;
    try {
      if (props.editTransaction.amount === undefined) {
        res = await transactionsAPI.addTransaction(form);
      } else {
        res = await transactionsAPI.updateTransaction(
          form,
          props.editTransaction._id
        );
      }
      if (res.ok) {
        setForm(initialForm);
        props.setEditTransaction({});
        props.setUpdateTransactions(true);
      } else {
        setApiError(true);
      }
    } catch (error) {
      setApiError(true);
    }
  }

  return (
    <>
      {apiError ? (
        <ErrorModal
          open={apiError}
          onClose={() => setApiError(false)}
        ></ErrorModal>
      ) : null}
      <Card
        sx={{
          marginTop: 10,
        }}
      >
        <CardContent>
          <CardActions
            disableSpacing
            sx={{
              display: "flex",
              justifyContent: "space-between",
              ".MuiCardContent-root": { paddingBottom: "16px" },
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 0 }}>
              {props.editTransaction.amount ? "Edit " : "Add New"} Transaction
            </Typography>

            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit}>
                <div className="transactionForm">
                  <div className="transactionFormInput">
                    <TextField
                      onChange={handleChange}
                      size="small"
                      id="amount"
                      label="Amount"
                      variant="outlined"
                      type="number"
                      value={form.amount}
                      name="amount"
                      required
                      error={error.err}
                      helperText={error.msg}
                      fullWidth
                      inputProps={{
                        step:0.01,
                        min:0
                      }}
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
                      size="small"
                      id="description"
                      label="Description"
                      inputProps={{ maxLength: 35 }}
                      variant="outlined"
                      value={form.description}
                      name="description"
                      required
                      fullWidth
                    />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="transactionFormInput">
                      <DesktopDatePicker
                        label="Transaction Date"
                        inputFormat="DD/MM/YYYY"
                        onChange={handleDateChange}
                        value={form.date}
                        renderInput={(params) => (
                          <TextField
                            sx={{ display: "inline", paddingTop: "6px" }}
                            size="small"
                            {...params}
                            fullWidth
                          />
                        )}
                      />
                    </div>
                    <div className="transactionFormInput">
                      <Autocomplete
                        value={
                          !form.category_id
                            ? ""
                            : props.getCategoryById(form.category_id).label
                        }
                        onChange={(event, newValue) => {
                          setForm({ ...form, category_id: newValue._id }); //mongo automatically creates an _id field for each member of an array
                        }}
                        id="categories-dropdown"
                        options={categories}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Category"
                            required
                            fullWidth
                          />
                        )}
                      />
                    </div>
                  </LocalizationProvider>
                  {props.editTransaction.amount !== undefined && (
                    <ButtonSecondary
                      text="Edit"
                      disabled={error.err}
                    ></ButtonSecondary>
                  )}
                  {props.editTransaction.amount === undefined && (
                    <ButtonPrimary
                      text="Submit"
                      disabled={error.err}
                    ></ButtonPrimary>
                  )}
                </div>
              </Box>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    </>
  );
}
