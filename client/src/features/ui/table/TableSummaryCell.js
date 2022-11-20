import { TableCell } from "@mui/material";
import { colors } from "../../../assets";

export default function TableSummaryCell(props) {
  return (
    <TableCell
      align={props.align}
      colSpan={props.span}
      sx={{
        backgroundColor: colors.tableBackgroundSecondary,
        color: colors.textPrimary,
        fontWeight: "bold",
        fontSize: { xs: "0.75rem", md: "0.875rem" },
        whiteSpace: "pre-wrap",
        wordBreak: "keep-all",
      }}
    >
      <em>{props.text}</em>
    </TableCell>
  );
}
