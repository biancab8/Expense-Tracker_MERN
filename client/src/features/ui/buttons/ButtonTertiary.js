import { Button } from "@mui/material";
import { colors } from "../../../assets";

export default function ButtonTertiary(props) {
  return (
    <Button
      onClick={props.handleClick}
      disabled={props.disabled}
      sx={{
        color: colors.textTertiary,
        whiteSpace: "break-spaces",
        backgroundColor: colors.buttonTertiary,
        "&:hover": {
          backgroundColor: `${colors.buttonTertiaryHover} !important`,
        },
        maxHeight: "40px",
      }}
      variant="text"
    >
      {props.text}
    </Button>
  );
}
