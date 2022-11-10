import * as React from "react";
import {
  Select,
  MenuItem,
  Table,
  Button,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { DateFilter } from "./index";
import { colors } from "../../assets";
import { CategoryIcon } from "../categories";
import "../../index";
import { TableHeaderCell, TableInnerCell, TableSummaryCell, ButtonTertiary } from "../ui";


export default function TransactionsTable(props) {
  const token = Cookie.get("token");
  const user = useSelector((state) => state.authReducer.user);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  async function filterTransactions(startDate, endDate) {
    //calls fetchTransactions in TransactionsTable and provides a start and end date to
    //filter the transactions list
    await props.fetchTransactions(startDate, endDate, categoryFilter);
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

  function numToMonth(num) {
    const date = new Date();
    date.setMonth(num - 1);
    return date.toLocaleString("en-US", { month: "long" });
  }

  function filterCategory(event) {
    const category = event.target.value;
    setCategoryFilter(category);
    props.fetchTransactions(startDate, endDate, category);
  }

  return (
    <>
      {/* <Box  sx={{ display: "inline-flex", justifyContent: "space-between"}}> */}
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
        <Typography
          sx={{ marginRight: 3}}
          variant="h6"
          display="inline"
        >
          Lists of Transactions
        </Typography>

        <ButtonTertiary handleClick={props.goToChart} text="SEE CHART"/>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell text="Amount" />
              <TableHeaderCell text="Description" />
              <TableHeaderCell
                text="Category"
                //inner cell = filter
                nestedCell=
                <Select
                  size="small"
                  fontSize="5px"
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={categoryFilter}
                  onChange={filterCategory}
                  autoWidth
                  variant="standard"
                  disableUnderline={true}
                  style={{
                    height: "3px",
                    marginLeft: "8px",
                    fontStyle: "italic",
                    fontSize: "small",
                    color: "#f0f3ff"
                  }}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {user.categories.map((category) => {
                    return (
                      <MenuItem key={category._id} value={category._id}>
                        {category.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              ></TableHeaderCell>
              <TableHeaderCell text="Date" />
              <TableHeaderCell text="Action" />
            </TableRow>
          </TableHead>
          <TableBody>
            {/* transactionsData = transactions grouped by month+year */}
            {/* each group has own list of transactions for that month */}
            {props.transactionsData.map((transactionsByMonth) => {
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
                  {transactionsByMonth.transactions.map((transaction) => {
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
                        <TableInnerCell text={formatDate(transaction.date)} />
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
      </TableContainer>
    </>
  );
}
