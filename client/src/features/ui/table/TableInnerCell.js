import { TableCell } from "@mui/material";
import { colors } from "../../../assets";
import "../../../style/index.css"

export default function TableInnerCell(props) {
  return !props.nestedCell ? (
    <TableCell sx={{fontSize: {xs: "0.7rem", md: "0.875rem"}, whiteSpace: "pre-wrap", wordBreak: "keep-all"}}
    align="center" >{props.text}</TableCell>
  ) : (


    <TableCell sx={{fontSize: {xs: "0.7rem", md: "0.875rem"}, whiteSpace: "pre-wrap", wordBreak: "keep-all"}} align="center" 
    className="cellSth">
      {props.text} {props.nestedCell}
    </TableCell>

  );
}
