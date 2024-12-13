import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ReactNode } from "react";
import { authPrefix } from "./constants.auth";

// protect routes that require authentication
export const ProtectedRoute = ({ children }: {children: ReactNode}) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated || !user) {
		return <Navigate to={`${authPrefix}/login`} replace />;
	}

	if (!user.isVerified) {
		const encodedEmail = encodeURIComponent(user.email);
		return <Navigate to={`${authPrefix}/verify-email?email=${encodedEmail}`} replace />;
	}

	return children;
};
// redirect authenticated users to the home page
export const RedirectAuthenticatedUser = ({ children }: {children: ReactNode}) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user && user.isVerified) {
		return <Navigate to='/' replace />;
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

