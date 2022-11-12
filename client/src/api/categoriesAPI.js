import Cookie from "js-cookie";



export async function addCategory(data) {
  const token = Cookie.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }


 export async function updateCategory(id, newData) {
  const token = Cookie.get("token");
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/categories/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(newData),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  }


  export async function deleteCategory(id){
    const token = Cookie.get("token");
    const res = await fetch(
        `${process.env.REACT_APP_API_URL}/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res; 
  }