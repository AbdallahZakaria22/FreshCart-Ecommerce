import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setToken(localStorage.getItem("Token"));
      const decoded = jwtDecode(localStorage.getItem("Token"));
      localStorage.setItem("userid", decoded.id);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
