import * as React from "react";
import {Table, TableBody, TableCell, Box, TableContainer, Grid, TableHead, TableRow, Container, Paper, Typography, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import {CategoryForm} from "../features/categories";
import { useState } from "react";
import { TableHeaderCell } from "../features/ui";
import { categoriesAPI, transactionsAPI } from "../api";
import { CategoryIcon } from "../features/categories";


export default function Categories() {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState({});




  async function remove(id) {
    //delete category from user's category array
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    } else {
      const res = await categoriesAPI.deleteCategory(id);
      if (res.ok) {
        const { user } = await res.json();
        dispatch(setUser(user)); //update user in store so that page refreshes
      }
      //add the default category "other" to each transaction that used the deleted category
      const newId = getDefaultCategory();
      // console.log("is still this id")
      // console.log(newId)
      const result = await transactionsAPI.updateTransactionsbyCategory(id, newId); 
      if (result.ok){
      // const resu{
        // console.log("ok")
    } else {
      console.log("err")
    }
    }
  }

  function getDefaultCategory() {
    //compare id with those in user's categories list. If match, return name, else 'NA'
    const category = user.categories.find((category) => category.icon.default === true);
    console.log("should be this id")
    console.log(category._id)
    return category._id;
    // return category ? {label: category.label, iconName: category.icon.name} : {label: "Other", iconName: "other"};
  }


  return (
    <Container align="center" maxWidth="sm" sx={{width: {xxs: "98%", md: "45%"}, paddingBottom: "80px" }}>
                 
      <CategoryForm
        editCategory={editCategory}
        setEditCategory={setEditCategory}
      ></CategoryForm>
      <Typography  align="left" sx={{ marginTop: 10,  marginBottom:1}} variant="h6">
        Custom Categories
      </Typography>
      <TableContainer component={Paper} > 
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell text="Label"/>
              <TableHeaderCell text="Icon"/>
              <TableHeaderCell text="Action"/>
            </TableRow>
          </TableHead>
          <TableBody>

              {user.categories.map((category) => {
                
                {/* if(!category.icon.default){ //only allow non-default categories to be deleted/changed, so don't show those here */}
                  return (
                <TableRow
                  key={category._id}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{category.label}</TableCell>


                  <TableCell align="center"><CategoryIcon
                                categoryName={category.icon.name}
                              /></TableCell>


                  <TableCell align="center">
                  {/* only show edit/del button for categories !== "other" */}
                  {!category.icon.default?
                  <>
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
                  </>
                    :<div><em>{"(default)"}</em></div>}
                  </TableCell>
                </TableRow>
                
              ) })
              }

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
