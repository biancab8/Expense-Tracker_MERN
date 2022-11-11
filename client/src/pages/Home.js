import { useEffect, useState, useRef } from "react";
import {TransactionForm, TransactionsTable, TransactionChart} from "../features/transactions";
import { Container } from "@mui/system";
import Cookie from "js-cookie";


function Home() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [editTransaction, setEditTransaction] = useState({}); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions(startDate=null, endDate=null, category=null) {
    //if start and end dates and/or category are provided, only requests entries within that 
    //time frame from the database
    setLoading(true);
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
    const token = Cookie.get("token");
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(res.ok){
      const { data } = await res.json(); 
      setTransactionsData(data);
      setLoading(false);
    }
  }

  const myRef=useRef(null)
  function goToChart(){
    //jump to chart component
    myRef.current.scrollIntoView();
  }

  return (
      <Container > 
        <TransactionForm fetchTransactions={fetchTransactions} 
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <br />
        <TransactionsTable loading={loading} transactionsData={transactionsData} 
        fetchTransactions={fetchTransactions}
          setEditTransaction={setEditTransaction}
          goToChart={goToChart}
        />
         <br />
         <br />
<div ref={myRef}>
        {transactionsData.length>0&&
        <TransactionChart data={transactionsData}>
        </TransactionChart>
        }
</div>
      </Container>
  );
}

export default Home;