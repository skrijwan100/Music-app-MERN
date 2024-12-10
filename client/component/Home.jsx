import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FcLike } from "react-icons/fc";


export default function Home({showAlert,showmodal}) {
  const [song,setsong]=useState([])
  const [pic,setpic]=useState([])
  
  const naviget=useNavigate()
  useEffect(()=>{
    const fecthallsong= async()=>{
      const url= `${import.meta.env.VITE_URL_BACKEND}/allsong/manupulatesong/getallsong`
      const reponce = await fetch(url,{
        method:"GET",
        headers:{
          "Content-Type": "application/json"
        }
      })
     const data= await reponce.json()
    setsong(data.allsong)
     console.log(data.allsong)
    }
 fecthallsong()
  },[0])
  const userdetlis= async(e)=>{
    e.preventDefault();
    const url=`${import.meta.env.VITE_URL_BACKEND}/auth/login/sucesss`
    const reponce= await fetch(url,{
      method:"GET",
      headers:{
        "Content-Type": "application/json"
      },
      credentials:"include"
    })
    const data= await reponce.json()
    console.log(data.user) 
    showmodal(
      data.user.displayName,
      data.user.emails[0].value

    )
    setpic(data.user.photos[0].value)

  }
  const handleclick= async(e,id)=>{
    e.preventDefault();
    const isAuthenticated = Cookies.get('auth-token');
    if(!isAuthenticated){
      showAlert("Login frist","error")
     return naviget("/login")
    }
    const url= `${import.meta.env.VITE_URL_BACKEND}/songtrack/favsong/addfavsong/${id}`
    
    const responce= await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      credentials:"include"
    })
    const data = await responce.json()
    console.log(data.message)
    showAlert("Add as a favsong", "success")
  }
  const handlelogout= async(e)=>{
    e.preventDefault();
    const url = `${import.meta.env.VITE_URL_BACKEND}/auth/logout`
    const responce= await fetch(url,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      },
    })
    const data= await responce.json()
    console.log(data)
    naviget("/")

  }
  
  return (
    <div style={{marginTop:"20px"}}>
     {song && song.map((data)=>(
      <div className="allsong" key={data._id}>
        <h1>Song title : {data.stitle}</h1>
        <h2>Artist name: {data.artist}</h2>
        <button onClick={(e)=>handleclick(e,data._id)}><FcLike /></button>
      </div>
     ))}
     <div style={{marginTop:"20px"}}>

       <button style={{marginRight:"10px"}} onClick={handlelogout}>LOGOUT</button>
       <button onClick={userdetlis}>USER OF GOOGLE LOGIN</button>
     </div>
     <div style={{marginTop:"20px"}}>

       <img  style={{borderRadius:"20px"}} src={pic} alt="" />
     </div>

    </div>
  )
}
