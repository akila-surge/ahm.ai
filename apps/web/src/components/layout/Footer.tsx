import Link from 'next/link';

const FOOTER_LINKS = {
  'Member resources': [
    { label: 'Protect', href: '#' },
    { label: 'Repair', href: '#' },
    { label: 'Replace', href: '#' },
    { label: 'Prevent', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Membership', href: '#' },
  ],
  'Help center': [
    { label: 'Contact us', href: '#' },
    { label: 'D2C', href: '#' },
    { label: 'Homeowner guides', href: '#' },
    { label: 'FAQs', href: '#faq' },
  ],
  Partners: [
    { label: 'Agent portal', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-[1440px] mx-auto px-12 pt-16 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-bold text-[1.15rem] text-foreground tracking-tight leading-tight">
                Americas<br />
                <span className="text-primary">Home Manager</span>
              </span>
            </Link>
            <p className="text-[0.9rem] text-muted leading-[1.7] max-w-[340px]">
              Powered By Sears Home Advantage. Your all inclusive home management member platform for protection, repairs, and replacements.
            </p>
            {/* Social icons placeholder */}
            <div className="flex gap-3 mt-5">
              {['F', 'T', 'I', 'Y'].map((s) => (
                <div
                  key={s}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-[0.75rem] font-bold text-muted hover:text-primary hover:border-primary cursor-pointer transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-4">
              <p className="text-[0.9375rem] font-semibold text-black">
                {group}
              </p>
              <ul className="list-none flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.9rem] text-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 pt-6 border-t border-border sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.875rem] text-muted">
            © 2026 Americas Home Manager - Transform SR Brands, LLC
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <Link href="#" className="text-[0.875rem] text-muted hover:text-primary transition-colors">
              Privacy policy
            </Link>
            <span className="text-muted">|</span>
            <Link href="#" className="text-[0.875rem] text-muted hover:text-primary transition-colors">
              Terms of use
            </Link>
            <span className="text-muted">|</span>
            <Link href="#" className="text-[0.875rem] text-muted hover:text-primary transition-colors">
              Do not sell or share my personal information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
