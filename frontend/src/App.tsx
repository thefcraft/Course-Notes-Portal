import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
// import Navbar from "@/components/navbar";
// import Sidebar from "@/components/sidebar";
import {LoginPage, SignUpPage, EmailVerificationPage, LogoutPage, ForgotPasswordPage, ResetPasswordPage, ProtectedRoute, RedirectAuthenticatedUser} from "@/pages/auth";
import NotesUpload from "@/components/upload";
import ViewNotes from "@/components/viewNotes";
import Dashboard from "@/pages/dashboard";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider"
import { Error404Page, Error500Page, ErrorBackendPage } from "@/pages/error";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import ViewCourse from "./components/viewCourse";
import AllCourses from "./components/allCourses";
import AddCourse from "./components/addCourse";

function App() {
  	const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore(); 
  	useEffect(()=>{
  	  checkAuth();
  	}, [checkAuth]);
  	console.log("isAuthenticated", isAuthenticated);
  	console.log("user", user);
  	console.log("isCheckingAuth", isCheckingAuth);	
	return (
	<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<SidebarProvider>
        	<Routes>
				{/* AUTH Pages */}
				<Route path="/auth/*" element={
					<div className="min-h-screen w-full z-0">
						<Header user={user}/>
						<main className="overflow-x-hidden overflow-y-auto bg-background min-h-full h-full -mt-16 pt-16 w-full">
							<Routes>
								<Route path="/signup" element={<RedirectAuthenticatedUser>
			 											<SignUpPage />
			 										</RedirectAuthenticatedUser>}/>
      		 		  			<Route path="/login" element={<RedirectAuthenticatedUser>
			 											<LoginPage />
			 										</RedirectAuthenticatedUser>}/>
								<Route path="/logout" element={<ProtectedRoute>
																	<LogoutPage />
																</ProtectedRoute>}/>
      		 		  			<Route path="/verify-email" element={<EmailVerificationPage/>}/>
								<Route path="/forgot-password" element={<RedirectAuthenticatedUser>
			 											<ForgotPasswordPage />
			 										</RedirectAuthenticatedUser>}/>
								<Route path="/reset-password/" element={<Navigate to='/forgot-password' replace />}/>
								<Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
			 											<ResetPasswordPage />
			 										</RedirectAuthenticatedUser>}/>
								{/* 404 */}
								<Route path="/*" element={<Error404Page/>}/>
							</Routes>
						</main>	
					</div>
				}/>
      		 	{/* Other Pages */}
      		 	<Route path="/*" element={<>
					<AppSidebar />
					<div className="min-h-screen w-full z-0">
						<Header user={user} className="pl-10"/>
						<main className="overflow-x-hidden bg-background min-h-full h-full -mt-16 w-full pt-16">
							<Routes>
								<Route path="/" element={<>Home Page</>} />
								<Route path="/dashboard" element={<Dashboard />} />
			 		  			<Route path="/upload" element={<NotesUpload />}/>
			 		  			<Route path="/view/:id" element={<ViewNotes />}/>
			 		  			<Route path="/view-course/:id" element={<ViewCourse />}/>
			 		  			<Route path="/all-courses" element={<AllCourses />}/>
			 		  			<Route path="/add-course" element={<AddCourse />}/>
								{/* 404 */}
								<Route path="/*" element={<Error404Page/>}/>
							</Routes>
						</main>
					</div>
				</>}/>

        	</Routes>
			<Toaster/>
		</SidebarProvider>
	</ThemeProvider>
	);
}

export default App;
