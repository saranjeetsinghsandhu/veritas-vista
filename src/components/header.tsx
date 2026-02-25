'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const navLinks = [
  { href: '/admission', label: 'Admission' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <nav className="hidden md:flex items-center space-x-2">
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
          </nav>

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
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
