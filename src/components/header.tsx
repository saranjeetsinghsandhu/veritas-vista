'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useAuth } from '@/firebase';
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";


const navLinks = [
  { href: '/admission', label: 'Admission' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        variant: 'destructive',
        title: "Logout failed",
        description: "Could not log you out. Please try again.",
      });
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 ml-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            {isUserLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : user ? (
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      Parent Portal <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/parent-login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/parent-signup">Sign Up</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            Student Portal <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href="/student-login">Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/student-signup">Sign Up</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                   <Logo />
                </div>
                <div className="flex-grow flex flex-col mt-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    ))}
                </div>
                <div className="border-t pt-4 space-y-4">
                  {isUserLoading ? (
                    <div className="flex justify-center">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  ) : user ? (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                  ) : (
                    <>
                      <div>
                          <p className="px-2 pb-2 text-sm font-semibold text-muted-foreground">Parent Portal</p>
                          <div className="space-y-2">
                              <Button variant="outline" className="w-full" asChild>
                                  <Link href="/parent-login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                              </Button>
                              <Button className="w-full" asChild>
                                  <Link href="/parent-signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                              </Button>
                          </div>
                      </div>
                      <div>
                          <p className="px-2 pb-2 text-sm font-semibold text-muted-foreground">Student Portal</p>
                          <div className="space-y-2">
                              <Button variant="outline" className="w-full" asChild>
                                  <Link href="/student-login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                              </Button>
                              <Button className="w-full" asChild>
                                  <Link href="/student-signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                              </Button>
                          </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
