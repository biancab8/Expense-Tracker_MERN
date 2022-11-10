import { useEffect, useState, useRef } from "react";
import {TransactionForm, TransactionsTable, TransactionChart} from "../features/transactions";
import { Container } from "@mui/system";
import Cookie from "js-cookie";


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

  const myRef=useRef(null)
  function goToChart(){
    myRef.current.scrollIntoView();
  }

  return (
      <Container > 
      {/* sx={{minWidth: "750px"}} */}
        <TransactionForm fetchTransactions={fetchTransactions} 
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <br />
        <TransactionsTable transactionsData={transactionsData} 
        fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
          goToChart={goToChart}
        />
         <br />
         <br />
<div ref={myRef}>
        <TransactionChart data={transactionsData}>
        </TransactionChart>

</div>
      </Container>
  );
}

export default Home;