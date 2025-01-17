"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Share2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";
import { Icons } from "@/components/icons";

import { auth as firebaseAuth } from '@/store/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Error500Page } from "../error";

export default function SignInPage() {
  const { error, isLoading, isAuthenticated, signin, signinMicrosoft, isCheckingFirebaseAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
		if (!isCheckingFirebaseAuth) return;
		onAuthStateChanged(firebaseAuth, (userCred) => {
		  if (userCred) {
			console.log(userCred);
			userCred.getIdToken().then(async (token) => {
			  console.log(token);
			  await signinMicrosoft(token);
        if (isAuthenticated){
          navigate('/dashboard');
        }
			});
		  }
		});
	}, [isCheckingFirebaseAuth]);

  if(error) {
    return <Error500Page code={911} title="Something went wrong" message={error}/>
  }

  return (
    <div className="h-full py-4 w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-primary/5 rounded-full"
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>

      <Card className="relative w-full max-w-lg mx-4 backdrop-blur-sm bg-card/50">
        <div className="p-6 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <GraduationCap className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">LinkIITP</h1>
            </motion.div>
            <p className="text-lg text-muted-foreground">
              IIT Patna Notes Sharing Platform
            </p>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 py-0 sm:py-6"
          >
            <div className="text-center p-4 rounded-lg bg-card/50 border backdrop-blur-sm">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">
                Access Course Notes
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border backdrop-blur-sm">
              <Share2 className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Share Your Notes</p>
            </div>
          </motion.div>

          {/* Sign In Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="!mt-4"
          >
            <Button
              variant="outline"
              className="w-full relative group hover:shadow-lg transition-all duration-300 border-primary/20"
              onClick={async () => await signin()}
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
              <div className="flex items-center justify-center gap-3 py-2">
                <Icons.MicrosoftLogo className="w-5 h-5" />
                <span className="font-semibold">Sign in with Microsoft</span>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
              </div>
            </Button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Use your IIT Patna Microsoft account
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 p-4 text-center text-sm text-muted-foreground">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Made with <span className="inline-block animate-pulse">❤️</span> by
            Anonymous
          </motion.p>
        </div>
      </Card>
    </div>
  );
}
