import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
export default function Allfavsong({showAlert}) {
    const naviget=useNavigate()
    const [favsong,setfavsong]=useState([])
    const [deletebtn,setdeletebtn]=useState(false)
    const handledelte=async(e,id)=>{
      e.preventDefault();
      const url=`${import.meta.env.VITE_URL_BACKEND}/songtrack/favsong/deltefavsong/${id}`
      const responce= await fetch(url,{
        method:"DELETE",
        headers:{
           "Content-Type": "application/json"
        },
        credentials:"include"
      })
      const data= await responce.json()
      showAlert("Delete song complect", "success")
      naviget("/")
      setTimeout(()=>{
        naviget("/allfavsong")
      },100)
    }
    useEffect(()=>{

     const allfavsong=async()=>{
        const isAuthenticated = Cookies.get('auth-token');
        if(!isAuthenticated){
          showAlert("Login frist","error")
         return naviget("/login")
        }
      const url=`${import.meta.env.VITE_URL_BACKEND}/songtrack/favsong/fecthallfavsong`
      const responce= await fetch(url,{
        method:"GET",
        headers:{
             "Content-Type": "application/json"
        },
        credentials:"include",
      })
      const data = await responce.json()
    //   console.log(data)
      setfavsong(data.message)
    //   console.log(favsong)
     }
     allfavsong();
    },[])
  return (
    <div>

        {favsong && favsong.map((data)=>(
                
            <div key={data._id}>
             <h1>Song name:{data.stitle}</h1>
             <h2>Artist Name:{data.artist}</h2>
             <button onClick={(e)=>handledelte(e,data._id)} style={{display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"10px"}}> <MdDelete style={{height:"30px",width:"30px"}}/> </button>
            </div>
        ))}
      
    </div>
  )
}
