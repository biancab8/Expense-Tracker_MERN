export async function login(data) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
  return res;
}

export async function register(data) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
  return res;
}
