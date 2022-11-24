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
  TableCell,
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
  ErrorModal,
} from "../ui";
import { transactionsAPI } from "../../api";
import { colors } from "../../assets";
import "../../style/index.css";

export default function TransactionsTable(props) {
  const user = useSelector((state) => state.userReducer.user);
  const [apiError, setApiError] = useState(false);

  async function remove(id) {
    //delete transaction
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    } else {
      try {
        const res = await transactionsAPI.deleteTransaction(id);
        if (res.ok) {
          props.setUpdateTransactions(true);
        } else {
          setApiError(true);
        }
      } catch (error) {
        setApiError(true);
      }
    }
  }

  function numToCurrency(num) {
    //format num to currency with 2 decimal places
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2, //max nr of decimals
    });
    return formatter.format(num);
  }

  let total = 0;
  return (
    <>
    {apiError ? (
        <ErrorModal
          open={apiError}
          onClose={() => setApiError(false)}
        ></ErrorModal>
      ) : null}
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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell text="Amount" />
              <TableHeaderCell text="Description" />
              <TableHeaderCell
                text="Category"
                // nested cell -> category filter
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
                  <TableRow>
                    <TableSummaryCell
                      text={transactionsByMonth._id}
                      span={2}
                      align="left"
                    />
                    <TableSummaryCell span={1} />
                    <TableSummaryCell
                      span={2}
                      align="right"
                      text={`$${numToCurrency(
                        transactionsByMonth.totalExpenses
                      )}`}
                    />
                  </TableRow>
                  {transactionsByMonth.transactions.map((transaction) => {
                    //for each transaction
                    total = total + transaction.amount;
                    const category = props.getCategoryById(
                      transaction.category_id
                    );
                    return (
                      <TableRow key={transaction._id}>
                        <TableInnerCell
                          text={"$" + numToCurrency(transaction.amount)}
                        />
                        <TableInnerCell text={transaction.description} />
                        <TableInnerCell
                          text=""
                          nestedCell=<Grid container>
                            <Grid item xs={1} />
                            <Grid item xs={4} marginLeft="6px" align="center">
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

            {/* grand total */}
            <TableRow>
              <TableCell
                variant="head"
                align="right"
                colSpan={5}
                sx={{
                  color: colors.textPrimary,
                  fontWeight: "bold",
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  whiteSpace: "pre-wrap",
                  wordBreak: "keep-all",
                  textDecoration: "underline 2px double",
                  textUnderlineOffset: "6px",
                }}
              >
                {`Total: $${numToCurrency(total)}`}
              </TableCell>
            </TableRow>
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
