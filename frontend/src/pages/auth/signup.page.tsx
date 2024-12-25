import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Space } from '@/components/utils'
import { useAuthStore } from '@/store/authStore'
import { getStrength, getPasswordStrengthColor } from '@/pages/auth/utils.auth'
import { authPrefix } from './constants.auth'
export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState<string>('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  const { signup, error, isLoading } = useAuthStore();
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

  
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    // setIsLoading(true)

    if (password !== confirmPassword) {
      setPasswordMatch(false)
      // setIsLoading(false)
      return
    }

    try{
			await signup(email, password, name);
			const encodedEmail = encodeURIComponent(email);
			navigate(`${authPrefix}/verify-email?email=${encodedEmail}`);
		}catch {
			console.log(error);
		}
  }

  return (
    <div className="container flex h-screen mx-auto -mt-16 w-screen flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Name"
                  type="text"
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
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
                  autoComplete="new-password"
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
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              <Button disabled={isLoading || !passwordMatch || !password || !confirmPassword || passwordStrength !== 100 || !name || !email}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}<Space/>
            Microsoft
          </Button>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our<Space/>
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link><Space/>
          and<Space/>
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?<Space/>
          <Link
            to={`${authPrefix}/login`}
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

