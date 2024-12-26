import React from 'react'
import { Navigate } from 'react-router-dom' 

export default function ProtectedAuth(props) {
  if (localStorage.getItem("Token")) {
    return <Navigate to="/FreshCart-Ecommerce/" />;
  } else {
    return props.children;
  }
}
