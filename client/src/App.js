import {useState} from "react";

function App() {

  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: ""
  });

  async function handleSubmit(event) {
    event.preventDefault(); 
    const res = await fetch("http://localhost:4000/transactions", {
      method: "POST",
      body: form,
    })
    console.log(res);

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
    </div>
  );
}

export default App;
