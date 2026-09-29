import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  ExternalLink,
  Shield,
  FileText,
  Compass,
  KeyRound,
  Wrench,
  Binary,
  Gavel,
  ShieldAlert,
  Database
} from 'lucide-react';
import { SystemArchetype } from '../types/atlas';

interface GuidedDemonstrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: SystemArchetype) => void;
  onOpenConstitutionModal: () => void;
  onOpenRegisterWorkModal: () => void;
  onOpenRegisterCommunityModal: () => void;
  onTriggerEvaluationDemo: () => void;
  onTriggerRefusalTest: () => void;
}

interface DemonstrationStep {
  number: number;
  title: string;
  archetype: SystemArchetype;
  shortDesc: string;
  civilizationalRole: string;
  actionText: string;
  actionType:
    | 'open_community'
    | 'open_constitution'
    | 'open_register_work'
    | 'tab_commons'
    | 'tab_workshop'
    | 'tab_workshop_models'
    | 'run_evaluation'
    | 'tab_archive_provenance'
    | 'tab_tribunal_challenge'
    | 'tab_tribunal_review'
    | 'tab_tribunal_verdict'
    | 'run_refusal'
    | 'tab_observatory';
}

const STEPS: DemonstrationStep[] = [
  {
    number: 1,
    title: 'Register a Sovereign Community',
    archetype: 'mission_control',
    shortDesc: 'Establish legal and cultural stewardship boundaries for a collective of knowledge keepers.',
    civilizationalRole: 'AI cannot govern itself ethically in the abstract; stewardship begins with sovereign human groups holding moral standing.',
    actionText: 'Register or Inspect Community Charter',
    actionType: 'open_community'
  },
  {
    number: 2,
    title: 'Define Community AI Constitution',
    archetype: 'agora',
    shortDesc: 'Draft machine-readable Permitted, Restricted, and Prohibited categories with appeal and redress mechanisms.',
    civilizationalRole: 'Moving from vague ethical guidelines to executable constitutional rules that code and policy can enforce.',
    actionText: 'Inspect & Amend AI Constitution',
    actionType: 'open_constitution'
  },
  {
    number: 3,
    title: 'Register a Cultural Work in the Archive',
    archetype: 'archive',
    shortDesc: 'Catalog master recordings, manuscripts, or witness archives with deep context and cultural significance.',
    civilizationalRole: 'Culture is living memory, not ungrounded training scrapings. Every work enters the Commons with named custodians.',
    actionText: 'Register New Cultural Artifact',
    actionType: 'open_register_work'
  },
  {
    number: 4,
    title: 'Record Living Provenance & Consent',
    archetype: 'commons',
    shortDesc: 'Establish living, revokable consent conditions, authorized use boundaries, and economic royalty minimums.',
    civilizationalRole: 'Consent must be a perpetual living state rather than an irrevocable one-time terms of service checkbox.',
    actionText: 'Open Living Consent Registry',
    actionType: 'tab_commons'
  },
  {
    number: 5,
    title: 'Place Work into Governed Dataset Commons',
    archetype: 'workshop',
    shortDesc: 'Group authorized works into encrypted, governed dataset shards with explicit allowed training paradigms.',
    civilizationalRole: 'Technical boundaries that distinguish ethical research datasets from extractive commercial scraping dumps.',
    actionText: 'Inspect Governed Datasets',
    actionType: 'tab_workshop'
  },
  {
    number: 6,
    title: 'Connect AI Model to Governance Perimeter',
    archetype: 'workshop',
    shortDesc: 'Bind frontier or specialized models (e.g. Multimodal Foundation vs Local Educational Aligner) to the Commons gate.',
    civilizationalRole: 'AI systems must be held accountable to the specific perimeters whose material they ingest or touch.',
    actionText: 'View Connected AI Models',
    actionType: 'tab_workshop_models'
  },
  {
    number: 7,
    title: 'Run 10-Dimension Community Evaluation',
    archetype: 'evaluator',
    shortDesc: 'Test model across Accuracy, Representation, Cultural Integrity, Attribution, Consent, and Agency.',
    civilizationalRole: 'Empirical, reproducible evidence of whether an AI honors or violates community boundaries.',
    actionText: 'Launch Live 10-Dimension Audit',
    actionType: 'run_evaluation'
  },
  {
    number: 8,
    title: 'View Forensic Evidence & Provenance Trail',
    archetype: 'archive',
    shortDesc: 'Inspect the full 8-node chain: Person → Work → Context → Institution → Dataset → Model → App → Outcome.',
    civilizationalRole: 'Radical auditability: an AI output is only as trustworthy as the unbroken provenance of its inputs.',
    actionText: 'Trace 8-Node Provenance Graph',
    actionType: 'tab_archive_provenance'
  },
  {
    number: 9,
    title: 'Submit Formal Challenge with Attached Evidence',
    archetype: 'tribunal',
    shortDesc: 'Document extraction harm, style displacement, or unconsented scraping into the public interest docket.',
    civilizationalRole: 'Converting decentralized community outrage into accountable civic and technical grievances.',
    actionText: 'Review Public Challenge Docket',
    actionType: 'tab_tribunal_challenge'
  },
  {
    number: 10,
    title: 'Conduct Community Review & Deliberation',
    archetype: 'agora',
    shortDesc: 'Assembly votes on proposed remedies, injunctions, or collective bargaining requirements.',
    civilizationalRole: 'Democratic deliberation ensures decisions represent affected peoples rather than centralized moderators.',
    actionText: 'Deliberate in the Agora',
    actionType: 'tab_tribunal_review'
  },
  {
    number: 11,
    title: 'Produce Binding Governance Decision',
    archetype: 'tribunal',
    shortDesc: 'The Tribunal issues an official Injunction, remediation order (e.g., weight ablation), or clearance.',
    civilizationalRole: 'Institutional legitimacy through reasoned, published judicial findings with constitutional grounding.',
    actionText: 'Inspect Tribunal Injunctions',
    actionType: 'tab_tribunal_verdict'
  },
  {
    number: 12,
    title: 'Enforce via the Refusal Engine',
    archetype: 'refusal_layer',
    shortDesc: 'The machine gate halts unauthorized inference or scraping attempts in real-time with cryptographic audit signatures.',
    civilizationalRole: 'A community can say "NO" in a way that software mechanically enforces.',
    actionText: 'Simulate Live Machine Refusal',
    actionType: 'run_refusal'
  },
  {
    number: 13,
    title: 'Publish Auditable Record to Knowledge Vault',
    archetype: 'observatory',
    shortDesc: 'Record lessons, update the Human Agency Index, and publish immutable governance receipts to the civilizational commons.',
    civilizationalRole: 'Ensuring future generations inherit stronger agency infrastructure rather than repeated extraction cycles.',
    actionText: 'Inspect Human Agency Index',
    actionType: 'tab_observatory'
  }
];

export const GuidedDemonstrationModal: React.FC<GuidedDemonstrationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onOpenConstitutionModal,
  onOpenRegisterWorkModal,
  onOpenRegisterCommunityModal,
  onTriggerEvaluationDemo,
  onTriggerRefusalTest
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  if (!isOpen) return null;

  const currentStep = STEPS[currentStepIndex];

  const handleExecuteAction = () => {
    // Mark as completed
    if (!completedSteps.includes(currentStep.number)) {
      setCompletedSteps((prev) => [...prev, currentStep.number]);
    }

    switch (currentStep.actionType) {
      case 'open_community':
        onOpenRegisterCommunityModal();
        break;
      case 'open_constitution':
        onOpenConstitutionModal();
        break;
      case 'open_register_work':
        onOpenRegisterWorkModal();
        break;
      case 'tab_commons':
        onNavigateToTab('commons');
        onClose();
        break;
      case 'tab_workshop':
      case 'tab_workshop_models':
        onNavigateToTab('workshop');
        onClose();
        break;
      case 'run_evaluation':
        onNavigateToTab('evaluator');
        onTriggerEvaluationDemo();
        onClose();
        break;
      case 'tab_archive_provenance':
        onNavigateToTab('archive');
        onClose();
        break;
      case 'tab_tribunal_challenge':
      case 'tab_tribunal_review':
      case 'tab_tribunal_verdict':
        onNavigateToTab('tribunal');
        onClose();
        break;
      case 'run_refusal':
        onNavigateToTab('refusal_layer');
        onTriggerRefusalTest();
        onClose();
        break;
      case 'tab_observatory':
        onNavigateToTab('observatory');
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b101b] border border-amber-500/40 w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#080d16] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100 font-serif-ancient tracking-wider uppercase">
                The Civilizational Loop: 13-Step Working Demonstration
              </h2>
              <p className="text-xs text-slate-400">
                End-to-End Vertical Slice: From Community Sovereignty to Machine-Enforced Refusal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 p-1.5 rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-3 bg-[#0d1424] border-b border-slate-800/80 flex items-center space-x-1 overflow-x-auto scrollbar-none">
          {STEPS.map((s, idx) => {
            const isDone = completedSteps.includes(s.number);
            const isCurrent = idx === currentStepIndex;
            return (
              <button
                key={s.number}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs transition-colors flex-shrink-0 ${
                  isCurrent
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : isDone
                    ? 'text-emerald-400 hover:bg-slate-800'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span className="w-3 h-3 rounded-full border border-current text-[9px] flex items-center justify-center">
                    {s.number}
                  </span>
                )}
                <span className="font-mono-code text-[11px] truncate max-w-[90px]">{s.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-mono-code text-amber-400 uppercase tracking-widest">
                Milestone {currentStep.number} of 13
              </div>
              <h3 className="text-xl font-bold text-slate-100 mt-1 font-serif-ancient">
                {currentStep.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono-code uppercase px-2 py-0.5 rounded border border-slate-700 bg-slate-800/60">
                Archetype: {currentStep.archetype.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-md border border-slate-800 bg-[#070c14] space-y-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-mono-code">
                Operational Mechanism
              </div>
              <div className="text-sm text-slate-200 mt-1 font-medium">
                {currentStep.shortDesc}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <div className="text-[11px] uppercase tracking-wider text-amber-500/80 font-mono-code">
                Civilizational Stewardship Significance
              </div>
              <div className="text-xs text-slate-300 mt-1 leading-relaxed italic">
                "{currentStep.civilizationalRole}"
              </div>
            </div>
          </div>

          {/* Detailed walkthrough guidance */}
          <div className="text-xs text-slate-400 leading-relaxed space-y-2">
            <p>
              Clicking the action button below will bring you directly to the operational module in the Commons where this capability executes live. You can inspect the data structures, trigger verification, and observe how human judgment binds artificial intelligence.
            </p>
          </div>
        </div>

        {/* Footer with Prev / Next / Action */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#080d16] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))}
              disabled={currentStepIndex === STEPS.length - 1}
              className="px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none flex items-center space-x-1"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleExecuteAction}
            className="px-4 py-2 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs transition-all shadow-md flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>{currentStep.actionText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
