import { LogIn, ClipboardList, Gift } from 'lucide-react';

const STEPS = [
  {
    Icon: LogIn,
    title: 'Join free or log in',
    desc: 'Join for free or simply use your existing Shop Your Way or Sears Home Advantage Member credentials to access your member benefits.',
  },
  {
    Icon: ClipboardList,
    title: 'Complete your home profile',
    desc: 'Get personalized recommendations, schedule services effortlessly, and unlock exclusive member-only discounts tailored to your home.',
  },
  {
    Icon: Gift,
    title: 'Browse, earn and redeem',
    desc: 'Explore home solutions, earn rewards on services and protection plans, and redeem your points for even more savings!',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-[1116px] mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[1rem] font-semibold text-primary uppercase tracking-wide mb-3">
              how it works
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-black leading-[1.2] mb-4">
              Getting started with our platform is simple
            </h2>
            <p className="text-[1rem] text-muted max-w-[900px] mx-auto leading-[1.7]">
              Our mission is to make managing your home easier and more rewarding. As a member, you get exclusive savings, personalized recommendations, and seamless scheduling—all while earning rewards on the services and protection plans you need.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {STEPS.map(({ Icon, title, desc }, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-5">
                {/* Step icon circle */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white flex-shrink-0">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="text-[1.0625rem] font-semibold text-black">{title}</h3>
                <p className="text-[1rem] text-muted leading-[1.7]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
