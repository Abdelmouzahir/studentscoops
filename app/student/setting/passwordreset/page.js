/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SnDrbEvPfnn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/Components/ui/card"
import { Label } from "@/Components/ui/label"
import { Switch } from "@/Components/ui/switch"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"

export default function Passwordreset() {
  const [showSection, setShowSection] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
      // Proceed with form submission
    }
  };

  return (
    <div className="mx-full max-w-md space-y-6 py-12">
    <div className="text-left space-y-2 px-1">
      <h1 className="text-3xl font-bold ">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email and a new password to reset your account password.
        </p>
      </div>
      <Card className="w-[200%]">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-5">
            <div className="w-full flex items-center justify-between space-x-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
              </div>
              <Switch
                id="toggle-email"
                checked={showSection}
                onCheckedChange={() => setShowSection(!showSection)}
              />
            </div>
            {showSection && (
              <div className="space-y-2">
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeOffIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  <EyeOffIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="sr-only">{showPasswordConfirm ? 'Hide password' : 'Show password'}</span>
                </Button>
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function EyeOffIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )
}
