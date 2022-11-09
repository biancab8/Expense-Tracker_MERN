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
import CategoryForm from "../features/categories/CategoryForm";
import { useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import getIcon from "../assets/Icon";

export default function Categories() {
  const token = Cookie.get("token");
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  // const icons = {
  //   "travel": <WbSunnyIcon/>,
  //   "shopping": <ShoppingCartIcon/>,
  //   "health": <LocalHospitalIcon/>, 
  //   "bills": <ReceiptLongIcon/>, 
  //   "leisure": <EmojiEmotionsIcon/>,
  //   "other": <AttachMoneyIcon/>,
  // }
  //to populate the category form with data of the state to be edited
  const [editCategory, setEditCategory] = useState({});

  async function remove(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    } else {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const { user } = await res.json();
        dispatch(setUser(user)); //update user in store so that page refreshes
      }
    }
  }


  return (
    <Container align="center" sx={{ width:'32%', minWidth: 450}}>
      <CategoryForm
        editCategory={editCategory}
        setEditCategory={setEditCategory}
      ></CategoryForm>
      <Typography  align="left" sx={{ marginTop: 10,  marginBottom:1}} variant="h6">
        Custom Categories
      </Typography>
      <TableContainer component={Paper} > {/*sx={{width:'70%'}}*/}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              {/* <TableCell align="center">Icon</TableCell> */}
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {user.categories.map((category) => {
                if(!category.icon.default){ //only allow non-default categories to be deleted/changed, so don't show those here
                  return (
                <TableRow
                  key={category._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{category.label}</TableCell>
                  {/* <TableCell align="center">{icons[category.icon.name]}</TableCell> */}
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => setEditCategory(category)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      component="label"
                      onClick={() => {
                        remove(category._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                
              )}})
              }

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
