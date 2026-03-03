'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How does the AI monitoring work?',
    a: 'Our AI analyzes your home appliance data, maintenance history, and usage patterns to identify issues early — often days or weeks before a breakdown occurs. It sends you proactive alerts so you can act before problems escalate.',
  },
  {
    q: 'Is my home and document data secure?',
    a: 'Yes. All data is encrypted at rest and in transit. Your documents, warranties, and personal information are stored in a secure vault that only you can access. We comply with industry-standard security practices.',
  },
  {
    q: 'Can I manage multiple properties?',
    a: 'Yes, you can manage multiple properties from a single account. Each property gets its own dashboard, maintenance timeline, and document storage — perfect for homeowners with rental properties or vacation homes.',
  },
  {
    q: 'Do I need technical knowledge to use the platform?',
    a: 'Not at all. The platform is designed to be intuitive for everyday homeowners. Simply add your home details and appliances, and the AI takes care of the rest — sending you plain-language alerts and recommendations.',
  },
  {
    q: 'How do I track past repairs and service history?',
    a: 'Every service, repair, and maintenance task is automatically logged in your home timeline. You can view the full history, attach invoices and photos, and access records at any time directly from the dashboard.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-12 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Left — heading */}
          <div className="lg:w-[546px] flex-shrink-0">
            <p className="text-[1rem] font-semibold text-primary uppercase tracking-wide mb-4">
              HELP AND SUPPORT
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-black leading-[1.2] mb-4">
              Frequently asked questions about home warranties
            </h2>
            <p className="text-[1rem] text-muted leading-[1.6]">
              Clear answers about how the platform works and what to expect.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="flex-1 flex flex-col gap-0 border border-border rounded-2xl overflow-hidden bg-white">
            {FAQ_ITEMS.map(({ q, a }, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={q}
                  className={`border-b border-border last:border-b-0 ${isOpen ? 'bg-surface' : ''}`}
                >
                  <button
                    className="flex items-center justify-between gap-4 w-full text-left px-6 py-5 text-[1rem] font-normal text-black hover:bg-black/[0.02] transition-colors"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{q}</span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-[0.9375rem] text-muted leading-[1.7] px-6 pb-5 pt-1">
                      {a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
