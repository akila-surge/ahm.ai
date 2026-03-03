import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Charles R',
    location: 'LOUISIANA',
    quote:
      'Before using the platform, I relied on calendar reminders and paper folders to track maintenance and expenses. It was easy to forget servicing or misplace invoices. Now everything is centralized in one dashboard, and I can see upcoming tasks, completed work, and total costs at a glance. It\'s made managing my home feel structured instead of overwhelming.',
  },
  {
    name: 'Shonna K',
    location: 'VIRGINIA',
    quote:
      'What I appreciate most is the visibility. I can track maintenance schedules, log expenses, and store warranties without juggling multiple tools. The automated alerts have helped me address small issues before they turned into bigger repairs. It gives me confidence that I\'m staying on top of my home instead of reacting to problems.',
  },
  {
    name: 'Karen M',
    location: 'VIRGINIA',
    quote:
      'The document vault alone has been incredibly useful. All my appliance warranties, inspection reports, and service records are stored securely and easy to access. When I needed servicing recently, I had the full history available instantly. The platform brings clarity and control to something that used to feel scattered.',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[1rem] font-semibold text-primary uppercase tracking-wide mb-3">
            CUSTOMER TESTIMONIALS
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-black leading-[1.2] max-w-[900px]">
            Homeowners are taking control of their maintenance and costs
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map(({ name, location, quote }) => (
            <div
              key={name}
              className="flex flex-col gap-6 p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-[border-color]"
            >
              {/* Stars */}
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[0.9375rem] text-muted leading-[1.7] flex-1">
                &ldquo;{quote}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <p className="text-[0.9375rem] font-semibold text-black">{name}</p>
                <p className="text-[0.875rem] text-subtle">{location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
