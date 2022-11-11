//form where user can add or edit a category
import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, Box, Typography, TextField, } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/authSlice";
import { ButtonPrimary, ButtonSecondary } from "../ui";
import { categoriesAPI } from "../../api";

const initialForm = {
  label: "",
  icon: { name: "other", default: false },
}; //default false -> is not a default category, so it can be deleted by user


export default function CategoryForm(props) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (props.editCategory._id !== undefined) {
      setForm(props.editCategory);
    }
  }, [props.editCategory._id]); 

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    //add or update category API call 
    event.preventDefault();
    let res;
    if (props.editCategory._id === undefined) {
      res = await categoriesAPI.addCategory(form);
    } else {
      res = await categoriesAPI.updateCategory(props.editCategory._id, form);
    }
    if (res.ok) {
      const { user } = await res.json();
      if (props.editCategory) {
        props.setEditCategory({}); //if editing, reset the editCategory to {}
      }
      //reset form and update store with updated user data
      setForm(initialForm);
      dispatch(setUser(user));
    }
  }

  return (
    <Card
      sx={{
        margin: "auto",
        minWidth: 275,
        marginTop: 10,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }} align="left">
          {props.editCategory._id ? "Edit " : "Add New"} Category
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Category"
            variant="outlined"
            value={form.label}
            name="label"
            required
            inputProps={{ maxLength: 15 }}
          />
          {props.editCategory._id !== undefined && (
            <ButtonSecondary text="Edit"/>
          )}
          {props.editCategory._id === undefined && (
            <ButtonPrimary text="Submit"/>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
