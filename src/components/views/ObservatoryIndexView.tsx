import React from 'react';
import { Community } from '../../types/atlas';
import { INITIAL_AGENCY_INDEX } from '../../data/seedData';
import {
  Compass,
  CheckCircle2,
  TrendingUp,
  Scale,
  Shield,
  FileText,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';

interface ObservatoryIndexViewProps {
  community: Community;
}

export const ObservatoryIndexView: React.FC<ObservatoryIndexViewProps> = ({
  community
}) => {
  const averageScore = Math.round(
    INITIAL_AGENCY_INDEX.reduce((acc, curr) => acc + curr.score, 0) /
      INITIAL_AGENCY_INDEX.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6">
        <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
          <Compass className="w-4 h-4" />
          <span>THE OBSERVATORY · REALITY MEASUREMENT & HUMAN AGENCY INDEX (SECTION XIV)</span>
        </div>
        <h1 className="text-2xl font-bold font-serif-ancient text-slate-100 mt-1">
          Multidimensional Human Agency Evidence Index
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Power made visible: rigorously measuring whether communities possess authentic authority over AI systems affecting their lives, or merely decorative consultation.
        </p>
      </div>

      {/* Aggregate Score & Scientific Method Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Composite Agency Index Card */}
        <div className="rounded-lg border border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-slate-900 to-[#070c14] p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-amber-400">
              Composite Sovereignty Metric
            </span>
            <div className="mt-3 flex items-baseline space-x-3">
              <span className="text-5xl font-bold font-serif-ancient text-amber-300">
                {averageScore}
              </span>
              <span className="text-sm font-mono-code text-slate-500">/ 100</span>
            </div>
            <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sovereign Community Threshold Met (≥80)</span>
            </div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Based on empirical evidence across 9 distinct institutional, technical, and economic dimensions for <span className="text-slate-100 font-medium">{community.name}</span>.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono-code">
            Peer Audited: 2026-09-15 · Atlas Observatory Cluster
          </div>
        </div>

        {/* Section XXII: The Atlas Scientific Method */}
        <div className="lg:col-span-2 rounded-lg border border-slate-800 bg-[#090e17] p-6 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono-code text-slate-400 uppercase">
            <Scale className="w-4 h-4 text-sky-400" />
            <span>Atlas Epistemological Standard (Section XXII)</span>
          </div>
          <h3 className="text-base font-bold font-serif-ancient text-slate-100">
            Separating Observation, Measurement, and Interpretation
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Atlas does not manufacture false certainty. In evaluating technological impact, every claim is classified into strict categories:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] font-mono-code text-emerald-400 uppercase font-bold">1. Fact</div>
              <div className="text-[11px] text-slate-300 mt-0.5">Directly observed code execution, prompt traces, dataset hashes.</div>
            </div>
            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] font-mono-code text-sky-400 uppercase font-bold">2. Measurement</div>
              <div className="text-[11px] text-slate-300 mt-0.5">Systematic quantitative scores (0-100) across 9 dimensions.</div>
            </div>
            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
              <div className="text-[10px] font-mono-code text-amber-400 uppercase font-bold">3. Causal Inference</div>
              <div className="text-[11px] text-slate-300 mt-0.5">Empirical links between unconsented ingestion and economic harm.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 9 Dimensions Breakdown Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif-ancient text-slate-100">
            The 9 Dimensions of Human Agency
          </h2>
          <span className="text-xs text-slate-500 font-mono-code">
            Full Evidence Verification Suite
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_AGENCY_INDEX.map((dim) => (
            <div
              key={dim.key}
              className="rounded-lg border border-slate-800 hover:border-slate-700 bg-[#090e17] p-4 space-y-3 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code uppercase font-semibold text-slate-200">
                    {dim.name}
                  </span>
                  <span
                    className={`font-mono-code text-base font-bold ${
                      dim.score >= 90
                        ? 'text-emerald-400'
                        : dim.score >= 80
                        ? 'text-amber-400'
                        : 'text-sky-400'
                    }`}
                  >
                    {dim.score}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {dim.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-[11px]">
                <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                  <div className="text-[10px] font-mono-code text-slate-500 uppercase">
                    Observed Evidence Weight:
                  </div>
                  <div className="text-slate-300 mt-0.5">{dim.evidenceWeight}</div>
                </div>

                <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                  <div className="text-[10px] font-mono-code text-emerald-400/90 uppercase">
                    Active Machine Safeguard:
                  </div>
                  <div className="text-slate-300 mt-0.5">{dim.activeSafeguard}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
