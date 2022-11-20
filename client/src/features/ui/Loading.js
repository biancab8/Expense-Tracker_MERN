import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    }}
  >
    <CircularProgress />
  </Box>
  );
}
