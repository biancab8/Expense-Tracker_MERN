import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

const initialForm = {
  label: "",
  icon: "",
}; //mongo automatically creates an _id field for each member of an array

export default function CategoryForm(props) {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.authReducer.user.categories);

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

  function handleDateChange(newDate) {
    // setForm({ ...form, date: newDate });
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
      const {user} = await res.json();
    //   console.log(user)
    if(props.editCategory){
        props.setEditCategory({});
    }
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

  function getCategoryNameById() {
    // return categories.find((category) => category._id === form.category_id) ?? ""
    //categories is DB array with name + ids
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        marginTop: 10,
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {props.editCategory._id ? "Edit " : "Add New"} Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Label"
            variant="outlined"
            value={form.label}
            name="label"
            required
          />
          <TextField
            onChange={handleChange}
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Icon"
            variant="outlined"
            value={form.icon}
            name="icon"
          />


          {/* </LocalizationProvider> */}
          {props.editCategory._id !== undefined && (
            <Button type="submit" variant="secondary">
              Edit
            </Button>
          )}
          {props.editCategory._id === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
