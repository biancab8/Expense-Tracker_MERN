import { TextField} from "@mui/material";
import { colors } from "../../../assets";

export default function ErrorMessage(props) {
  return (
    <TextField
      margin="normal"
      fullWidth
      name="error-message"
      id="error"
      input="readonly"
      value={props.msg}
      disabled
      style={{ backgroundColor: colors.error,}}
    />
  );
}



