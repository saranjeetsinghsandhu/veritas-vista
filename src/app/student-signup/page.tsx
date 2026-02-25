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
import { signupWithEmail } from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

type FormValues = z.infer<typeof formSchema>;


export default function StudentSignUpPage() {
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
            router.push('/student-dashboard');
        }
    }, [user, router]);

    const handleSignUp: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        try {
            await signupWithEmail(auth, data.email, data.password);
            toast({
                title: "Sign Up Successful",
                description: "Your account has been created. Redirecting...",
            });
            // The useEffect will handle redirection.
        } catch (error: any) {
            let description = "An unexpected error occurred. Please try again.";
            if (error.code) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        description = "This email is already in use. Please log in instead.";
                        break;
                    case 'auth/weak-password':
                        description = "The password is too weak. Please choose a stronger password.";
                        break;
                }
            }
            toast({
                variant: 'destructive',
                title: "Sign up failed",
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
                    <CardTitle className="font-headline text-3xl">Create Student Account</CardTitle>
                    <CardDescription>Get access to your student portal.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Student Email</Label>
                            <Input id="email" type="email" placeholder="student.id@veritasvista.edu" {...register('email')} />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register('password')} />
                            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/student-login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
                </Card>
            </div>
        </div>
    );
}
    