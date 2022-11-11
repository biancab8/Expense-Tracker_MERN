import Cookie from "js-cookie";

const token = Cookie.get("token");

export async function addTransaction(data) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }

export async function updateTransaction(data, id) {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transactions/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  }

export async function deleteTransaction(id){
    const res = await fetch(
    `${process.env.REACT_APP_API_URL}/transactions/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res; 
}

export async function fetchTransactions(startDate=null, endDate=null, category=null) {
    //if start and end dates and/or category are provided, only requests entries within that 
    //time frame from the database
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
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res; 
  }