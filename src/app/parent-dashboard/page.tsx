'use client';

import { useUser, useFirestore, useMemoFirebase, useCollection, useDoc, type WithId } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, doc, query, where } from 'firebase/firestore';
import { Loader2, BookOpen, CalendarCheck, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Data Types ---
interface ParentProfile {
    firstName: string;
    lastName: string;
    email: string;
}

interface StudentProfile {
    id: string;
    firstName: string;
    lastName: string;
    gradeLevel: number;
}

interface Grade {
  id: string;
  courseName: string;
  score: number;
  letterGrade: string;
}

interface AttendanceRecord {
  id: string;
  date: string;
  status: 'Present' | 'Absent' | 'Tardy' | 'Excused';
}


// --- Child Component for Student Details ---
function StudentDetails({ studentId }: { studentId: string }) {
    const firestore = useFirestore();

    const studentProfileRef = useMemoFirebase(() => doc(firestore, 'studentProfiles', studentId), [firestore, studentId]);
    const { data: studentProfile, isLoading: isProfileLoading } = useDoc<StudentProfile>(studentProfileRef);
    
    const gradesQuery = useMemoFirebase(() => collection(firestore, 'studentProfiles', studentId, 'grades'), [firestore, studentId]);
    const { data: grades, isLoading: areGradesLoading } = useCollection<WithId<Grade>>(gradesQuery);

    const attendanceQuery = useMemoFirebase(() => collection(firestore, 'studentProfiles', studentId, 'attendance'), [firestore, studentId]);
    const { data: attendance, isLoading: isAttendanceLoading } = useCollection<WithId<AttendanceRecord>>(attendanceQuery);

    if (isProfileLoading || areGradesLoading || isAttendanceLoading) {
        return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (!studentProfile) {
        return <p className="p-4 text-muted-foreground">Could not load student profile.</p>;
    }

    // Use mock data for presentation if the database is empty
    const displayGrades = grades && grades.length > 0 ? grades : [
        { id: 'mock-g1', courseName: 'Biology', score: 91, letterGrade: 'A-' },
        { id: 'mock-g2', courseName: 'World History', score: 84, letterGrade: 'B' },
        { id: 'mock-g3', courseName: 'Algebra II', score: 88, letterGrade: 'B+' },

    ];
    const displayAttendance = attendance && attendance.length > 0 ? attendance.slice(0, 5) : [
        { id: 'mock-a1', date: new Date(new Date().setDate(new Date().getDate()-1)).toISOString().split('T')[0], status: 'Present' },
        { id: 'mock-a2', date: new Date(new Date().setDate(new Date().getDate()-2)).toISOString().split('T')[0], status: 'Tardy' },
        { id: 'mock-a3', date: new Date(new Date().setDate(new Date().getDate()-3)).toISOString().split('T')[0], status: 'Present' },
    ];

    return (
        <div className="space-y-8 mt-6">
            <h3 className="text-2xl font-bold font-headline text-primary">
                {studentProfile.firstName} {studentProfile.lastName} (Grade {studentProfile.gradeLevel})
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                        <BookOpen />
                        Grades
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead className="text-right">Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayGrades.map((grade) => (
                                <TableRow key={grade.id}>
                                    <TableCell className="font-medium">{grade.courseName}</TableCell>
                                    <TableCell className="text-right">{grade.letterGrade} ({grade.score}%)</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                        <CalendarCheck />
                        Recent Attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {displayAttendance.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                    <Badge variant={record.status === 'Present' ? 'default' : record.status === 'Absent' ? 'destructive' : 'secondary'}>
                                        {record.status}
                                    </Badge>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// --- Main Parent Dashboard Page ---
export default function ParentDashboardPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/parent-login');
        }
    }, [user, isUserLoading, router]);

    const parentProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'parentProfiles', user.uid);
    }, [firestore, user]);
    const { data: parentProfile, isLoading: isProfileLoading } = useDoc<ParentProfile>(parentProfileRef);

    // Query for students whose parentIds array contains the current user's UID
    const studentsQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(collection(firestore, 'studentProfiles'), where('parentIds', 'array-contains', user.uid));
    }, [firestore, user]);
    const { data: students, isLoading: areStudentsLoading } = useCollection<WithId<StudentProfile>>(studentsQuery);
    
    // Set the selected student to the first in the list by default
    useEffect(() => {
        if (students && students.length > 0 && !selectedStudentId) {
            setSelectedStudentId(students[0].id);
        }
    }, [students, selectedStudentId]);

    const isLoading = isUserLoading || isProfileLoading || areStudentsLoading;

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-16 w-16 animate-spin" />
            </div>
        );
    }

    if (!parentProfile) {
        return (
            <div className="container mx-auto max-w-5xl py-12 px-4 text-center">
                <h1 className="text-3xl font-bold font-headline text-primary">Welcome!</h1>
                <p className="mt-4 text-lg text-foreground/80">
                    We couldn&apos;t find a parent profile for your account. Please contact administration to get set up.
                </p>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarFallback className="text-3xl">
                        {parentProfile.firstName?.[0]}{parentProfile.lastName?.[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-4xl font-bold font-headline text-primary">
                        Parent Dashboard
                    </h1>
                    <p className="mt-1 text-lg text-foreground/80">
                        Welcome, {parentProfile.firstName} {parentProfile.lastName}!
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                        <Users />
                        Your Students
                    </CardTitle>
                    <CardDescription>Select a student to view their details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                     {(students && students.length > 0) ? (
                        <>
                            <Select onValueChange={setSelectedStudentId} value={selectedStudentId ?? ""}>
                                <SelectTrigger className="w-full md:w-[300px]">
                                    <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                                <SelectContent>
                                    {students.map((student) => (
                                        <SelectItem key={student.id} value={student.id}>
                                            {student.firstName} {student.lastName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            {selectedStudentId && <StudentDetails studentId={selectedStudentId} />}
                        </>
                    ) : (
                        <p className="p-4 text-center bg-muted rounded-md text-muted-foreground">No students are currently associated with your account. Please contact the school administration if this is an error.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
