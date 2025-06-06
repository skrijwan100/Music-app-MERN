import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loderanime from "../src/assets/loder.gif"

export default function Singup({showAlert,startLoader}) {
  const [credential, setcredential] = useState({ username: "", useremail: "", userpassword: "" })
  const [loginbtn,setloginbtn]= useState(false)
  const naviget= useNavigate()
  const googleauth=()=>{
    window.open(
      `${import.meta.env.VITE_URL_BACKEND}/auth/google/callback`,
      "_self"
    )

  }
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })

  }
  const handleclick=(e)=>{

    startLoader()
  }
  const submitform=async(e)=>{
    e.preventDefault()
    setloginbtn(true)
    const url= `${import.meta.env.VITE_URL_BACKEND}/nweuser/userauth/register`
    const responce= await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name:credential.username,email:credential.useremail,password:credential.userpassword})
    })
    const data= await responce.json()
    if(data.error="The Email is aleady exites"){
      setloginbtn(false)
       return showAlert("The Email is aleady exites","error")

    }
    showAlert("Successfully register","success")
    naviget("/login")
    
    
    
    
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <div className="container">
        <div className="form_area">
          <p className="title">SIGN UP</p>
          <form action="" onSubmit={submitform}>
            <div className="form_group">
              <label className="sub_title" htmlFor="name">Name</label>
              <input placeholder="Enter your full name" className="form_style" onChange={onchange} value={setcredential.username} type="text" name='username' required />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Email</label>
              <input placeholder="Enter your email" id="email" className="form_style" onChange={onchange} value={setcredential.useremail} type="email" name='useremail' required />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="password">Password</label>
              <input placeholder="Enter your password" id="password" className="form_style" onChange={onchange} value={setcredential.userpassword} type="password" name='userpassword' required />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="password"> Renter Password</label>
              <input placeholder="Renter  password" id="repassword" className="form_style" type="password" required />
            </div>
            <div>
              <button className="btn-singup">{loginbtn?<img src={loderanime} alt="" style={{height:"53px"}} />:"SIGN UP"}</button>
              <h3 onClick={googleauth}>Login with google</h3>
              <p>Have an Account? <Link onClick={handleclick} className="link" to="/login">Login Here!</Link></p></div></form></div></div>
    </div>
  )
}

