"use client"

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from '@/store/authStore'
import { authPrefix } from './constants.auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  
  const [success, setSuccess] = useState(false)
  const { forgotPassword, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await forgotPassword(email);
      setSuccess(true)
      setTimeout(() => {
        navigate(`${authPrefix}/login`)
      }, 3000)
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="container flex h-screen mx-auto -mt-16 w-screen flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Reset Link
              </Button>
            </div>
          </form>
        ) : (
          <Alert>
            <AlertDescription>
              you will receive a password reset link shortly.
              {/* If an account exists for {email}, you will receive a password reset link shortly. */}
            </AlertDescription>
          </Alert>
        )}

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link 
            to={`${authPrefix}/login`}
            className="underline underline-offset-4 hover:text-primary"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  )
}

