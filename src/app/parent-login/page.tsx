'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, useUser } from "@/firebase";
import { loginWithEmail } from "@/firebase/auth/login";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

type FormValues = z.infer<typeof formSchema>;


export default function ParentLoginPage() {
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (user) {
            // TODO: Redirect to a parent dashboard
            router.push('/');
        }
    }, [user, router]);

    const handleLogin: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        try {
            const user = await loginWithEmail(auth, data.email, data.password);
            console.log(user.uid);
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
            // The useEffect will handle redirection.
        } catch (error: any) {
            console.error("Login failed:", error);
            let description = "An unexpected error occurred. Please try again.";
            if (error.code) {
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/invalid-credential':
                        description = "Invalid email or password. Please try again.";
                        break;
                    case 'auth/too-many-requests':
                        description = "Too many failed login attempts. Please try again later.";
                        break;
                }
            }
            toast({
                variant: 'destructive',
                title: "Login failed",
                description: description,
            });
        }
        setIsLoading(false);
    };
    
    if (isUserLoading) {
        return (
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <Card>
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">Parent Portal Login</CardTitle>
                    <CardDescription>Welcome back! Please sign in to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="parent@example.com" {...register('email')} />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register('password')} />
                            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/parent-signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
                </Card>
            </div>
        </div>
    );
}
