const FEATURES = [
  {
    title: 'Automated maintenance scheduling',
    desc: 'Pre-built service timelines help you stay on top of routine upkeep without manual tracking.',
  },
  {
    title: 'Centralized expense tracking',
    desc: 'All repair, servicing, and upkeep costs are recorded in one dashboard, giving you a clear understanding of where your money is going.',
  },
  {
    title: 'Secure document storage',
    desc: 'Warranties, invoices, insurance documents, and inspection reports are stored securely and accessible whenever you need them.',
  },
  {
    title: 'Proactive AI alerts',
    desc: 'The system monitors patterns and notifies you of potential issues early, helping you address problems before they escalate.',
  },
  {
    title: 'Complete task visibility',
    desc: 'View upcoming maintenance, ongoing services, and completed work in one organized timeline, so nothing gets overlooked.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-[1116px] mx-auto text-center mb-16">
          <p className="text-[1.25rem] font-semibold text-primary uppercase tracking-wide mb-2">
            OUR ADVANTAGE
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-black leading-[1.2]">
            Why homeowners use our platform
          </h2>
        </div>

        {/* Split layout */}
        <div className="flex gap-6 items-start flex-col lg:flex-row">
          {/* Left — image placeholders */}
          <div className="flex-shrink-0 w-full lg:w-[48%] flex flex-wrap gap-6">
            <div className="w-full h-[260px] rounded-2xl bg-black/[0.06]" />
            <div className="flex gap-6 w-full">
              <div className="flex-1 h-[155px] rounded-2xl bg-black/[0.06]" />
              <div className="flex-1 h-[155px] rounded-2xl bg-black/[0.06]" />
              <div className="flex-1 h-[155px] rounded-2xl bg-black/[0.06]" />
            </div>
          </div>

          {/* Right — feature list */}
          <div className="flex-1 flex flex-col gap-7">
            {FEATURES.map(({ title, desc }, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h3 className={`font-semibold leading-[1.4] ${i === 0 ? 'text-[1.25rem]' : 'text-[1.125rem]'} text-black`}>
                  {title}
                </h3>
                <p className="text-[1rem] text-black/72 leading-[1.6]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
