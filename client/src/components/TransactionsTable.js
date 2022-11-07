import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
import getIcon from "../utils/getIcon";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SortSelect from "./CategoryFilter";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import DateFilter from "./DateFilter";

export default function Categories(props) {
  const token = Cookie.get("token");
  const user = useSelector((state) => state.authReducer.user);
  const [categoryFilter, setCategoryFilter] = useState("");

  async function remove(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    } else {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        await props.fetchTransactions();
      }
    }
  }


  async function filterTransactions(startDate, endDate){
    //calls fetchTransactions in TransactionsTable and provides a start and end date to 
    //filter the transactions list
    await props.fetchTransactions(startDate, endDate);
  }

  function formatDate(date) {
    return dayjs(date).format("MMM DD, YYYY");
  }

  function categoryNameById(id) {
    //get category array (w/ names + ids) from user from the store, then compare id with those to get the name
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "NA";
  }

  function numToCurrency(num) {
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2, //max nr of minor digits
    });
    return formatter.format(num);
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ marginTop: 10, marginBottom: 1 }} variant="h6">
          Lists of Transactions
        </Typography>
        <CategoryFilter
          categories={user.categories}
          filter={categoryFilter}
          setFilter={setCategoryFilter}
        ></CategoryFilter>
        <DateFilter filterTransactions={filterTransactions}>
       
        </DateFilter>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              {/* <TableCell align="center"></TableCell> */}
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transactions.map((transaction) => {
              if (!categoryFilter || (categoryFilter && transaction.category_id == categoryFilter)) {
                return (
                  <TableRow
                    key={transaction._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {"$" + numToCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell align="center">
                      {transaction.description}
                    </TableCell>

                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={4} align="center">
                          {getIcon(categoryNameById(transaction.category_id))}
                        </Grid>
                        <Grid item xs={6} align="left">
                          {categoryNameById(transaction.category_id)}
                        </Grid>
                      </Grid>
                    </TableCell>

                    <TableCell align="center">
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        component="label"
                        onClick={() => props.setEditTransaction(transaction)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="warning"
                        component="label"
                        onClick={() => {
                          remove(transaction._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
