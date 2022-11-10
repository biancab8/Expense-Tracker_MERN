//filter icon + dropdown list of categories to choose from
import { Select, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from "react";

export default function CategoryFilter(props) {
  return (
    <Select
      size="small"
      IconComponent={FilterListIcon}
      fontSize="5px"
      value={props.categoryFilter}
      onChange={props.filterCategory}
      autoWidth
      variant="standard"
      disableUnderline={true}
        style={{
          height: "3px",
          marginLeft: "1px",
          fontStyle: "italic",
          fontSize: "small",

        }}
      sx={{ color: "white !important", ".MuiSvgIcon-root": { color: "white" },  paddingRight: "5px"}}
    >
      <MenuItem value={""}>
        <em>None</em>
      </MenuItem>
      {props.user.categories.map((category) => {
        return (
          <MenuItem key={category._id} value={category._id}>
            {category.label} 
          </MenuItem>
        );
      })}
    </Select>
  );
}
