const PLANS = [
  {
    name: 'HVAC',
    count: 2,
    unit: 'HVAC covered.',
    icon: '❄️',
    features: ['Air conditioning.', 'Heating.', 'Including ductwork.'],
    highlighted: false,
  },
  {
    name: 'SYSTEM',
    count: 10,
    unit: 'Systems covered.',
    icon: '⚙️',
    features: [
      'Air conditioning.',
      'Heating.',
      'Electrical system.',
      'Plumbing.',
      'Garage door opener.',
      'Water heater.',
      'and more...',
    ],
    highlighted: false,
  },
  {
    name: 'APPLIANCE',
    count: 12,
    unit: 'Appliances covered.',
    icon: '🏠',
    features: [
      'Refrigerator (up to two)',
      'Washer.',
      'Dryer.',
      'Range of cooktop.',
      'Wall oven.',
      'Dishwasher.',
      'and more...',
    ],
    highlighted: true,
  },
  {
    name: 'WHOLE HOME',
    count: 22,
    unit: 'All items covered.',
    icon: '🏡',
    features: [
      'The Whole Home Plan combines the appliances and systems that the other two plans cover.',
      'Appliances.',
      'HVAC.',
      'Plumbing.',
      'Electrical.',
    ],
    highlighted: false,
  },
  {
    name: 'APPLIANCE + HVAC',
    count: 14,
    unit: 'Appliances covered.',
    icon: '🔧',
    features: [
      'Plus:',
      'Air conditioning.',
      'Heating.',
      'Including ductwork.',
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-12 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-[1116px] mx-auto text-center mb-14">
          <p className="text-[1rem] font-semibold text-primary uppercase tracking-wide mb-3">
            plans and pricing
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-black leading-[1.2] mb-3">
            Pick the plan that works for you
          </h2>
          <p className="text-[1rem] text-muted">
            Choose the level of coverage that matches your home. All plans include the management dashboard.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden ${
                plan.highlighted
                  ? 'border-primary shadow-[0_0_0_2px_rgba(30,80,217,0.3)] bg-white'
                  : 'border-border bg-white hover:border-primary/30'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-primary text-white text-[0.75rem] font-bold tracking-wide text-center py-2 uppercase">
                  Most Popular
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* Plan label & icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.75rem] font-bold text-muted uppercase tracking-wider">
                    {plan.name}
                  </span>
                  <span className="text-[1.25rem]">{plan.icon}</span>
                </div>

                {/* Count */}
                <div className="mb-1">
                  <span className="text-[3.5rem] font-bold text-black leading-none">
                    {plan.count}
                  </span>
                </div>
                <p className="text-[0.9rem] text-muted mb-4">{plan.unit}</p>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-full text-[0.9rem] font-semibold transition-colors mb-5 ${
                    plan.highlighted
                      ? 'bg-primary text-white hover:bg-primary-hover'
                      : 'border border-primary text-primary hover:bg-primary-dim'
                  }`}
                >
                  See pricing
                </button>

                {/* Divider */}
                <div className="border-t border-border mb-5" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[0.875rem] text-muted">
                      <span className="w-4 h-4 rounded-full bg-primary-dim border border-primary/20 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
