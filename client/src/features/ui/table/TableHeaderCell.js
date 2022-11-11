import { TableCell } from "@mui/material";
import { colors } from "../../../assets";

export default function TableHeaderCell(props) {
  return !props.nestedCell ? (
    <TableCell
      sx={{ color: colors.textSecondary, backgroundColor: colors.tableHeader }}
      align="center"
    >
      {props.text}
    </TableCell>
  ) : (
    <TableCell
      sx={{ color: colors.textSecondary, backgroundColor: colors.tableHeader }}
      align="center"
    >
      {props.text} {props.nestedCell}
    </TableCell>
  );
}
