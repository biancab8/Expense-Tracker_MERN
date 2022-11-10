import { Button } from "@mui/material"
import { colors } from "../../../assets"

export default function ButtonTertiary(props){
    return (
        <Button onClick={props.handleClick} sx={{color:colors.textTertiary, whiteSpace:"break-spaces", backgroundColor: colors.buttonTertiary, "&:hover": {
            backgroundColor: `${colors.buttonTertiaryHover} !important`,}}}   variant="text">{props.text}</Button>
    )
}