"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ResetPasswordComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- DEVELOPMENT CHANGE ---
  // Added default test values so the page renders without needing a real URL.
  const email = searchParams.get("email") || "test@example.com";
  const otp = searchParams.get("otp") || "123456";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // This will now control both fields
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- DEVELOPMENT CHANGE ---
  // The redirect logic is temporarily commented out.
  /*
  useEffect(() => {
    if (!searchParams.get("email") || !searchParams.get("otp")) {
      router.push('/auth/forgot-password');
    }
  }, [searchParams, router]);
  */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Password has been reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password. The link may have expired.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-lg border bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Set New Password</CardTitle>
          <CardDescription>
            Create a new, strong password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
          {message && <Alert className="mb-4 bg-green-50 border-green-200 text-green-800"><AlertDescription>{message}</AlertDescription></Alert>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* UI FIX: Wrapped each Label/Input group in a div with spacing */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  // LOGIC FIX: Type is now controlled by the single showPassword state
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  // UI FIX: Added padding-right to prevent text from overlapping the icon
                  className="pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                // LOGIC FIX: This field is also controlled by the same showPassword state
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading || !!message} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

// Suspense wrapper remains the same
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
}