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
  const [transactionsData, setTransactionsData] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactionsByCategory, setTransactionsByCategory] = useState([]);

  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions(
    startDate=null, 
    endDate=null,
    category = null
  ) {
    setLoading(true);
    await getTransactionsByMonth(startDate, endDate, category);
    await getTransactionsByCategory(startDate, endDate);
    setLoading(false);
  }

  async function getTransactionsByMonth(
    startDate=null, 
    endDate=null,
    category = null
  ) {
    console.log("in call toa pi funct")
    console.log(startDate)
    const res = await transactionsAPI.getTransactionsByMonth(
      startDate,
      endDate,
      category
    );
    if (res.ok) {
      const { data } = await res.json();
      setTransactionsData(data);
    }
  }

  async function getTransactionsByCategory(startDate = null, endDate = null) {
    const res = await transactionsAPI.getTransactionsByCategory(
      startDate,
      endDate
    );
    if (res.ok) {
      let { transactions } = await res.json();
      const data = transactions.map((category) => {
        category.name = categoryNameById(category._id);
        return category;
      });
      setTransactionsByCategory(data);
    }
  }

  function categoryNameById(id) {
    //compare id with those in user's categories list. If match, return name, else 'NA'
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "Other";
  }

  function categoryIconById(id) {
    //compare id with those in user's categories list. If match, return name, else 'NA'
    const category = user.categories.find((category) => category._id === id);
    return category ? category.icon.name : "Other";
  }

  const myRef = useRef(null);
  function goToChart() {
    //jump to chart component
    myRef.current.scrollIntoView();
  }

  return (
    <Container>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <br />
      <TransactionsTable
        loading={loading}
        transactionsData={transactionsData}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
        goToChart={goToChart}
        categoryNameById={categoryNameById}
        categoryIconById={categoryIconById}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <br />
      <br />
      <div ref={myRef}>
        {transactionsData.length > 0 && (
          <Fragment>
            <TransactionsBarGraph
              data={transactionsData}
            ></TransactionsBarGraph>
            <TransactionsPieChart
              data={transactionsByCategory}
              categoryNameById={categoryNameById}
            ></TransactionsPieChart>
          </Fragment>
        )}
      </div>
    </Container>
  );
}
