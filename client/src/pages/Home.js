import { useEffect, useState, useRef } from "react";
import {TransactionForm, TransactionsTable, TransactionChart} from "../features/transactions";
import { Container } from "@mui/system";
import { transactionsAPI } from "../api";

function Home() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [editTransaction, setEditTransaction] = useState({}); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions(startDate=null, endDate=null, category=null){
    setLoading(true);
    const res = await transactionsAPI.fetchTransactions(startDate, endDate, category);
    if(res.ok){
      const { data } = await res.json(); 
      setTransactionsData(data);
    }
    setLoading(false);
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