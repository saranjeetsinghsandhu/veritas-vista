'use client';

import { useUser, useFirestore, useMemoFirebase, useCollection, useDoc, type WithId } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { collection, doc } from 'firebase/firestore';
import { Loader2, BookOpen, CalendarCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// --- Data Types ---
interface Grade {
  courseName: string;
  term: string;
  score: number;
  letterGrade: string;
}

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Tardy' | 'Excused';
}

interface StudentProfile {
    firstName: string;
    lastName: string;
    email: string;
    gradeLevel: number;
}

// --- Main Student Dashboard Page ---
export default function StudentDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/student-login');
    }
  }, [user, isUserLoading, router]);

  const studentProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'studentProfiles', user.uid);
  }, [firestore, user]);

  const gradesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'studentProfiles', user.uid, 'grades');
  }, [firestore, user]);

  const attendanceQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'studentProfiles', user.uid, 'attendance');
  }, [firestore, user]);

  const { data: studentProfile, isLoading: isProfileLoading } = useDoc<StudentProfile>(studentProfileRef);
  const { data: grades, isLoading: areGradesLoading } = useCollection<WithId<Grade>>(gradesQuery);
  const { data: attendance, isLoading: isAttendanceLoading } = useCollection<WithId<AttendanceRecord>>(attendanceQuery);

  const isLoading = isUserLoading || isProfileLoading || areGradesLoading || isAttendanceLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }
  
  if (!studentProfile) {
    return (
        <div className="container mx-auto max-w-5xl py-12 px-4 text-center">
            <h1 className="text-3xl font-bold font-headline text-primary">Welcome!</h1>
            <p className="mt-4 text-lg text-foreground/80">
                We couldn&apos;t find a student profile for your account. If you&apos;re a new student, please complete your profile. If you&apos;re a parent, please log in through the Parent Portal.
            </p>
        </div>
    )
  }

  // Use mock data for presentation if the database is empty
  const displayGrades = grades && grades.length > 0 ? grades : [
    { id: 'mock-g1', courseName: 'Mathematics', term: 'Fall 2024', score: 92, letterGrade: 'A-' },
    { id: 'mock-g2', courseName: 'English Literature', term: 'Fall 2024', score: 88, letterGrade: 'B+' },
    { id: 'mock-g3', courseName: 'Physics', term: 'Fall 2024', score: 95, letterGrade: 'A' },
    { id: 'mock-g4', courseName: 'History', term: 'Fall 2024', score: 85, letterGrade: 'B' },
  ];
  
  const displayAttendance = attendance && attendance.length > 0 ? attendance.slice(0, 5) : [
    { id: 'mock-a1', date: new Date().toISOString().split('T')[0], status: 'Present' },
    { id: 'mock-a2', date: new Date(new Date().setDate(new Date().getDate()-1)).toISOString().split('T')[0], status: 'Present' },
    { id: 'mock-a3', date: new Date(new Date().setDate(new Date().getDate()-2)).toISOString().split('T')[0], status: 'Absent' },
    { id: 'mock-a4', date: new Date(new Date().setDate(new Date().getDate()-3)).toISOString().split('T')[0], status: 'Present' },
    { id: 'mock-a5', date: new Date(new Date().setDate(new Date().getDate()-4)).toISOString().split('T')[0], status: 'Tardy' },
  ];


  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <Avatar className="h-24 w-24 border-4 border-primary">
          <AvatarFallback className="text-3xl">
            {studentProfile.firstName?.[0]}{studentProfile.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
            <h1 className="text-4xl font-bold font-headline text-primary">
                Welcome, {studentProfile.firstName}!
            </h1>
            <p className="mt-1 text-lg text-foreground/80">
                {studentProfile.email} | Grade {studentProfile.gradeLevel}
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <BookOpen className="text-primary" />
              Current Grades
            </CardTitle>
            <CardDescription>Overview of your academic performance for the current term.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.courseName}</TableCell>
                    <TableCell className="text-right">{grade.score}%</TableCell>
                    <TableCell className="text-right">{grade.letterGrade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <CalendarCheck className="text-primary" />
              Recent Attendance
            </CardTitle>
             <CardDescription>Your attendance summary for the last few days.</CardDescription>
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
