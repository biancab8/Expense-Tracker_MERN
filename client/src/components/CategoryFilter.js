import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";

export default function CategoryFilter(props) {

  async function handleChange(event) {
    props.setFilter(event.target.value);
  }

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel size="small" id="demo-simple-select-autowidth-label">
        Sort by
      </InputLabel>
      <Select
        size="small"
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={props.filter}
        onChange={handleChange}
        autoWidth
        label="Sort"
      >
      <MenuItem value={""}><em>None</em></MenuItem>
        {props.categories.map((category) => {
          return (
            <MenuItem key={category._id} value={category._id}>
              {category.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
