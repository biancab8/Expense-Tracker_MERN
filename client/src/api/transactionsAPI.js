import Cookie from "js-cookie";

export async function addTransaction(data) {
  const token = Cookie.get("token");
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
  const token = Cookie.get("token");
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
  const token = Cookie.get("token");
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

export async function getTransactionsByMonth(startDate=null, endDate=null, category=null) {
  const token = Cookie.get("token");
    //if start and end dates and/or category are provided, only requests entries within that 
    //time frame from the database
    // console.log("in trans api")
    let apiUrl = `${process.env.REACT_APP_API_URL}/transactions`;
    // console.log(startDate)
    // console.log(endDate)
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
    // console.log(apiUrl)
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res; 
  }



  
  export async function getTransactionsByCategory(startDate=null, endDate=null,){
    const token = Cookie.get("token");
    let apiUrl = `${process.env.REACT_APP_API_URL}/transactions`;
    if(startDate && endDate){
      apiUrl= apiUrl+`?startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format("YYYY-MM-DD")}`
    }
    const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions/categories`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res; 
  }