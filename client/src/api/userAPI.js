import Cookie from "js-cookie";

const token = Cookie.get("token");

export async function fetchUser(){
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res; 
}