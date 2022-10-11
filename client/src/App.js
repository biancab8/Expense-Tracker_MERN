import { useEffect, useState } from "react";
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionsTable from "./components/TransactionsTable";
import { Container } from "@mui/system";

const initialForm = {
  amount: 0,
  description: "",
  date: "",
};

function App() {
  // const [form, setForm] = useState(initialForm);

  //for the transactions to be rendered on the page
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/transactions", {
      method: "GET",
    });
    //read received data
    const { data } = await res.json(); //parse entire json, returns a promise
    setTransactions(data);
  }

  return (
    <div>
      <AppBar />
      <Container>
        <TransactionForm fetchTransactions={fetchTransactions} />
        <br />
        <TransactionsTable transactions={transactions} 
        fetchTransactions={fetchTransactions}/>
      </Container>
    </div>
  );
}

export default App;
