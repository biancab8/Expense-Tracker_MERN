import { Button } from "@mui/material";
import { colors } from "../../../assets";

export default function ButtonSecondary(props) {
  return (
    <Button
      type="submit"
      variant="outlined"
      disabled={props.disabled}
      sx={{
        maxHeight: "40px",
        borderColor: colors.buttonSecondary,
        color: colors.textPrimary,
        borderWidth: "2px",
        "&:hover": {
          backgroundColor: `${colors.buttonSecondaryHover} !important`,
          borderColor: colors.buttonSecondaryHover,
        },
      }}
    >
      {props.text}
    </Button>
  );
}
