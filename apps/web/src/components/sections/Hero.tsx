const HERO_BG = 'https://www.figma.com/api/mcp/asset/c17f22ef-a74e-4995-beac-5e829ef32070';

const STATS = [
  { value: '1,000+', label: 'Homes managed' },
  { value: '500+', label: 'Active users' },
  { value: '24/7', label: 'AI monitoring' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero image with dark overlay */}
      <div className="relative min-h-[700px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 from-[60%] to-black/80" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-12 flex items-center justify-between gap-12 py-20">
          {/* Left — headline */}
          <div className="flex-1 max-w-[774px]">
            <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold text-white leading-[1.3]">
              AI Home Management Platform
            </h1>
            <p className="mt-4 text-[1rem] text-white/90 leading-[1.7] max-w-[540px]">
              Manage, protect and optimize your home with expert services, smart recommendations and exclusive member benefits.
            </p>
          </div>

          {/* Right — signup card */}
          <div className="flex-shrink-0 w-full max-w-[546px] bg-white rounded-2xl border border-black/10 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
            <h2 className="text-[1.5rem] font-semibold text-black leading-[1.3] mb-2">
              Home management made simple
            </h2>
            <p className="text-[1rem] text-black/80 mb-8">
              Track maintenance, expenses, and records in one place.
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[1rem] font-medium text-black mb-3">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-14 px-5 rounded-full border border-primary text-[1rem] text-foreground outline-none placeholder:text-black/48 focus:ring-2 focus:ring-primary/30 transition-shadow"
                  aria-label="Email address"
                />
              </div>

              <button
                className="w-full h-14 bg-primary text-white font-semibold text-[1rem] rounded-full hover:bg-primary-hover transition-colors"
              >
                Get started
              </button>

              <p className="text-[1rem] text-black/80">
                Already a member?{' '}
                <a href="#" className="text-primary font-medium underline hover:text-primary-hover">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-[1440px] mx-auto px-12 flex">
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className="relative flex flex-col items-center gap-1 flex-1 text-center px-8 py-10"
            >
              {i > 0 && (
                <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-border" />
              )}
              <p className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-primary leading-none">
                {value}
              </p>
              <p className="text-[0.9rem] text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
