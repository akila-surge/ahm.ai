const CTA_BG = 'https://www.figma.com/api/mcp/asset/ceb89303-30cc-4eed-9618-e4b5f89eaf47';
const CARD_BG = 'https://www.figma.com/api/mcp/asset/80b835dc-6261-4d4a-91f7-3ac681580fd9';

const BULLETS = [
  'Centralized home dashboard.',
  '24/7 AI monitoring.',
  'Secure document storage.',
];

export function CTABanner() {
  return (
    <section className="relative overflow-hidden min-h-[546px] flex flex-col justify-between py-16 px-12">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CTA_BG})` }}
      />
      <div className="absolute inset-0 bg-black/65" />

      {/* Top — heading */}
      <div className="relative z-10 max-w-[774px]">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white leading-[1.3]">
          Start managing your home smarter
        </h2>
        <p className="mt-4 text-[1rem] text-white/90 leading-[1.7]">
          Simplify maintenance, prevent costly issues, and gain full visibility into your home systems.
        </p>
      </div>

      {/* Bottom — card + bullets */}
      <div className="relative z-10 mt-16 flex flex-col gap-4 max-w-[1344px] mx-auto w-full">
        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${CARD_BG})` }}
          />
          <div className="relative flex items-center justify-between gap-6 px-5 py-4 flex-wrap">
            <p className="font-semibold text-[1rem] text-black flex-1 min-w-[200px]">
              Track maintenance, expenses, and records in one place.
            </p>
            <div className="flex items-center gap-6 flex-shrink-0 flex-wrap">
              <button className="h-14 px-8 rounded-full border-2 border-primary text-black font-semibold text-[1rem] hover:bg-primary-dim transition-colors">
                Get started
              </button>
              <button className="h-14 px-8 rounded-full bg-primary text-white font-semibold text-[1rem] hover:bg-primary-hover transition-colors">
                Explore plans
              </button>
            </div>
          </div>
        </div>

        {/* Bullet points */}
        <div className="flex items-center gap-8 flex-wrap">
          {BULLETS.map((bullet) => (
            <div key={bullet} className="flex items-center gap-2.5">
              <span className="w-4.5 h-4.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-[1rem] text-white">{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
