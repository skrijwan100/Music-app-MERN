import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";


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
    // const url1=`${import.meta.env.VITE_URL_BACKEND}/allsong/manupulatesong/updatesong/${id}`
    const responce= await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      credentials:"include"
    })
    const data = await responce.json()
    console.log(data.message)
    // const responce1= await fetch(url1,{
    //   method:"PUT",
    //   headers:{
    //     "Content-Type": "application/json",
    //     "admin-token":"ubfyguybffuihfifguihugijfoigwufewffu"
    //   },
    //   body:JSON.stringify({isfavornot:true})
    // })
    // const data1= await responce1.json()
    // console.log(data1)
    showAlert("Add as a favsong", "success")


  }
  const handdlete=async(e,id)=>{
    e.preventDefault();
    const url=`${import.meta.env.VITE_URL_BACKEND}/songtrack/favsong/deltefavsong/${id}`
    const url1=`${import.meta.env.VITE_URL_BACKEND}/allsong/manupulatesong/updatesong/${id}`
    const responce= await fetch(url,{
      method:"DELETE",
      headers:{
         "Content-Type": "application/json"
      },
      credentials:"include"
    })
    const data= await responce.json()
    console.log(data)
    const responce1= await fetch(url1,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        "admin-token":"ubfyguybffuihfifguihugijfoigwufewffu"
      },
      body:JSON.stringify({isfavornot:false})
    })
    const data1= await responce1.json()
    console.log(data1)

    
  }
  return (
    <div style={{marginTop:"20px"}}>
     {song && song.map((data)=>(
      <div className="allsong" key={data._id}>
        <h1>Song title : {data.stitle}</h1>
        <h2>Artist name: {data.artist}</h2>
        {console.log(data.isfavornot)}
        <button onClick={(e)=>handleclick(e,data._id)}><FcLikePlaceholder /></button>
      </div>
     ))}
       
    </div>
  )
}
