import { DeliverableRow } from './DeliverableRow';
import type { DeliverableState, Rates } from './DeliverableRow';

export interface PhaseState {
  id: string;
  title: string;
  objective: string;
  deliverables: DeliverableState[];
}

interface PhaseSectionProps {
  phase: PhaseState;
  rates: Rates;
  onChange: (updated: PhaseState) => void;
}

function stripPhaseNumber(title: string): string {
  return title.replace(/^\d+\s*-\s*/, '');
}

export function PhaseSection({ phase, rates, onChange }: PhaseSectionProps) {
  function handleDeliverableChange(updated: DeliverableState) {
    onChange({
      ...phase,
      deliverables: phase.deliverables.map((d) =>
        d.id === updated.id ? updated : d
      ),
    });
  }

  return (
    <div className="mb-3">
      <h3 className="text-[15px] font-bold text-black mb-0.5">
        {stripPhaseNumber(phase.title)}
      </h3>
      <p className="text-[12px] text-black mb-2">{phase.objective}</p>

      {/* Column headers */}
      <div className="flex items-center px-4 mb-1">
        <div className="flex-1" />
        <div className="flex gap-2 items-center mr-7">
          <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest w-14 text-center">Low</span>
          <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest w-14 text-center">Mid</span>
          <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest w-14 text-center">High</span>
        </div>
      </div>

      <div className="space-y-1.5">
        {phase.deliverables.map((d) => (
          <DeliverableRow
            key={d.id}
            deliverable={d}
            rates={rates}
            onChange={handleDeliverableChange}
          />
        ))}
      </div>
    </div>
  );
}
