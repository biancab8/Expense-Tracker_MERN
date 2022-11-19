import { TableCell } from "@mui/material";
import { colors } from "../../../assets";

export default function TableHeaderCell(props) {
  return !props.nestedCell ? (
    <TableCell
      sx={{ color: colors.textSecondary, backgroundColor: colors.tableHeader, fontSize: {xs: "0.7rem", md: "0.875rem"}, whiteSpace: "pre-wrap", }}
      align="center"
    >
      {props.text}
    </TableCell>
  ) : (
    <TableCell
      sx={{ color: colors.textSecondary, backgroundColor: colors.tableHeader, fontSize: {xs: "0.7rem", md: "0.875rem"}, whiteSpace: "pre-wrap", }}
      align="center"
    >
      {props.text} {props.nestedCell}
    </TableCell>
  );
}
