import React from 'react';
import {
  Community,
  CommunityConstitution,
  CulturalWork,
  EvaluationRecord,
  Challenge,
  RefusalEvent,
  SystemArchetype
} from '../../types/atlas';
import {
  ShieldAlert,
  Gavel,
  BookOpen,
  Compass,
  KeyRound,
  ArrowRight,
  Activity,
  Layers,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Binary
} from 'lucide-react';

interface MissionControlViewProps {
  community: Community;
  constitution: CommunityConstitution;
  works: CulturalWork[];
  evaluations: EvaluationRecord[];
  challenges: Challenge[];
  refusals: RefusalEvent[];
  onNavigateTab: (tab: SystemArchetype) => void;
  onOpenConstitution: () => void;
  onStartWalkthrough: () => void;
  onOpenRegisterWork: () => void;
  overallAgencyScore: number;
}

export const MissionControlView: React.FC<MissionControlViewProps> = ({
  community,
  constitution,
  works,
  evaluations,
  challenges,
  refusals,
  onNavigateTab,
  onOpenConstitution,
  onStartWalkthrough,
  onOpenRegisterWork,
  overallAgencyScore
}) => {
  const activeChallenges = challenges.filter(
    (c) => c.status !== 'REMEDIATION_ENFORCED' && c.status !== 'REFUSAL_INJUNCTION'
  );
  const activeInjunctions = challenges.filter(
    (c) => c.status === 'REFUSAL_INJUNCTION' || c.status === 'REMEDIATION_ENFORCED'
  );

  const activeConsentCount = works.filter((w) => w.consent.status === 'ACTIVE').length;
  const revokedConsentCount = works.filter((w) => w.consent.status === 'REVOKED').length;

  return (
    <div className="space-y-6">
      {/* Top Banner: Civilizational Overview & Charter */}
      <div className="rounded-lg border border-slate-800 bg-gradient-to-r from-[#0c1322] via-[#090e18] to-[#0d1627] p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SOVEREIGN COMMONS ONLINE</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>CONSTITUTION V{constitution.version}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>RATIFIED {constitution.lastAmended}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-ancient text-slate-100 tracking-wide">
              {community.name}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {community.mission}
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
              <div>
                <span className="text-slate-500">Steward:</span>{' '}
                <span className="text-slate-200 font-medium">{community.steward}</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div>
                <span className="text-slate-500">Governance:</span>{' '}
                <span className="text-slate-200 font-medium">{community.councilType}</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div>
                <span className="text-slate-500">Community Register:</span>{' '}
                <span className="text-slate-200 font-mono-code">{community.membersCount.toLocaleString()} Custodians</span>
              </div>
            </div>
          </div>

          {/* Quick Action Matrix */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
            <button
              onClick={onOpenConstitution}
              className="px-4 py-2 rounded border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 text-xs font-medium transition-colors flex items-center justify-between space-x-2"
            >
              <span>Inspect AI Constitution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('refusal_layer')}
              className="px-4 py-2 rounded border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 text-xs font-medium transition-colors flex items-center justify-between space-x-2"
            >
              <span>Test Refusal Gate Engine</span>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            </button>
            <button
              onClick={onOpenRegisterWork}
              className="px-4 py-2 rounded border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-medium transition-colors flex items-center justify-between space-x-2"
            >
              <span>+ Register Cultural Work</span>
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Vital Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Human Agency Score */}
        <div
          onClick={() => onNavigateTab('observatory')}
          className="rounded-lg border border-slate-800 bg-[#090e17] p-4 cursor-pointer hover:border-amber-500/40 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
              Human Agency Index
            </span>
            <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-serif-ancient text-amber-300">
              {overallAgencyScore}
            </span>
            <span className="text-xs text-slate-500 font-mono-code">/ 100</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>9 Dimensions Verified</span>
            <span className="text-emerald-400 font-mono-code">Sovereign Standing</span>
          </div>
        </div>

        {/* Living Consent State */}
        <div
          onClick={() => onNavigateTab('commons')}
          className="rounded-lg border border-slate-800 bg-[#090e17] p-4 cursor-pointer hover:border-emerald-500/40 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
              Governed Works & Consent
            </span>
            <KeyRound className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-serif-ancient text-slate-100">
              {works.length}
            </span>
            <span className="text-xs text-slate-400">Archived Artifacts</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span className="text-emerald-400">{activeConsentCount} Active Covenants</span>
            {revokedConsentCount > 0 ? (
              <span className="text-rose-400 font-mono-code">{revokedConsentCount} Revoked</span>
            ) : (
              <span className="text-slate-500 font-mono-code">0 Revoked</span>
            )}
          </div>
        </div>

        {/* Machine Refusals Enforced */}
        <div
          onClick={() => onNavigateTab('refusal_layer')}
          className="rounded-lg border border-slate-800 bg-[#090e17] p-4 cursor-pointer hover:border-rose-500/40 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
              Refusals Enforced
            </span>
            <ShieldAlert className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-serif-ancient text-rose-300">
              {refusals.filter((r) => r.verdict === 'REFUSED').length}
            </span>
            <span className="text-xs text-rose-400/80 font-mono-code">Extraction Halts</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Machine Gate Active</span>
            <span className="text-rose-400 font-mono-code">100% Cryptographic Proof</span>
          </div>
        </div>

        {/* Public Injunctions / Challenges */}
        <div
          onClick={() => onNavigateTab('tribunal')}
          className="rounded-lg border border-slate-800 bg-[#090e17] p-4 cursor-pointer hover:border-sky-500/40 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
              Tribunal Injunctions
            </span>
            <Gavel className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-serif-ancient text-sky-300">
              {activeInjunctions.length}
            </span>
            <span className="text-xs text-slate-400">Binding Orders</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>{activeChallenges.length} Active Deliberations</span>
            <span className="text-sky-400 font-mono-code">Public Docket</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Operational Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Machine-Executable Constitution & Active Challenges */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active AI Constitution Summary */}
          <div className="rounded-lg border border-slate-800 bg-[#090e17] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-slate-100 font-serif-ancient uppercase tracking-wider">
                  Community AI Constitution (Article Status)
                </h2>
              </div>
              <button
                onClick={onOpenConstitution}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
              >
                <span>View Full Preamble & Clauses</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Permitted */}
              <div className="p-3 rounded border border-emerald-500/20 bg-emerald-950/10">
                <div className="text-[11px] font-mono-code text-emerald-400 uppercase font-semibold">
                  Permitted ({constitution.permitted.length})
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Ordinary, author-guided and educational enclave applications.
                </div>
                <div className="mt-3 space-y-1">
                  {constitution.permitted.slice(0, 2).map((p) => (
                    <div key={p.id} className="text-xs text-slate-400 truncate">
                      • {p.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Restricted */}
              <div className="p-3 rounded border border-amber-500/20 bg-amber-950/10">
                <div className="text-[11px] font-mono-code text-amber-400 uppercase font-semibold">
                  Restricted ({constitution.restricted.length})
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Requires elder/union review, royalty escrow, or watermarking.
                </div>
                <div className="mt-3 space-y-1">
                  {constitution.restricted.slice(0, 2).map((r) => (
                    <div key={r.id} className="text-xs text-slate-400 truncate">
                      • {r.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Prohibited */}
              <div className="p-3 rounded border border-rose-500/20 bg-rose-950/10">
                <div className="text-[11px] font-mono-code text-rose-400 uppercase font-semibold">
                  Prohibited ({constitution.prohibited.length})
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Absolute refusal bounds; triggers machine halt & legal action.
                </div>
                <div className="mt-3 space-y-1">
                  {constitution.prohibited.slice(0, 2).map((pr) => (
                    <div key={pr.id} className="text-xs text-slate-400 truncate">
                      • {pr.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Public Challenges & Injunctions */}
          <div className="rounded-lg border border-slate-800 bg-[#090e17] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Gavel className="w-4 h-4 text-sky-400" />
                <h2 className="text-sm font-semibold text-slate-100 font-serif-ancient uppercase tracking-wider">
                  Tribunal Docket: AI System Challenges
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('tribunal')}
                className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center space-x-1"
              >
                <span>Open Tribunal Registry</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {challenges.slice(0, 2).map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-200">
                        {c.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Target System: <span className="text-amber-300 font-mono-code">{c.targetModel}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded border border-sky-500/40 bg-sky-950/20 text-sky-300 uppercase">
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {c.allegedHarm}
                  </p>
                  {c.tribunalVerdict && (
                    <div className="mt-2.5 p-2 rounded bg-slate-950/80 border border-slate-800 text-xs text-amber-200/90 font-mono-code">
                      Verdict: {c.tribunalVerdict}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Real-Time Refusal Stream & Quick Evaluation Launcher */}
        <div className="space-y-6">
          {/* Real-time Refusal Gate Activity */}
          <div className="rounded-lg border border-slate-800 bg-[#090e17] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h2 className="text-sm font-semibold text-slate-100 font-serif-ancient uppercase tracking-wider">
                  Live Refusal Ledger
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('refusal_layer')}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium"
              >
                Inspect Logs
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {refusals.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  className="p-2.5 rounded border border-slate-800/80 bg-slate-950/60 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono-code text-[10px] font-bold ${
                        r.verdict === 'REFUSED'
                          ? 'text-rose-400'
                          : r.verdict === 'RESTRICTED'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      [{r.verdict}]
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono-code">
                      {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-slate-200 font-medium truncate">
                    {r.workOrDataset}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Target: {r.modelId} · {r.intendedUse}
                  </div>
                  <div className="text-[10px] font-mono-code text-slate-500 truncate pt-0.5">
                    Hash: {r.signatureHash.substring(0, 18)}...
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Launch: Run 10-Dimension Community Audit */}
          <div className="rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 p-5">
            <div className="flex items-center space-x-2">
              <Binary className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-semibold text-amber-200 font-serif-ancient uppercase tracking-wider">
                Reproducible AI Evaluation Engine
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Test any generative model or automated system across 10 community-defined standards: Accuracy, Representation, Cultural Integrity, Attribution, and Consent.
            </p>
            <button
              onClick={() => onNavigateTab('evaluator')}
              className="mt-4 w-full py-2 px-3 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-200 text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Launch 10-Dimension Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
