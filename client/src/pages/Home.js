import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsTable from "../components/TransactionsTable";
import { Container } from "@mui/system";
import Cookie from "js-cookie";
import SortSelect from "../components/CategoryFilter";


function Home() {

  //for the transactions to be rendered on the page
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({}); 


  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions(startDate=null, endDate=null) {
    // start and end date are optional. If provided, only ask back end for transactions 
    // between those date 
    if(startDate){
      console.log("dude there's a start date")
    }
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
      <Container >
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