import { Button, createTheme } from "@mui/material";
import { colors } from "../../../assets";

export const primaryButtonTheme = createTheme({
  palette: {
    primary: {
      main: colors.buttonPrimary,
      dark: colors.buttonPrimaryHover,
    },
  },
});

export default function ButtonPrimary(props) {
  return (
    <Button type="submit" variant="contained" theme={primaryButtonTheme} disabled={props.disabled} sx={{maxHeight: "40px"}}>
      {props.text}
    </Button>
  );
}
