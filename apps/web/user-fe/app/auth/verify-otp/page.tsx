"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function VerifyOtpComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  // const email = searchParams.get("email") || " test@example.com";  This is the  test example emial fr testing the page

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!email) {
      // If no email is found in the URL, redirect back to the forgot password page
      router.push('/auth/forgot-password');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [email, router]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        router.push(`/auth/reset-password?email=${email}&otp=${otp}`);
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();

      if (response.ok) {
        setMessage("A new OTP has been sent to your email.");
        setTimer(60); // Reset timer
        setOtp(""); // Clear current OTP
      } else {
        setError(data.error || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const formattedTimer = `00:${timer.toString().padStart(2, '0')}`;

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg border bg-white">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl font-semibold text-center text-gray-900">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center text-gray-600 text-sm px-1">
            An OTP has been sent to <strong>{email}</strong>. Please enter it below.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-5 pb-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {message && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">{message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Enter 6-Digit OTP
              </Label>
              <div className="flex justify-center space-x-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      const newOtp = otp.split('');
                      newOtp[index] = value;
                      setOtp(newOtp.join(''));
                      
                      // Auto-focus next input
                      if (value && index < 5) {
                        const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                        nextInput?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace
                      if (e.key === 'Backspace' && !otp[index] && index > 0) {
                        const prevInput = e.target.parentElement?.children[index - 1] as HTMLInputElement;
                        prevInput?.focus();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
                      setOtp(pastedData);
                      // Focus the last input or next empty input
                      const nextIndex = Math.min(pastedData.length, 5);
                      const targetInput = e.target.parentElement?.children[nextIndex] as HTMLInputElement;
                      targetInput?.focus();
                    }}
                    className="w-10 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  />
                ))}
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || otp.length !== 6} 
              className="w-full h-10 text-sm font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="px-5 pt-0 pb-4">
          <div className="w-full text-center space-y-2">
            <div className="text-sm text-gray-600">
              {timer > 0 ? (
                <span>Resend OTP in {formattedTimer}</span>
              ) : (
                <span>Didn't receive the code?</span>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="link"
                onClick={handleResendOtp}
                disabled={timer > 0 || isResending}
                className="text-sm h-auto p-0"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Resending...
                  </>
                ) : (
                  'Resend OTP'
                )}
              </Button>
              <Button variant="link" asChild className="text-sm h-auto p-0 text-gray-600">
                <Link href="/auth/forgot-password">← Back</Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

// Using Suspense is a good practice when using useSearchParams
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <VerifyOtpComponent />
    </Suspense>
  );
}