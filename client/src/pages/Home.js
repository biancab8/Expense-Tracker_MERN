import { useEffect, useState, useRef, Fragment } from "react";
import {
  TransactionForm,
  TransactionsTable,
  TransactionsBarGraph,
  TransactionsPieChart,
} from "../features/transactions";
import { Container } from "@mui/system";
import { transactionsAPI } from "../api";
import { useSelector } from "react-redux";
import "../style/index.css";

export default function Home() {
  const user = useSelector((state) => state.authReducer.user);
  const [filter, setFilter] = useState({
    startDate: null,
    endDate: null,
    category: null,
  });
  const [transactionsData, setTransactionsData] = useState([]);
  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const [updateTransactions, setUpdateTransactions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTransaction, setEditTransaction] = useState({});
  const chartRef = useRef();

  useEffect(() => {
    //get all transactions
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
      setUpdateTransactions(false);
      setLoading(false);
    };
    //get expense totals per month
    const getTotalsByCategory = async () => {
      const res = await transactionsAPI.getTotalExpensesByCategory(
        filter.startDate,
        filter.endDate
      );
      if (res.ok) {
        let { categoryTotals } = await res.json();
        categoryTotals = categoryTotals.map((category) => {
          category.name = getCategoryById(category._id).label;
          return category;
        });
        setExpensesByCategory(categoryTotals);
      }
    };
    //call functions
    fetchData();
    getTotalsByCategory();
    console.log("use effect");
  }, [filter, updateTransactions]);

  function scrollToTarget(target) {
    if (target === "chart") {
      chartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getCategoryById(id) {
    //compare id with those in user's categories list. If match, return name, else 'NA'
    const category = user.categories.find((category) => category._id === id);
    return category
      ? { label: category.label, iconName: category.icon.name }
      : { label: "Other", iconName: "other" };
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ width: { xxs: "98%", md: "90%" }, paddingBottom: "80px" }}
    >
      {console.log(user)}
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
        scrollToTarget={scrollToTarget}
      />
      <br />
      <br />
      <div ref={chartRef}>
        {transactionsData.length > 0 && (
          <Fragment>
            <TransactionsBarGraph
              data={transactionsData}
            ></TransactionsBarGraph>
            {filter.category ? null : (
              <TransactionsPieChart
                data={expensesByCategory}
              ></TransactionsPieChart>
            )}
          </Fragment>
        )}
      </div>
    </Container>
  );
}
