import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loderanime from "../src/assets/loder.gif"
export default function Login({ showAlert, startLoader }) {
  const naviget = useNavigate()
  const [credential, setcredential] = useState({ useremail: "", userpassword: "" })
  const [loginbtn, setloginbtn] = useState(false)
  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }
  const handleclick = (e) => {
    startLoader()
  }
  const submitform = async (e) => {
    e.preventDefault()
    setloginbtn(true)

    const url = `${import.meta.env.VITE_URL_BACKEND}/nweuser/userauth/login`
    const responce = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credential.useremail, password: credential.userpassword }),
      credentials: "include"
    })
    const data = await responce.json()
    console.log(data.error)
    if (data.error) {
      setloginbtn(false)
      return showAlert("Invalid Credential", "error")
    }
    setloginbtn(false)
    showAlert("Successfully Login", "success")
    naviget("/")

  }
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <div className="container">
        <div className="form_area">
          <p className="title">LOGIN</p>
          <form action="" onSubmit={submitform}>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Email</label>
              <input placeholder="Enter your email" id="email" className="form_style" onChange={onchange} value={setcredential.useremail} type="email" name='useremail' required />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="password">Password</label>
              <input placeholder="Enter your password" id="password" className="form_style" onChange={onchange} value={setcredential.userpassword} type="password" name='userpassword' required />

            </div>
            <div>
              <button className="btn-singup">{loginbtn ? <img src={loderanime} alt="" style={{ height: "53px" }} /> : "LOGIN"}</button>
              <p>Have't any Account? <Link className="link" onClick={handleclick} to="/singup">Singup Here!</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
