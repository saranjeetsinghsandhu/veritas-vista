
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const navLinks = [
  { href: '/admission', label: 'Admission' },
  { href: '/about', label: 'About' },
];

const loginLinks = [
    { href: '/parent-login', label: 'Parent Login' },
    { href: '/student-login', label: 'Student Login' },
]

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
            <Button variant="ghost" asChild>
                <Link href="/parent-login">Parent Login</Link>
            </Button>
            <Button asChild>
                <Link href="/student-login">Student Login</Link>
            </Button>
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
                <div className="border-t pt-4 space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/parent-login" onClick={() => setIsMobileMenuOpen(false)}>Parent Login</Link>
                    </Button>
                    <Button className="w-full" asChild>
                        <Link href="/student-login" onClick={() => setIsMobileMenuOpen(false)}>Student Login</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
