import { TableCell } from "@mui/material";
import { colors } from "../../../assets";

export default function TableInnerCell(props) {
  return !props.nestedCell ? (
    <TableCell align="center">{props.text}</TableCell>
  ) : (
    <TableCell align="center">
      {props.text} {props.nestedCell}
    </TableCell>
  );
}
