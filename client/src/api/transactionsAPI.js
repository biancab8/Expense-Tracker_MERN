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

export async function updateTransactionsbyCategory(oldId, newId) {
  const token = Cookie.get("token");
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/transactions/byCategory/${oldId}/${newId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
}

export async function deleteTransaction(id) {
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

export async function getTransactionsByMonth(
  startDate = null,
  endDate = null,
  category = null
) {
  const token = Cookie.get("token");
  //if start and end dates and/or category are provided, add those as params to url
  let apiUrl = `${process.env.REACT_APP_API_URL}/transactions`;
  if (startDate && endDate) {
    apiUrl =
      apiUrl +
      `?startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format(
        "YYYY-MM-DD"
      )}`;
  }
  if (category) {
    if (startDate && endDate) {
      apiUrl = apiUrl + `&category=${category}`;
    } else {
      apiUrl = apiUrl + `?category=${category}`;
    }
  }
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export async function getTotalExpensesByCategory(
  startDate = null,
  endDate = null
) {
  //get total expenses per category
  const token = Cookie.get("token");
  let apiUrl = `${process.env.REACT_APP_API_URL}/transactions/categoryTotals`;
  if (startDate && endDate) {
    apiUrl =
      apiUrl +
      `?startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format(
        "YYYY-MM-DD"
      )}`;
  }
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
