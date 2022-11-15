import { useEffect, useState, useRef } from "react";
import {
  TransactionForm,
  TransactionsTable,
  TransactionsBarGraph,
  TransactionsPieChart,
} from "../features/transactions";
import { Container } from "@mui/system";
import { transactionsAPI } from "../api";
import { fetchTransactions } from "../api/transactionsAPI";
import { useSelector } from "react-redux";
import { Fragment } from "react";

export default function Home() {
  const user = useSelector((state) => state.authReducer.user);
  const [filter, setFilter] = useState({
    startDate: null,
    endDate: null,
    category: null,
  });
  const [transactionsData, setTransactionsData] = useState([]);
  const [updateTransactions, setUpdateTransactions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTransaction, setEditTransaction] = useState({});
  // const myRef=[];
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await transactionsAPI.getTransactionsByMonth(
        filter.startDate,
        filter.endDate,
        filter.category
      );
      if (res.ok) {
        const { data } = await res.json();
        setTransactionsData(data);
      }
      setLoading(false);
      setUpdateTransactions(false);
    };
    fetchData();
    console.log("use effect");
  }, [filter, updateTransactions]);

  // const [transactionsByCategory, setTransactionsByCategory] = useState([]);


  // async function fetchTransactions(
  //   startDate=null,
  //   endDate=null,
  //   category = null
  // ) {
  //   // console.log(filter)
  //   // setLoading(true);
  //   // await getTransactionsByMonth(startDate, endDate, category);
  //   // // await getTransactionsByCategory(startDate, endDate);
  //   // setLoading(false);
  // }

  // async function getTransactionsByMonth(
  //   startDate=null,
  //   endDate=null,
  //   category = null
  // ) {
  //   console.log("in call toa pi funct")
  //   console.log(startDate)
  //   const res = await transactionsAPI.getTransactionsByMonth(
  //     startDate,
  //     endDate,
  //     category
  //   );
  //   if (res.ok) {
  //     const { data } = await res.json();
  //     setTransactionsData(data);
  //   }
  // }

  // async function getTransactionsByCategory(startDate = null, endDate = null) {
  //   const res = await transactionsAPI.getTransactionsByCategory(
  //     startDate,
  //     endDate
  //   );
  //   if (res.ok) {
  //     let { transactions } = await res.json();
  //     const data = transactions.map((category) => {
  //       category.name = categoryNameById(category._id);
  //       return category;
  //     });
  //     setTransactionsByCategory(data);
  //   }
  // }

  function getCategoryById(id) {
    //compare id with those in user's categories list. If match, return name, else 'NA'
    const category = user.categories.find((category) => category._id === id);
    return category ? {label: category.label, iconName: category.icon.name} : {label: "Other", iconName: "other"};
  }

  // function categoryIconById(id) {
  //   //compare id with those in user's categories list. If match, return name, else 'NA'
  //   const category = user.categories.find((category) => category._id === id);
  //   return category ? category.icon.name : "Other";
  // }

  // // const myRef = useRef(null);
  // function scrollToRef(target) {
  //   //jump to component
  //   switch(target){
  //     case "charts":
  //       return chartRef.current.scrollIntoView; 
  //     case "form":
  //       return formRef.current.scrollIntoView;  
  //   }
  // }

  // function scrollToRef(target){
  //   let idx;
  //   if(target === "form"){
  //     idx=0;  
  //   } else if(target === "chart"){
  //     idx=1;
  //   }
  //   myRef[idx].scrollIntoView();
  // }

  return (
    <Container>
      <TransactionForm
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
        setUpdateTransactions={setUpdateTransactions}
        getCategoryById={getCategoryById}
      />
      <br />
      <TransactionsTable
        loading={loading}
        transactionsData={transactionsData}
        filter={filter}
        setFilter={setFilter}
        getCategoryById={getCategoryById}
        setUpdateTransactions={setUpdateTransactions}
        setEditTransaction={setEditTransaction}
        // scrollToRef={scrollToRef}
      />
      <br />
      <br />
      <div >
        {transactionsData.length > 0 && (
          <Fragment>
            <TransactionsBarGraph
              data={transactionsData}
            ></TransactionsBarGraph>
            {/* <TransactionsPieChart
              data={transactionsByCategory}
              categoryNameById={categoryNameById}
            ></TransactionsPieChart> */}
          </Fragment>
        )}
      </div>
    </Container>
  );
}
