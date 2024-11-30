import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function Home({showAlert}) {
  const [song,setsong]=useState([])
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
  return (
    <div style={{marginTop:"20px"}}>
     {song && song.map((data)=>(
      <div className="allsong" key={data._id}>
        <h1>Song title : {data.stitle}</h1>
        <h2>Artist name: {data.artist}</h2>
        <button onClick={(e)=>handleclick(e,data._id)}>fav button</button>
      </div>
     ))}
       
    </div>
  )
}
