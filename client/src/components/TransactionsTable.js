import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
import getIcon from "../utils/getIcon";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SortSelect from "./CategoryFilter";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import DateFilter from "./DateFilter";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import colors from "../utils/colors";
import TableSortLabel from "@mui/material/TableSortLabel";
import FilterListIcon from '@mui/icons-material/FilterList'; 
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FilterList from "@mui/icons-material/FilterList";

export default function Categories(props) {
  const token = Cookie.get("token");
  const user = useSelector((state) => state.authReducer.user);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  async function remove(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    } else {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        await props.fetchTransactions();
      }
    }
  }

  async function filterTransactions(startDate, endDate) {
    //calls fetchTransactions in TransactionsTable and provides a start and end date to
    //filter the transactions list
    await props.fetchTransactions(startDate, endDate, categoryFilter);
  }

  function formatDate(date) {
    return dayjs(date).format("MMM DD, YYYY");
  }

  function categoryNameById(id) {
    //get category array (w/ names + ids) from user from the store, then compare id with those to get the name
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "NA";
  }

  function numToCurrency(num) {
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2, //max nr of minor digits
    });
    return formatter.format(num);
  }

  function numToMonth(num){
    const date = new Date();
    date.setMonth(num - 1);
    return date.toLocaleString('en-US', { month: 'long'});
  }




  ///delete: ////////////////////////////////////////////////////////////////

  function filterCategory(event){
    const category = event.target.value;
    setCategoryFilter(category);
    props.fetchTransactions(null, null, category); ////////////////////////////////////
    //////////////////////////////////
    ////////////////////////////////////
  }



  return (
    <>
      {/* <Box  sx={{ display: "inline-flex", justifyContent: "space-between"}}> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <Typography
          sx={{ marginTop: 10, marginBottom: 1 }}
          variant="h6"
          display="inline"
        >
          Lists of Transactions
        </Typography>
        {/* <Typography sx={{ alignSelf:"right", marginTop: 10, marginBottom: 1, marginRight:0,}} variant="string" display="inline">
          <em>Filter by:</em>
        </Typography> */}


        {/* <div>
          <CategoryFilter
            categories={user.categories}
            filter={categoryFilter}
            setFilter={setCategoryFilter}
          ></CategoryFilter>
          <DateFilter filterTransactions={filterTransactions}></DateFilter>

        </div> */}



      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">   
            Amount
            </TableCell>

              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category
              {/* <Tooltip title="Filter list"> */}
          {/* <IconButton onClick={() => setFilter(true)}> */}
<Select
        size="small"
        fontSize="5px"
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={categoryFilter}
        onChange={filterCategory}
        autoWidth
        variant="standard"
        disableUnderline={true}
        style={{height:"3px",  marginLeft:"8px", fontStyle:"italic", fontSize:"small"}}
      >
      <MenuItem value={""}><em>None</em></MenuItem>
        {user.categories.map((category) => {
          return (
            <MenuItem key={category._id} value={category._id}>
              {category.label}
            </MenuItem>
          );
        })}
      </Select>















          </TableCell>

              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* transactionsData = transactions grouped by month+year */}
            {/* each group has own list of transactions for that month */}
            {props.transactionsData.map((transactionsByMonth) => {
              return (
                <Fragment key={transactionsByMonth.transactions[0]._id}>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { 
                        border: 0,  },
                    }}
                  >
                    <TableCell align="center" sx={{backgroundColor: colors.tableBackgroundSecondary, color: colors.textSecondary,}}>
                      {`${numToMonth(transactionsByMonth._id.month)}, ${transactionsByMonth._id.year}`}
                    </TableCell>
                    <TableCell align="center" sx={{backgroundColor: colors.tableBackgroundSecondary, color: colors.textSecondary,}}>
                    
                    </TableCell>
                    <TableCell align="center" sx={{backgroundColor: colors.tableBackgroundSecondary, color: colors.textSecondary,}}>
                 
                    </TableCell>
                    <TableCell align="center" sx={{backgroundColor: colors.tableBackgroundSecondary, color: colors.textSecondary,}}>
                    
                    </TableCell>
                    <TableCell align="center" sx={{backgroundColor: colors.tableBackgroundSecondary, color: colors.textSecondary,}}>
                    Total: ${numToCurrency(transactionsByMonth.totalExpenses)}
                    </TableCell>
                  </TableRow>

                  {transactionsByMonth.transactions.map((transaction) => {
                    {/* if (
                      !categoryFilter ||
                      (categoryFilter &&
                        transaction.category_id == categoryFilter)
                    ) { */}
                      return (
                        <TableRow
                          key={transaction._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {"$" + numToCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell align="center">
                            {transaction.description}
                          </TableCell>

                          <TableCell align="center">
                            <Grid container>
                              <Grid item xs={1} />
                              <Grid item xs={4} align="center">
                                {getIcon(
                                  categoryNameById(transaction.category_id)
                                )}
                              </Grid>
                              <Grid item xs={6} align="left">
                                {categoryNameById(transaction.category_id)}
                              </Grid>
                            </Grid>
                          </TableCell>

                          <TableCell align="center">
                            {formatDate(transaction.date)}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="primary"
                              component="label"
                              onClick={() =>
                                props.setEditTransaction(transaction)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="warning"
                              component="label"
                              onClick={() => {
                                remove(transaction._id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    {/* } */}
                  })}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

// function createData(name, calories, fat, carbs, protein) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // This method is created for cross-browser compatibility, if you don't
// // need to support IE11, you can use Array.prototype.sort() directly
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Dessert (100g serving)',
//   },
//   {
//     id: 'calories',
//     numeric: true,
//     disablePadding: false,
//     label: 'Calories',
//   },
//   {
//     id: 'fat',
//     numeric: true,
//     disablePadding: false,
//     label: 'Fat (g)',
//   },
//   {
//     id: 'carbs',
//     numeric: true,
//     disablePadding: false,
//     label: 'Carbs (g)',
//   },
//   {
//     id: 'protein',
//     numeric: true,
//     disablePadding: false,
//     label: 'Protein (g)',
//   },
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function EnhancedTable() {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('calories');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.name);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {/* if you don't need to support IE11, you can replace the `stableSort` call with:
//                  rows.sort(getComparator(order, orderBy)).slice() */}
//               {stableSort(rows, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.name)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.name}
//                       selected={isItemSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           inputProps={{
//                             'aria-labelledby': labelId,
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell
//                         component="th"
//                         id={labelId}
//                         scope="row"
//                         padding="none"
//                       >
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="right">{row.calories}</TableCell>
//                       <TableCell align="right">{row.fat}</TableCell>
//                       <TableCell align="right">{row.carbs}</TableCell>
//                       <TableCell align="right">{row.protein}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//     </Box>
//   );
// }
