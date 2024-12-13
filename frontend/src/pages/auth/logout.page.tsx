import { useAuthStore } from "@/store/authStore"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authPrefix } from "./constants.auth";
export default function LogoutPage() {
    const {logout} = useAuthStore(); 
    const navigate = useNavigate();
    useEffect(()=>{
      try{
        logout();
        navigate(`${authPrefix}/login`);
      }catch(e) {
        console.log(e);
      }
  	}, []);
    return <>Logout...</>
}