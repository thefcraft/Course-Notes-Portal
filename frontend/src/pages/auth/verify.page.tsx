"use client"

import { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from '@/store/authStore'
const OTP_LENGTH = 6

export default function EmailVerificationPage() {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''))

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate();
  
  const { isCheckingAuth, checkAuth, isAuthenticated, user, verifyEmail, error, isLoading, resendOtp } = useAuthStore();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  
  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);
  
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])
  if (!email) return <Navigate to='/login' replace />;

  if (!isCheckingAuth && !user) return <Navigate to='/signup' replace />;
  if (!isCheckingAuth && user?.isVerified) return <Navigate to='/' replace />;

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.value !== '') {
      if (index < OTP_LENGTH - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (index > 0 && otp[index] === '' && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleCodePaste = (value: string, index: number) => {
    if (value.length === OTP_LENGTH) index = 0;
    const newOtp = [...otp];
    for (let i = index; i < Math.min(OTP_LENGTH, index+value.length); i++) {
        const c = value[i-index];
        if (c >= '0' && c <= '9') newOtp[i] = c;
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(OTP_LENGTH, index+value.length)-1]?.focus();
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const verificationCode = otp.join("");
    try {
        await verifyEmail(email, verificationCode);
        navigate("/");
        toast.success("Email verified successfully");
    } catch (error) {
        console.log(error);
    }
  }

  const handleResendOTP = () => {
    resendOtp(email);
    alert('OTP sent to your email!')
  }

  return (
    <div className="container flex h-screen mx-auto -mt-16 w-screen flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="otp" className="sr-only">
              One-time password
            </Label>
            <div className="flex justify-between">
              {otp.map((_, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  ref={el => inputRefs.current[index] = el}
                  value={otp[index]}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  onPaste={(e) => handleCodePaste(e.clipboardData.getData('Text'), index)}
                  className="w-10 h-10 text-center"
                  disabled={isLoading}
                  required
                />
              ))}
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
              Verify Email
            </Button>
          </div>
        </form>

        <div className="text-center">
          <Button variant="link" onClick={handleResendOTP} disabled={isLoading}>
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  )
}

