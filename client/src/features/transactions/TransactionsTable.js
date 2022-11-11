import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { DateFilter } from "./index";
import { CategoryFilter, CategoryIcon } from "../categories";
import {
  Table,
  Typography,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import {
  TableHeaderCell,
  TableInnerCell,
  TableSummaryCell,
  ButtonTertiary,
  Loading,
} from "../ui";
import { transactionsAPI } from "../../api";


export default function TransactionsTable(props) {
  const user = useSelector((state) => state.authReducer.user);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  async function remove(id) {
    //delete transaction
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    } else {
      const res = await transactionsAPI.deleteTransaction(id);
      if (res.ok) {
        await props.fetchTransactions();
      }
    }
  }

  async function filterTransactions(startDate, endDate) {
    //filter transactions list by selected date range
    await props.fetchTransactions(startDate, endDate, categoryFilter);
  }

  function categoryNameById(id) {
    //compare id with those in user's categories list. If match, return name, else 'NA'
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "Other";
  }

  function numToCurrency(num) {
    //format num to currency with 2 decimal places
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2, //max nr of decimals
    });
    return formatter.format(num);
  }

  function numToMonth(num) {
    //numerical month to month name
    const date = new Date();
    date.setMonth(num - 1); //0=jan
    return date.toLocaleString("en-US", { month: "long" });
  }

  async function filterCategory(event) {
    //filter transactions list by selected cateogry
    const category = event.target.value;
    setCategoryFilter(category);
    await props.fetchTransactions(startDate, endDate, category);
  }

  return (
    <>
    {/* heading & date filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 1,
          marginTop: 9,
        }}
      >
        <div>
          <Typography sx={{ marginRight: 3 }} variant="h6" display="inline">
            Lists of Transactions
          </Typography>
          {props.transactionsData.length>0&&<ButtonTertiary handleClick={props.goToChart} text="SEE CHART" />}
        </div>
        <div> 
          <DateFilter
            filterTransactions={filterTransactions}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            categoryFilter={categoryFilter}
          ></DateFilter>
        </div>
      </Box>
      {/* table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell text="Amount" />
              <TableHeaderCell text="Description" />
              <TableHeaderCell
                text="Category"
                // nested cell = category filter
                nestedCell = <CategoryFilter filterCategory={filterCategory} categoryFilter={categoryFilter} user={user}/>
              ></TableHeaderCell>
              <TableHeaderCell text="Date" />
              <TableHeaderCell text="Action" />
            </TableRow>
          </TableHead>
          <TableBody>

            {/* transactionsData = transactions grouped by month+year */}
            {/* each group has own list of transactions for that month */}
            {props.transactionsData.map((transactionsByMonth) => {  //for each group
              return (
                <Fragment key={transactionsByMonth.transactions[0]._id}>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableSummaryCell
                      text={`${numToMonth(transactionsByMonth._id.month)} ${
                        transactionsByMonth._id.year
                      }`}
                    />
                    <TableSummaryCell />
                    <TableSummaryCell />
                    <TableSummaryCell />
                    <TableSummaryCell
                      text={`Total: $${numToCurrency(
                        transactionsByMonth.totalExpenses
                      )}`}
                    />
                  </TableRow>
                  {transactionsByMonth.transactions.map((transaction) => { //for each transaction
                    return (
                      
                      <TableRow
                        key={transaction._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableInnerCell
                          text={"$" + numToCurrency(transaction.amount)}
                        />
                        <TableInnerCell text={transaction.description} />
                        {/* icon + category name nested in 1 outer cell */}
                        <TableInnerCell
                          text=""
                          nestedCell=<Grid container>
                            <Grid item xs={1} />
                            <Grid item xs={4} align="center">
                              <CategoryIcon
                                categoryName={categoryNameById(
                                  transaction.category_id
                                )}
                              />
                            </Grid>
                            <Grid item xs={6} align="left">
                              {categoryNameById(transaction.category_id)}
                            </Grid>
                          </Grid>
                        ></TableInnerCell>
                        <TableInnerCell
                          text={dayjs(transaction.date).format("MMM DD, YYYY")}
                        />
                        <TableInnerCell
                          text=""
                          nestedCell=<div>
                            <IconButton
                              color="primary"
                              component="label"
                              onClick={() =>
                                props.setEditTransaction(transaction)
                              }
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
                          </div>
                        />
                      </TableRow>
                    );
                  })}
            
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
        {props.loading&&<Loading/>}
        {props.transactionsData.length<=0&&<Box align="center" padding="20px">{"No entries."}</Box>}
      </TableContainer>
      
    </>
  );
}
