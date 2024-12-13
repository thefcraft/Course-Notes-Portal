import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getStrength, getPasswordStrengthColor } from '@/pages/auth/utils.auth'
import { authPrefix } from "./constants.auth";
export default function ResetPasswordPage() {
    // Destructure token from route parameters
    const { token } = useParams<{ token: string }>();
    if (!token) return <Navigate to={`${authPrefix}/forgot-password`} replace />;
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [passwordStrengthLabel, setPasswordStrengthLabel] = useState<string>('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    
    const { isLoading, error, resetPassword } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (password) {
          const result = getStrength(password)
          setPasswordStrength((result.strength / 4) * 100)
          setPasswordStrengthLabel(result.label)
        } else {
          setPasswordStrength(0)
          setPasswordStrengthLabel('')
        }
    }, [password])
    useEffect(() => {
        setPasswordMatch(password === confirmPassword || confirmPassword === '')
    }, [password, confirmPassword])
    
    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        if(!token) return;
        if (password !== confirmPassword) {
          setPasswordMatch(false)
          return
        }
    
        try{
            await resetPassword(token, password);
            navigate(`${authPrefix}/login`);
        }catch(e) {
            console.log(error);
        }
    }
    

    return (
        <div className="container flex h-screen mx-auto -mt-16 w-screen flex-col items-center justify-center px-4">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Icons.logo className="mx-auto h-6 w-6" />
              <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
              <p className="text-sm text-muted-foreground">
                Enter your new password below
              </p>
            </div>
    
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="password">
                    New Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="New Password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="confirm-password">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    placeholder="Confirm Password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {password && (
                  <div className="grid gap-1">
                    <div className="flex justify-between text-xs">
                      <span>Password Strength:</span>
                      <span>{passwordStrengthLabel}</span>
                    </div>
                    <Progress value={passwordStrength} className={getPasswordStrengthColor(passwordStrength)} />
                  </div>
                )}
                {!passwordMatch && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Passwords do not match. Please try again.
                  </AlertDescription>
                </Alert>
                )}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button disabled={isLoading || !passwordMatch || !password || !confirmPassword || passwordStrength !== 100}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Reset Password
                </Button>
              </div>
            </form>
          </div>
        </div>
    )
}