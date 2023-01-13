import { useEffect, useState } from "react"

const useToken = (user) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    const email = user?.user?.email;
    if (email) {
      fetch(`https://autoparts-vsj8.onrender.com/getToken`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })
        .then(res => res.json())
        .then(data => {
          const accessToken = data.token;
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);
        })
    }

  }, [user]);
  return [token];
}

export default useToken;