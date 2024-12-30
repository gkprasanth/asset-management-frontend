"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner"; // Import the Spinner component

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Get error details from response
            throw new Error(errorData.error || "Invalid credentials");
        }

        const data = await response.json();
        console.log(data);

        // Store token and user information in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({
            id: data.id,
            username: data.username,
            email: data.email,
        }));

        router.push("/dashboard");
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message || "An error occurred during login.");
        } else {
            setError("An error occurred during login.");
        }
    } finally {
        setLoading(false); // Reset loading state after request is complete
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {loading ? ( // Show spinner when loading
              <Spinner />
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
