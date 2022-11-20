import { Select, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from "react";

export default function CategoryFilter(props) {

  return (
    <Select
      size="small"
      IconComponent={FilterListIcon}
      // value={categoryFilter}
      value=""
      onChange={(event) => {
        const category = event.target.value;
        props.setFilter({ ...props.filter, category: category });
      }}
      autoWidth
      variant="standard"
      disableUnderline={true}
      style={{
        height: "3px",
        marginLeft: "1px",
        fontStyle: "italic",
        fontSize: "small",
      }}
      sx={{
        color: "white !important",
        ".MuiSvgIcon-root": { color: "white" },
        ".MuiInputBase-input": { paddingRight: "0 !important" },
        paddingRight: "5px",
      }}
    >
      <MenuItem value={null}>
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
