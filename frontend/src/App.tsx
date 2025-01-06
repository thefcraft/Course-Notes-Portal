import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { VerifyAccountHeaderBar } from "@/components/header-notifications";
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
import ViewCourse from "@/components/viewCourse";
import AllCourses from "@/components/allCourses";
import AddCourse from "@/components/addCourse";
import AllUsers from "@/components/AllUsers";
import { AdminRoute } from "@/pages/auth/utils.auth";
import { Loading } from "@/components/utils";
import ProfilePage from "@/components/profile";
import LandingPage from "@/pages/landing";

function App() {
  	const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore(); 
  	useEffect(()=>{
  	  checkAuth();
  	}, [checkAuth]);

  	console.log("isAuthenticated", isAuthenticated);
  	console.log("user", user);
  	console.log("isCheckingAuth", isCheckingAuth);	

	if (isCheckingAuth) return <Loading/>

	return (
	<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		{
			user && !user.isVerified && <VerifyAccountHeaderBar user={user}/>	
		}
		<div className="flex min-h-svh w-full">  {/* SIDEBAR IS REMOVED (Maybe add back in future) */} {/* <SidebarProvider> */}
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
      		 		  			<Route path="/verify-email" element={<EmailVerificationPage user={user}/>}/>
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
					{/* <AppSidebar user={user} /> */}
					<div className="min-h-screen w-full z-0">
						<Header user={user}/>
						<main className="overflow-x-hidden bg-background min-h-full h-full -mt-16 w-full pt-16">
							<Routes>
								<Route path="/" element={<RedirectAuthenticatedUser>
														<LandingPage/>
			 										</RedirectAuthenticatedUser>} />
								<Route path="/dashboard" element={
									<ProtectedRoute>
										<Dashboard user={user} />
									</ProtectedRoute>} />
			 		  			{/* <Route path="/upload" element={<NotesUpload />}/> */}
			 		  			<Route path="/view/:id" element={<ProtectedRoute verified>
															<ViewNotes />
														</ProtectedRoute>}/>
			 		  			<Route path="/view-course/:id" element={<ProtectedRoute verified>
															<ViewCourse user={user} />
														</ProtectedRoute>}/>
			 		  			<Route path="/all-courses" element={<ProtectedRoute verified>
															<AllCourses user={user} />
														</ProtectedRoute>}/>
								<Route path="/profile" element={<ProtectedRoute >
															<ProfilePage user={user} />
														</ProtectedRoute>}/>
			 		  			{/* <Route path="/add-course" element={<AddCourse />}/> */}
			 		  			<Route path="/users" element={<AdminRoute>
															<AllUsers  />
														</AdminRoute>}/>
								{/* 404 */}
								<Route path="/*" element={<Error404Page/>}/>
							</Routes>
						</main>
					</div>
				</>}/>

        	</Routes>
			<Toaster/>
		</div> {/* </SidebarProvider> */}
	</ThemeProvider>
	);
}

export default App;
