import LoginPage from "@/pages/auth/login.page";
import SignUpPage from "@/pages/auth/signup.page";
import EmailVerificationPage from "@/pages/auth/verify.page";
import LogoutPage from "@/pages/auth/logout.page";
import ForgotPasswordPage from "@/pages/auth/forgot-password.page";
import ResetPasswordPage from "@/pages/auth/reset-password.page";
import { ProtectedRoute, RedirectAuthenticatedUser } from '@/pages/auth/utils.auth'
export {LoginPage, SignUpPage, EmailVerificationPage, LogoutPage, ForgotPasswordPage, ResetPasswordPage, ProtectedRoute, RedirectAuthenticatedUser};
