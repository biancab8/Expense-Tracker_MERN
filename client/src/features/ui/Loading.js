import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Box } from '@mui/material';

export default function Loading(){
    return <Box align="center" padding="20px"><HourglassTopIcon  />{"loading..."}</Box>
}