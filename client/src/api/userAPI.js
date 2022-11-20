import Cookie from "js-cookie";

export async function fetchUser() {
  const token = Cookie.get("token");
  const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
