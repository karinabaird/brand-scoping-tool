import type { Package } from '../data/scopingData';
import type { PhaseState } from './PhaseSection';
import { Logo } from './Logo';

interface ClientSummaryProps {
  pkg: Package;
  phases: PhaseState[];
  fee: number;
  onBack: () => void;
}

function stripPhaseNumber(title: string): string {
  return title.replace(/^\d+\s*-\s*/, '');
}

function isLaterRound(name: string): boolean {
  return /\(Round [2-9]\)/.test(name);
}

export function ClientSummary({ pkg, phases, fee, onBack }: ClientSummaryProps) {
  const enabledPhases = phases.map((p) => ({
    ...p,
    deliverables: p.deliverables
      .filter((d) => d.enabled)
      .filter((d) => !isLaterRound(d.name)),
  })).filter((p) => p.deliverables.length > 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <Logo className="h-5 w-auto mb-4" />
          <h1 className="text-white text-xl font-bold mb-2">{pkg.name}</h1>
          <p className="text-white text-xl font-bold">
            ${Math.round(fee).toLocaleString()}{' '}
            <span className="text-white/70 text-sm font-normal">(AUD)</span>
          </p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/75 hover:text-white text-xs border border-white/20 rounded-full px-4 py-2 transition-colors mt-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to scoping
        </button>
      </div>

      {/* Phase columns */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(enabledPhases.length, 3)}, 1fr)` }}
      >
        {enabledPhases.map((phase) => (
          <div key={phase.id + phase.title} className="flex flex-col gap-3">
            {/* Phase header card */}
            <div className="bg-white/10 rounded-xl px-4 py-3">
              <h2 className="text-white text-sm font-bold mb-0.5">
                {stripPhaseNumber(phase.title)}
              </h2>
              <p className="text-white/75 text-xs leading-snug">{phase.objective}</p>
            </div>

            {/* Deliverables card */}
            <div className="bg-[#f5f5f5] rounded-xl px-4 py-3 flex flex-col divide-y divide-[#e8e8e8]">
              {phase.deliverables.map((d) => (
                <div key={d.id} className="py-2.5 first:pt-0 last:pb-0">
                  <p className="text-black text-[13px] font-bold mb-0.5">{d.name}</p>
                  <p className="text-gray-500 text-[12px] leading-snug">{d.description}</p>

                  {d.pagination && d.pagination.length > 0 && (
                    <div className="mt-3 bg-white rounded-lg px-3 py-3">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Proposed Brand Guideline Pagination
                      </p>
                      <ol className="space-y-1">
                        {d.pagination.map((page, idx) => (
                          <li key={idx} className="flex gap-2 text-[12px]">
                            <span className="text-gray-400 flex-shrink-0 w-5 text-right">
                              {idx + 1}.
                            </span>
                            <span className={page.isHeader ? 'font-bold text-black' : 'text-gray-600'}>
                              {page.text}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
