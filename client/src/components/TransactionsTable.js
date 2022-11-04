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



export default function TransactionsTable(props) {
  const token = Cookie.get("token");

  async function remove(id){
    if(!window.confirm("Are you sure you want to delete this item?")){
      return; 
    } else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
       });
      if(res.ok){
        await props.fetchTransactions();
        window.alert("Item successfully deleted.")
      }
    }
  }

  function formatDate(date){
    return dayjs(date).format("MMM DD, YYYY");
  }

  const user = useSelector((state) => state.authReducer.user);
  function CategoryNameById(id){
    //get category array (w/ names + ids) from user from the store, then compare id with those to get the name
    const category = user.categories.find(category => category._id === id);
    return category?category.label:"NA";

  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        Lists of Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{transaction.amount}</TableCell>
                <TableCell align="center">{transaction.description}</TableCell>
                <TableCell align="center">{CategoryNameById(transaction.category_id)}</TableCell>
                <TableCell align="center">{formatDate(transaction.date)}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" component="label" onClick={() => props.setEditTransaction(transaction)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="warning" component="label" onClick={() => {remove(transaction._id)}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
