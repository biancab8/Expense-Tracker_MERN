import { useSelector } from "react-redux";

export default function categoryNameById(id) {
  const user = useSelector((state) => state.userReducer.user);
  //compare id with those in user's categories list. If match, return name, else 'NA'
  const category = user.categories.find((category) => category._id === id);
  return category ? category.icon.name : "Other";
}
