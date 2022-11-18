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
import "../../style/index.css";

export default function TransactionsTable(props) {
  const user = useSelector((state) => state.authReducer.user);
  // const [categoryFilter, setCategoryFilter] = useState("");

  async function remove(id) {
    //delete transaction
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    } else {
      const res = await transactionsAPI.deleteTransaction(id);
      if (res.ok) {
        props.setUpdateTransactions(true);
      }
    }
  }

  // async function filterTransactions(startDate=null) {
  //   //filter transactions list by selected date range
  //   console.log("in table")
  //   console.log(props.endDate)
  //   await props.fetchTransactions(props.startDate, props.endDate, categoryFilter);
  // }

  // function categoryNameById(id) {
  //   //compare id with those in user's categories list. If match, return name, else 'NA'
  //   const category = user.categories.find((category) => category._id === id);
  //   return category ? category.icon.name : "Other";
  // }

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

  // async function filterCategory(event) {
  //   //filter transactions list by selected cateogry
  //   const category = event.target.value;
  //   setCategoryFilter(category);
  //   await props.fetchTransactions(category);
  // }

  return (
    <>
      {/* heading & date filter */}
      <Box
        // sx={{
        //   display: "flex",
        //   // alignItems: "flex-end",
        //   // justifyContent: "space-between",
        //   // marginBottom: 1,
        //   // marginTop: 9,
        //   flexDirection: "row"
        // }}
      >
      <div className="transactionsTableHeader">
        <div>
          <Typography sx={{ marginRight: 1 }} variant="h6" display="inline">
            Lists of Transactions
          </Typography>
          {props.transactionsData.length > 0 && (
            <ButtonTertiary
              handleClick={() => props.scrollToTarget("chart")}
              text="SEE CHARTS"
            />
          )}
        </div>
        <div>
          <DateFilter
            filter={props.filter}
            setFilter={props.setFilter}
           
          ></DateFilter>
        </div>
      </div>
      </Box>
      {/* table */}
      <TableContainer component={Paper} >
        {/* sx={{ minWidth: 650 }} */}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell text="Amount" />
              <TableHeaderCell text="Description" />
              <TableHeaderCell
                text="Category"
                // nested cell = category filter
                nestedCell=<CategoryFilter
                  filter={props.filter}
                  setFilter={props.setFilter}
                  user={user}
                />
              ></TableHeaderCell>
              <TableHeaderCell text="Date" />
              <TableHeaderCell text="Action" />
            </TableRow>
          </TableHead>
          <TableBody>
            {/* transactionsData = transactions grouped by month+year */}
            {/* each group has own list of transactions for that month */}
            {props.transactionsData.map((transactionsByMonth) => {
              //for each group
              return (
                <Fragment key={transactionsByMonth.transactions[0]._id}>
                  <TableRow
                  // sx={{
                  //   "&:last-child td, &:last-child th": {
                  //     border: 0,
                  //   },
                  // }}
                  >
                    <TableSummaryCell text={transactionsByMonth._id} />
                    <TableSummaryCell />
                    <TableSummaryCell />
                    <TableSummaryCell />
                    <TableSummaryCell
                      text={`Total: $${numToCurrency(
                        transactionsByMonth.totalExpenses
                      )}`}
                    />
                  </TableRow>
                  {transactionsByMonth.transactions.map((transaction) => {
                    //for each transaction
                    {
                      /* console.log(transaction) */
                    }
                    const category = props.getCategoryById(
                      transaction.category_id
                    );
                    {
                      /* console.log(category) */
                    }
                    return (
                      <TableRow
                        key={transaction._id}
                        // width="100%"
                        // sx={{display: "flex",
                        // justifyContent: "space-between", alignItems: "stretch"}}
                        // sx={{
                        //   "&:last-child td, &:last-child th": { border: 0 },
                        // }}
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
                            <Grid item xs={4} 
                            marginLeft="6px" 
                            align="center">
                              <CategoryIcon categoryName={category.iconName} />
                            </Grid>
                            <Grid item xs={6} align="left">
                              {category.label}
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
                              onClick={() => {
                                props.setEditTransaction(transaction);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
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
        {props.loading && <Loading />}
        {props.transactionsData.length <= 0 && !props.loading && (
          <Box align="center" padding="20px">
            {"No entries."}
          </Box>
        )}
      </TableContainer>
    </>
  );
}
