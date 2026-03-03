import { CheckCircle2, XCircle } from 'lucide-react';

const ROWS = [
  {
    label: 'Maintenance tracking',
    ai: 'Centralized digital dashboard with automated tracking.',
    manual: 'Manual reminders, spreadsheets, and scattered apps.',
  },
  {
    label: 'Expense visibility',
    ai: 'Categorized expense tracking with full visibility.',
    manual: 'Receipts stored separately with limited overview.',
  },
  {
    label: 'Document storage',
    ai: 'Secure digital vault accessible anytime.',
    manual: 'Paper files or multiple storage locations.',
  },
  {
    label: 'Risk detection',
    ai: 'AI alerts identify patterns and potential problems early.',
    manual: 'Issues identified after breakdowns occur.',
  },
  {
    label: 'Budget impact',
    ai: 'Proactive maintenance helps reduce avoidable expenses.',
    manual: 'Unexpected repair costs and inconsistent spending.',
  },
];

export function Comparison() {
  return (
    <section className="py-20 px-12 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-[1116px] mx-auto text-center mb-14">
          <p className="text-[1rem] font-semibold text-primary uppercase tracking-wide mb-3">
            WHY IT WORKS BETTER
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-black leading-[1.2] mb-3">
            Manual tracking vs AI-powered platform
          </h2>
          <p className="text-[1rem] text-muted max-w-[800px] mx-auto">
            Managing a home manually can lead to missed tasks and scattered records. An AI-driven platform centralizes and automates the process.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full border-collapse min-w-[540px]">
            <thead>
              <tr>
                <th className="p-5 text-left bg-card border-b border-border w-[25%]" />
                <th className="p-5 text-left bg-primary border-b border-primary w-[37.5%]">
                  <span className="text-[1rem] font-semibold text-white">
                    AmericasHomeManager.ai
                  </span>
                </th>
                <th className="p-5 text-left bg-card border-b border-border w-[37.5%]">
                  <span className="text-[1rem] font-semibold text-muted">
                    Manual tracking
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-surface'}`}
                >
                  <td className="p-5 text-[0.9375rem] font-semibold text-black align-middle">
                    {row.label}
                  </td>
                  <td className="p-5 align-middle bg-primary-dim/30">
                    <div className="flex items-start gap-2.5 text-[0.9rem] text-foreground leading-[1.5]">
                      <CheckCircle2 size={17} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{row.ai}</span>
                    </div>
                  </td>
                  <td className="p-5 align-middle">
                    <div className="flex items-start gap-2.5 text-[0.9rem] text-muted leading-[1.5]">
                      <XCircle size={17} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{row.manual}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <button className="h-14 px-8 rounded-full bg-primary text-white font-semibold text-[1rem] hover:bg-primary-hover transition-colors">
            Get started
          </button>
        </div>
      </div>
    </section>
  );
}
