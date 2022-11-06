
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

function getIcon(name){
    const categoryName = name.toLowerCase(); 
    return icons[categoryName]??icons["other"];
}

  export default getIcon; 