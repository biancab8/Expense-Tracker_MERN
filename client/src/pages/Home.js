import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsTable from "../components/TransactionsTable";
import { Container } from "@mui/system";
import Cookie from "js-cookie";


function Home() {

  //for the transactions to be rendered on the page
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({}); 

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookie.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(res.ok){
      //read received data
      const { data } = await res.json(); //parse entire json, returns a promise
      setTransactions(data);
    }
  }

  return (
      <Container>
        <TransactionForm fetchTransactions={fetchTransactions} 
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
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