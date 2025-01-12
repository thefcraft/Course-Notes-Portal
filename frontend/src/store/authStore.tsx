import { create } from "zustand";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";
import { auth as firebaseAuth } from '@/store/firebase'

const AUTH_API_URL = `${API_URL}/auth`

axios.defaults.withCredentials = true;

  
interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	error: string | null;
	isLoading: boolean;
	isCheckingAuth: boolean;
	message: string | null;
  
	signup: (email: string, password: string, name: string) => Promise<void>;
	signinMicrosoft: (token: string) => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	verifyEmail: (email: string, code: string) => Promise<void>;
	resendOtp: (email: string) => Promise<void>;
	checkAuth: () => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	resetPassword: (token: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	signinMicrosoft: async (token: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API_URL}/signinMicrosoft`, {
				token: token
			});
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error: any) {
			set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	signup: async (email: string, password: string, name: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API_URL}/signup`, { email, password, name });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error: any) {
			set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	login: async (email: string, password: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
			
		} catch (error: any) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
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
	verifyEmail: async (email: string, code: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API_URL}/verify-email`, { email, code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error: any) {
			set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
	resendOtp: async (email: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API_URL}/resend-otp`, { email });
			set({ user: response.data.user, isLoading: false });
			return response.data;
		} catch (error: any) {
			set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
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
	},
	forgotPassword: async (email: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error: any) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token: string, password: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error: any) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
}));