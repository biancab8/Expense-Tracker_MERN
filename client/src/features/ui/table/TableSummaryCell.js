import { TableCell } from "@mui/material";
import { colors } from "../../../assets";

export default function TableSummaryCell(props) {
  return (
    <TableCell
      align="center"
      sx={{
        backgroundColor: colors.tableBackgroundSecondary,
        color: colors.textPrimary, fontWeight:"bold"
      }}
    >
      <em>{props.text}</em>
    </TableCell>
  );
}
