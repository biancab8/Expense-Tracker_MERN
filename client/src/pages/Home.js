import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsTable from "../components/TransactionsTable";
import { Container } from "@mui/system";



function Home() {

  //for the transactions to be rendered on the page
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({}); 

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
      <Container>
        <TransactionForm fetchTransactions={fetchTransactions} 
          editTransaction={editTransaction}
        />
        <br />
        <TransactionsTable transactions={transactions} 
        fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
        />
      </Container>
  );
}

export default Home;