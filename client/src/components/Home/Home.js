import React from 'react'
import { Navigate } from 'react-router-dom';
import * as api from '../../api'
import { useGlobalContext } from '../../context/App';

export default function Home() {
  const { viewModal, setUsername, setIsLogined, isLogined } = useGlobalContext();
  const logout = async () => {
    try {
      const { data } = await api.userLogout();
      setIsLogined(false);
      setUsername(undefined);
      viewModal("Sucessfully Logout!!")
    } catch (error) {
      viewModal("Error")
      console.log(error.message);
    }
  }
  return (
    isLogined ? <div>
      <h1>Home</h1>
      <button onClick={logout}>logout</button>
    </div > : <Navigate to="/login" />
  )
}
