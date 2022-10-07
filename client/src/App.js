import {useEffect, useState} from "react";

function App() {

  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: ""
  });

  //for the transactions to be rendered on the page
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions(){
    const res = await fetch("http://localhost:4000/transactions", {
      method: "GET", 
    })
    //read received data 
    const {data} = await res.json(); //parse entire json, returns a promise
    setTransactions(data);
    console.log(data);
  }

  async function handleSubmit(event) {
    event.preventDefault(); 
    const res = await fetch("http://localhost:4000/transactions", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json"
      }
    }) 
    //if receive response
    //fetch transactions again so that can update rendered page with new ones
    if(res.ok){
      fetchTransactions();
    }
    
  }

  function handleInput(event){
    setForm({...form, [event.target.name]: event.target.value});
  }


  return (
    <div >
      <form onSubmit={handleSubmit} >
        <input type="number" onChange={handleInput} value={form.amount} name="amount" placeholder="Enter a transaction amount"/>
        <input type="text" onChange={handleInput} value={form.description} name="description" placeholder="Enter transaction details"/>
        <input type="date" onChange={handleInput} value={form.date} name="date"/>
        <button type="submit">Submit</button>
      </form>

      <br/>
      <section>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction._id}>
                  <td>{transaction.amount}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.date}</td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
