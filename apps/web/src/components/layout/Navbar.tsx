'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Member resources', href: '#features' },
  { label: 'Plans and pricing', href: '#pricing' },
  { label: 'Homeowner guides', href: '#how-it-works' },
  { label: 'Contact us', href: '#faq' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] bg-white shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
      <nav className="max-w-[1440px] mx-auto px-12 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-bold text-[1.15rem] text-foreground tracking-tight leading-tight">
            Americas<br />
            <span className="text-primary">Home Manager</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex list-none gap-6 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[1rem] text-foreground transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          <Link href="#" className="text-[1rem] font-semibold text-primary hover:text-primary-hover transition-colors">
            Sign in
          </Link>
          <Button size="md">Get started</Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-black/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col px-6 pb-4 border-t border-border bg-white gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-3 text-[1rem] text-foreground transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-3 pt-3 border-t border-border">
            <Link href="#" className="text-[1rem] font-semibold text-primary">Sign in</Link>
            <Button size="sm" className="ml-auto">Get started</Button>
          </div>
        </div>
      )}
    </header>
  );
}
