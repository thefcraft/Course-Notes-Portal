import { create } from "zustand";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";
import { auth as firebaseAuth, microsoftProvider } from '@/store/firebase'
import { signInWithPopup } from 'firebase/auth'
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

const AUTH_API_URL = `${API_URL}/auth`

axios.defaults.withCredentials = true;

  
interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	error: string | null;
	isLoading: boolean;
	isCheckingAuth: boolean;
	isCheckingFirebaseAuth: boolean;
  
	signinMicrosoft: (token: string) => Promise<void>;
	signin: () => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	// setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	isCheckingFirebaseAuth: false,
	// setLoading: (value: boolean) => {
	// 	set({ isLoading: value});
	// },
	signinMicrosoft: async (token: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API_URL}/signinMicrosoft`, {
				token: token
			});
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error: any) {
			set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
			try {await firebaseAuth.signOut()}
			catch (error: any) {}
			throw error;
		}
	},
	signin: async () => {
		set({ isLoading: true, error: null });
		try{
			const result = await signInWithPopup(firebaseAuth, microsoftProvider);
			console.log(result.operationType);
			set({ isLoading: true, isCheckingFirebaseAuth: true });
		} catch (error: any){
			set({ error: error.code || "Error signing up", isLoading: false });
			toast.error(error.code || "Error signing up")
		}
	},
	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await firebaseAuth.signOut();
			await axios.post(`${AUTH_API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false});
		} catch (error: any) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${AUTH_API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	}
}));