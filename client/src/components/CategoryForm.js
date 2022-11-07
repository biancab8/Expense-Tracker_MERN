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
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';


const initialForm = {
  label: "",
  icon: {name: "other", default: false},
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
        margin:"auto",
        minWidth: 275,
        marginTop: 10,
      }}
    >
      <CardContent >
        <Typography variant="h6" sx={{marginBottom: 2, }} align="left">
          {props.editCategory._id ? "Edit " : "Add New"} Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex",  justifyContent: "space-between"}}>
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
