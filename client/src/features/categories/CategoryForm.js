import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, Button, Box, Typography, TextField, } from "@mui/material";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/authSlice";
import {colors} from "../../assets";

const initialForm = {
  label: "",
  icon: { name: "other", default: false },
}; //default false -> is not a default category, so it can be deleted by user

export default function CategoryForm(props) {
  const dispatch = useDispatch();
  // let categories = useSelector((state) => state.authReducer.user.categories);

  const token = Cookie.get("token");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (props.editCategory._id !== undefined) {
      setForm(props.editCategory);
    }
  }, [props.editCategory._id]); //run whenever this var changes/is updated

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let res;
    if (props.editCategory._id === undefined) {
      res = await addCategory();
    } else {
      res = await updateCategory();
    }
    if (res.ok) {
      const { user } = await res.json();
      //if editing, reset the editCategory to {}
      if (props.editCategory) {
        props.setEditCategory({});
      }
      //reset form and update store with updated user data
      setForm(initialForm);
      dispatch(setUser(user));
    }
  }

  async function addCategory() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }

  async function updateCategory() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/categories/${props.editCategory._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  }

  // function getCategoryNameById() {
  //   // return categories.find((category) => category._id === form.category_id) ?? ""
  //   //categories is DB array with name + ids
  // }

  // function getIcon() {
  //   //takes the icon name and returns the corresponding material UI component
  //   if (false) {
  //     return <AcUnitIcon />;
  //   }
  //   return <AirplanemodeActiveIcon />;
  // }

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

          {/* <Autocomplete
            value={form.icon}
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue }); //mongo automatically creates an _id field for each member of an array
            }}
            id="icons"
            options={icons}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: 200, marginRight: 5 }}
            // defaultValue={[]}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Icon" required />
              
            )}
          /> */}

          {/* </LocalizationProvider> */}
          {props.editCategory._id !== undefined && (
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: colors.buttonSecondary,
                color: colors.textPrimary,
              }}
            >
              Edit
            </Button>
          )}
          {props.editCategory._id === undefined && (
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: colors.buttonPrimary,
                color: colors.textPrimary,
              }}
            >
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
