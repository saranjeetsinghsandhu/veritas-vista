'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirectPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    // Memoize Firestore references
    const parentProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'parentProfiles', user.uid);
    }, [firestore, user]);

    const studentProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'studentProfiles', user.uid);
    }, [firestore, user]);

    // Fetch documents
    const { data: parentProfile, isLoading: isParentLoading } = useDoc(parentProfileRef);
    const { data: studentProfile, isLoading: isStudentLoading } = useDoc(studentProfileRef);
    
    useEffect(() => {
        // Wait for all data to finish loading
        if (isUserLoading || isParentLoading || isStudentLoading) {
            return;
        }

        // If user is not logged in, redirect to home
        if (!user) {
            router.replace('/');
            return;
        }

        // Redirect based on profile existence
        if (parentProfile) {
            router.replace('/parent-dashboard');
        } else if (studentProfile) {
            router.replace('/student-dashboard');
        } else {
            // This case handles new users or users without a profile.
            // For now, we redirect to the homepage. A more robust solution
            // could redirect to a role selection or profile creation page.
            console.warn("User has no profile (parent or student). Redirecting home.");
            router.replace('/');
        }
    }, [user, isUserLoading, parentProfile, isParentLoading, studentProfile, isStudentLoading, router]);
    
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className='flex items-center'>
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="ml-4 text-lg text-foreground/80">Redirecting to your dashboard...</p>
            </div>
        </div>
    );
}

    