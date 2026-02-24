import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
             <Link href="/" className="flex items-center gap-2">
                <svg
                    className="h-8 w-8 text-primary-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span className="text-xl font-bold font-headline text-primary-foreground">Veritas Vista</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Excellence in education and character development.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm hover:underline text-primary-foreground/80">About Us</Link></li>
              <li><Link href="/admission" className="text-sm hover:underline text-primary-foreground/80">Admissions</Link></li>
              <li><Link href="/parent-login" className="text-sm hover:underline text-primary-foreground/80">Parent Portal</Link></li>
              <li><Link href="/student-login" className="text-sm hover:underline text-primary-foreground/80">Student Portal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <address className="mt-4 space-y-2 not-italic text-sm text-primary-foreground/80">
              <p>123 University Ave, Learnington</p>
              <p>Email: <a href="mailto:info@veritasvista.edu" className="hover:underline">info@veritasvista.edu</a></p>
              <p>Phone: <a href="tel:+1234567890" className="hover:underline">(123) 456-7890</a></p>
            </address>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground"><Facebook size={20} /></a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground"><Twitter size={20} /></a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground"><Instagram size={20} /></a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Veritas Vista. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
