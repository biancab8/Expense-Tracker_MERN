import { Button } from "@mui/material"
import { colors } from "../../../assets"

export default function ButtonPrimary(props){
    return (
        <Button type="submit" variant="contained" sx={{backgroundColor: colors.buttonPrimary, color:colors.textPrimary, "&:hover": {
            backgroundColor: `${colors.buttonPrimaryHover} !important`
          }}} >
                    {props.text}
                  </Button>
    )
}

