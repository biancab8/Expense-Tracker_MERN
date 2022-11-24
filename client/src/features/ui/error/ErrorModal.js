import ErrorMessage from "./ErrorMessage";
import { Modal, Box } from "@mui/material";

const errorModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  "&:focus-visible": {outline: "none"}
}

const defaultErrMsg = "Something went wrong. Please try again later.";

export default function ErrorModal(props){
    let errMsg = defaultErrMsg;
    if(props.msg){
        errMsg= props.msg;
    }
    return (
    <Modal open={props.open} onClose={props.onClose}>
        <Box sx={errorModalStyle}>
            <ErrorMessage msg={errMsg}></ErrorMessage>
        </Box>
    </Modal>
    )
}