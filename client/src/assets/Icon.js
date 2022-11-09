
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



const icons = {
  "travel": <WbSunnyIcon/>,
  "shopping": <ShoppingCartIcon/>,
  "health": <LocalHospitalIcon/>, 
  "bills": <ReceiptLongIcon/>, 
  "leisure": <EmojiEmotionsIcon/>,
  "other": <AttachMoneyIcon/>,
}

export default function Icon(props){
// takes a category name and returns the corresponding icon
// if none match, return icon for "other"
  const categoryName = props.categoryName.toLowerCase();
  const icon = icons[categoryName]; 
  return icon?icon:icons["other"];
}