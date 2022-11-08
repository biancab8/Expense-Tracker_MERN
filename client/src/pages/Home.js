import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsTable from "../components/TransactionsTable";
import { Container } from "@mui/system";
import Cookie from "js-cookie";
import SortSelect from "../components/CategoryFilter";


function Home() {

  //for the transactions to be rendered on the page
  const [transactionsData, setTransactionsData] = useState([]);
  const [editTransaction, setEditTransaction] = useState({}); 


  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions(startDate=null, endDate=null, category=null) {
    //if start and end dates are provided, only requests entries within that 
    //time frame from the database
    // ///////////////////////////////////////////////////////////
    let apiUrl = `${process.env.REACT_APP_API_URL}/transactions`;
    if(startDate && endDate){
      apiUrl= apiUrl+`?startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format("YYYY-MM-DD")}`
    }
    if(category){
      if(startDate && endDate){
        apiUrl= apiUrl+`&category=${category}`
      } else {
        apiUrl= apiUrl+`?category=${category}`
      }
    }
console.log(apiUrl)
    //////////////////////////////////////////////////////////////
    const token = Cookie.get("token");
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(res.ok){
      //read received data
      const { data } = await res.json(); //parse entire json, returns a promise
      setTransactionsData(data);
    }
  }

  return (
      <Container >
        <TransactionForm fetchTransactions={fetchTransactions} 
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <br />
        <TransactionsTable transactionsData={transactionsData} 
        fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
        />
      </Container>
  );
}

export default Home;