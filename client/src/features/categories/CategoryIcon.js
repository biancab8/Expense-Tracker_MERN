import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LunchDiningIcon from '@mui/icons-material/LunchDining';

export const icons = [
  { label: "travel", icon: <WbSunnyIcon />},
  { label: "shopping", icon: <ShoppingCartIcon /> },
  { label: "health", icon: <LocalHospitalIcon />},
  { label: "bills", icon: <ReceiptLongIcon />},
  { label: "leisure", icon: <EmojiEmotionsIcon />},
  // { label: "food", icon: <LunchDiningIcon />},
  { label: "other", icon: <AttachMoneyIcon />},
];

//add unique id to each item (using idx)
icons.forEach((icon, idx) => icon.id = idx);

export default function CategoryIcon(props) {
  // takes a category name and returns the corresponding icon, if none match, return icon for "other"
  const categoryName = props.categoryName.toLowerCase();
  const icon = icons.find(icon => icon.label === categoryName);
  return icon ? icon.icon : icons.find(icon => icon.label === "other").icon;
}
