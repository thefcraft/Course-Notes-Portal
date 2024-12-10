import { useAuthStore } from "@/store/authStore"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
    const {logout} = useAuthStore(); 
    const navigate = useNavigate();
    useEffect(()=>{
      try{
        logout();
        navigate(`/login`);
      }catch(e) {
        console.log(e);
      }
  	}, []);
    return <>Logout...</>
}