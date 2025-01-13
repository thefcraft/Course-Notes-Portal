import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ReactNode, useEffect, useState } from "react";
import { authPrefix, noBackend } from "./constants.auth";
import toast from "react-hot-toast";
import { Loading } from "@/components/utils";
// protect routes that require authentication
export const ProtectedRoute = ({ children }: {children: ReactNode}) => {
  if (noBackend) return children; // just debug route
	const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isCheckingAuth || !isMounted) return <Loading/>

	if (!isAuthenticated || !user) {
    toast.error("Please Login");
		return <Navigate to={`${authPrefix}/login`} replace />;
	}

	return children;
};
// redirect authenticated users to the home page
export const RedirectAuthenticatedUser = ({ children }: {children: ReactNode}) => {
  if (noBackend) return children; // just debug route
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated) {
		return <Navigate to='/dashboard' replace />;
	}

	return children;
};
export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    console.log("Unauthorized access, redirecting to /all-courses");
    return <Navigate to="/all-courses" replace />;
  }

  console.log("Authorized access, rendering children");
  return children;
};

export const CRRoute = ({  children }: { children: JSX.Element }) => {
  const { user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!user || (user.role !== "admin" && user.role !== "cr") ) {
    return <Navigate to="/all-courses" replace />;
  }
  return children;
};



export const getStrength = (pass: string): {strength: number, label: string} => {
    let strength = 0;
    let label = '';
    
    if (pass.length >= 8) strength++; // greater then 8 characters
    else label = 'Min 8 chars';

    if (pass.match(/[^a-zA-Z\d]/)) strength++; // special chars
    else label = 'Add special char';

    if (pass.match(/\d/)) strength++; // numbers
    else label = 'Add number';

    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++; // lower + upper letters
    else label = 'Use both cases';

    return {strength, label};
};

export const getPasswordStrengthColor = (strength: number) => {
  if (strength === 0) return 'bg-red-500'
  if (strength <= 25) return 'bg-orange-500'
  if (strength <= 50) return 'bg-yellow-500'
  if (strength <= 75) return 'bg-lime-500'
  return 'bg-green-500'
}

