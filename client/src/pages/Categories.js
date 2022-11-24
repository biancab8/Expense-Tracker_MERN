import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../features/user/userSlice";
import { CategoryForm, CategoryIcon } from "../features/categories";
import { useState } from "react";
import { TableHeaderCell, ErrorModal } from "../features/ui";
import { categoriesAPI, transactionsAPI } from "../api";

export default function Categories() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState({});
  const [apiError, setApiError] = useState(false);

  async function remove(id) {
    //delete category from user's category array
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    } else {
      try{
        
        const res = await categoriesAPI.deleteCategory(id);
        if (res.ok) {
          const { categories } = await res.json();
          dispatch(setCategories(categories)); //update user in store so that page refreshes
      } 
    } catch(error){
      setApiError(true);
    }
      //add the default category "other" to each transaction that used the deleted category
      const newId = getDefaultCategory();
      const result = await transactionsAPI.updateTransactionsbyCategory(
        id,
        newId
        );
        if (!result.ok) {
          setApiError(true);
      }
    }
  }

  function getDefaultCategory() {
    //compare id with those in user's categories list. If match, return name, else 'NA'
    const category = user.categories.find(
      (category) => category.icon.default === true
    );
    return category._id;
  }

  return (
    <>
  {apiError ? (
        <ErrorModal
          open={apiError}
          onClose={() => setApiError(false)}
        ></ErrorModal>
      ) : null}
    <Container
      align="center"
      maxWidth="sm"
      sx={{ width: { xxs: "98%", md: "45%" }, paddingBottom: "80px" }}
    >
      <CategoryForm
        editCategory={editCategory}
        setEditCategory={setEditCategory}
      ></CategoryForm>
      <Typography
        align="left"
        sx={{ marginTop: 10, marginBottom: 1 }}
        variant="h6"
      >
        Custom Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeaderCell text="Label" />
              <TableHeaderCell text="Icon" />
              <TableHeaderCell text="Action" />
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((category) => {
              return (
                <TableRow key={category._id}>
                  <TableCell align="center">{category.label}</TableCell>

                  <TableCell align="center">
                    <CategoryIcon categoryName={category.icon.name} />
                  </TableCell>

                  <TableCell align="center">
                    {/* only show edit/del button for categories !== "other" */}
                    {!category.icon.default ? (
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
                    ) : (
                      <div>
                        <em>{"(default)"}</em>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
}
