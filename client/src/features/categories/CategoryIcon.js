import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const icons = {
  "travel": <WbSunnyIcon/>,
  "shopping": <ShoppingCartIcon/>,
  "health": <LocalHospitalIcon/>, 
  "bills": <ReceiptLongIcon/>, 
  "leisure": <EmojiEmotionsIcon/>,
  "other": <AttachMoneyIcon/>,
}

export default function CateogryIcon(props){
// takes a category name and returns the corresponding icon
// if none match, return icon for "other"
  const categoryName = props.categoryName.toLowerCase();
  const icon = icons[categoryName]; 
  return icon?icon:icons["other"];
}