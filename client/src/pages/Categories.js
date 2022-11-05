import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import Cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";



export default function Categories() {
const token = Cookie.get("token");
const user = useSelector((state) => state.authReducer.user);
const dispatch = useDispatch();

  async function remove(id){
    if(!window.confirm("Are you sure you want to delete this item?")){
        return; 
      } else {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(res.ok){
        const {user} = await res.json();
        dispatch(setUser(user)) //update user in store so that page refreshes
        window.alert("Item successfully deleted.")
    }
}
  }

  return (
    <Container>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        Lists of Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((category) => (
              <TableRow
                key={category._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{category.label}</TableCell>
                <TableCell align="center">{category.icon}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" component="label" 
                  // onClick={() => props.setEditTransaction(transaction)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="warning" component="label" 
                  onClick={() => {remove(category._id)}}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}