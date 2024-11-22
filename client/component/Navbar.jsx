import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';

export default function Navbar({ startLoader }) {
  const loction = useLocation()
 const userclick=async(e)=>{
  e.preventDefault()
 const url= `${import.meta.env.VITE_URL_BACKEND}/nweuser/userauth/getuser`
  const responce = await fetch(url,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
    },
    credentials:"include"
  })
  const data= await responce.json();
  console.log(data)
  
 }
  const isAuthenticated = Cookies.get('auth-token');
  console.log(isAuthenticated)
  // useEffect(()=>{

  //   const url=`${import.meta.env.VITE_URL_BACKEND}/nweuser/userauth/getuser`
  //   const responce= 

  // },[])
  const handclick = () => {
    startLoader()
  }
  return (
    <div style={{ display: "flex", boxShadow: "1px 1px 15px 5px #4f4f4f9c", justifyContent: "space-between" }}>
      <ul style={{ display: "flex", gap: "40px", listStyle: "none" }}>
        <Link to="/" style={{ textDecoration: "none" }} className={loction.pathname === "/" ? "navactive" : ""} onClick={loction.pathname === "/" ? null : handclick}><li className={`li-hover`}>Home</li></Link>
        <Link to="/about" style={{ textDecoration: "none" }} className={loction.pathname === "/about" ? "navactive" : ""} onClick={loction.pathname === "/about" ? null : handclick}><li className='li-hover' >About</li></Link>
      </ul>
     { !isAuthenticated?<div className="user-btn" style={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: "20px" }}>
        <Link onClick={loction.pathname === "/login" ? null : handclick} to="/login"> <button style={{ height: "40px", width: "80px", backgroundColor: "blue", borderRadius: "11px", cursor: "pointer", color: "white", outline: "none", border: "none" }} className='login-singup-btn'>Login</button></Link>
        <Link onClick={loction.pathname === "/singup" ? null : handclick} to="/singup"> <button style={{ height: "40px", width: "80px", marginRight: "10px", backgroundColor: "blue", borderRadius: "11px", cursor: "pointer", color: "white", outline: "none", border: "none" }} className='login-singup-btn'>Singup</button></Link></div>:<div><button onClick={userclick}>user</button></div>}
      
    </div>
  )
}
