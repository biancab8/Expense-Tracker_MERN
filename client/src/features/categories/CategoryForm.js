//form where user can add or edit a category
import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, Box, Typography, TextField, Autocomplete, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../auth/authSlice";
import { ButtonPrimary, ButtonSecondary } from "../ui";
import { categoriesAPI } from "../../api";
import { icons } from "./CategoryIcon";


const initialForm = {
  label: "",
  icon: { name: "", default: false },
}; //default false -> is not a default category, so it can be deleted by user


export default function CategoryForm(props) {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({err: false, msg: ""})

  // const categories = useSelector((state) => state.authReducer.user.categories);

  useEffect(() => {
    if (props.editCategory._id !== undefined) {
      setForm(props.editCategory);
    }
  }, [props.editCategory._id]); 

  function handleChange(event) {
    setError({err: false, msg: ""})
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    //check if category already exists
    const duplicate = user.categories.find((category) => (category.label).toLowerCase() === (form.label).toLowerCase());
    if(duplicate){
      setError({err: true, msg: "A category with name alreayd exists."})
      return; 
    } 
    //add/edit cateory
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
        // minWidth: 275,
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
            sx={{ marginRight: 1, maxWidth: "45%" }}
            size="small"
            id="outlined-basic"
            label="Category"
            variant="outlined"
            value={form.label}
            name="label"
            required
            error={error.err}
            helperText={error.msg}
            inputProps={{ maxLength: 18 }}
          />
          {/* <FormControl> */}
          {/* <InputLabel id="icon-label">Icon</InputLabel> */}
<TextField
      size="small"
      // IconComponent=<InputLabel>Age</InputLabel>
      fontSize="5px"
      value={form.icon.name}
      onChange={(event, newValue) => {setForm({...form, icon: {name: event.target.value, default: false}})}}
      // autoWidth
      select
      // label="Icon"
      // sx={{ marginRight: 1 }}
      variant="outlined"
      label="Icon"
      required
      // aria-label="asdf"
        // style={{
          // height: "3px",
          // marginLeft: "10px",
          // fontStyle: "italic",
          // fontSize: "small",
          // minWidth: 85,
        // }}
      // sx={{ ".MuiSelect-select": {paddingBottom:0, minWidth:"35px", height: "33px", minHeight: "33px"}}}
      sx={{".MuiSelect-select": {paddingBottom:0}, marginRight: 1,".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {minHeight: "40px", minWidth: "80px"},}}
    >
{/* use icons from CategoryIcon, not form DB -> just showing all available icons, not all categories */}
      {icons.map((icon) => {
        return (
          <MenuItem key={icon.id} value={icon.label}>
            {icon.icon} 
          </MenuItem>

        );
      })}
    </TextField>
{/* // </FormControl> */}
          {props.editCategory._id !== undefined && (
            <ButtonSecondary disabled={error.err} text="Edit"/>
          )}
          {props.editCategory._id === undefined && (
            <ButtonPrimary disabled={error.err} text="Submit"/>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
