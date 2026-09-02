import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"


export const useLogin = () => {
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  const {dispatch,user} = useAuthContext()
  const login = async (user) => {
    setError(null)
    const response = await fetch('/user/signin',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })
    const text = await response.text();
    const userResponse = text ? JSON.parse(text) : {};

    if(userResponse.status!="Failed"){
      //save user to local storage
      localStorage.setItem("user",JSON.stringify(userResponse))
      console.log(userResponse)
      //update auth context
      // const data = localStorage.getItem("user")
      // dispatch({type:'login',payload:JSON.parse(data)})
      dispatch({type:'login',payload:userResponse})
      // window.location.reload();
      navigate("/",{replace:true});
    }else{
      alert(`${userResponse.message}`)
      // localStorage.setItem("error",JSON.stringify(data.message))
    }
    
    // if(response.ok){
    //   //save user to local storage
    //   localStorage.setItem("user",JSON.stringify(data))

    //   //update auth context
    //   dispatch({type:'login',payload:data})

    //   window.location.reload();
    //   setError(data.error)
    // }else{
    //   alert(`${data.message}`)
    // }
    //dispatch({type:'login',payload:user})
  }
  return { login,error}

}