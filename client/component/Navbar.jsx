import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Navbar({startLoader}) {
    const loction =useLocation()
    const handclick =()=>{
        startLoader()
    }
  return (
    <div style={{display:"flex",boxShadow:"1px 1px 15px 5px #4f4f4f9c",justifyContent:"space-between"}}>
        <ul style={{display:"flex",gap:"40px",listStyle:"none"}}>
           <Link to="/" style={{textDecoration:"none"}} className={loction.pathname==="/"?"navactive":""} onClick={loction.pathname==="/"?null:handclick}><li className={`li-hover`}>Home</li></Link> 
           <Link to="/about" style={{textDecoration:"none"}} className={loction.pathname==="/about"?"navactive":""} onClick={loction.pathname==="/about"?null:handclick}><li className='li-hover' >About</li></Link> 
        </ul>
      <div className="user-btn" style={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:"20px"}}>
        <button style={{height:"40px",width:"80px",backgroundColor:"blue",borderRadius:"11px",cursor:"pointer",color:"white",outline:"none",border:"none"}} className='login-singup-btn'>Login</button>
        <button style={{height:"40px",width:"80px", marginRight:"10px",backgroundColor:"blue",borderRadius:"11px",cursor:"pointer",color:"white",outline:"none",border:"none"}} className='login-singup-btn'>Singup</button>
      </div>
    </div>
  )
}
