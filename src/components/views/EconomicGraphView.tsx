import React, { useState } from 'react';
import { Community, EconomicNode } from '../../types/atlas';
import { INITIAL_ECONOMIC_GRAPH } from '../../data/seedData';
import {
  Coins,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Scale,
  Users2,
  Building2,
  Cpu,
  Layers,
  CheckCircle2,
  Calculator
} from 'lucide-react';

interface EconomicGraphViewProps {
  community: Community;
}

export const EconomicGraphView: React.FC<EconomicGraphViewProps> = ({ community }) => {
  const [nodes, setNodes] = useState<EconomicNode[]>(INITIAL_ECONOMIC_GRAPH);

  // Collective Royalty Simulation
  const [simulatedRevenue, setSimulatedRevenue] = useState(2400000); // $2.4M
  const [royaltyPercentage, setRoyaltyPercentage] = useState(12.5); // 12.5%

  const annualRoyaltyPool = (simulatedRevenue * royaltyPercentage) / 100;
  const languageFundPortion = annualRoyaltyPool * 0.4;
  const creatorsDirectPortion = annualRoyaltyPool * 0.4;
  const legalDefensePortion = annualRoyaltyPool * 0.2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6">
        <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
          <Coins className="w-4 h-4" />
          <span>THE BRIDGE · ECONOMIC REALITY & VALUE DISTRIBUTION (SECTION XVI)</span>
        </div>
        <h1 className="text-2xl font-bold font-serif-ancient text-slate-100 mt-1">
          Economic Power & Collective Bargaining Graph
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          AI governance without economic reality is decorative. Mapping who creates value, who captures value, who bears existential risk, and who possesses the power to negotiate.
        </p>
      </div>

      {/* The 6 Civilizational Economic Questions */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-5">
        <div className="text-xs font-mono-code uppercase tracking-wider text-amber-400 mb-3">
          Section XVI Foundational Inquiries
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {[
            { q: 'Who creates value?', ans: 'Human lineage holders & cultural artisans' },
            { q: 'Who captures value?', ans: 'Historically: Cloud monopolies & venture equity' },
            { q: 'Who bears risk?', ans: 'Original creators displaced by synthetic clones' },
            { q: 'Who controls compute?', ans: 'Centralized server clusters' },
            { q: 'Who gets credit?', ans: 'Anonymized or stripped without Commons' },
            { q: 'Who can negotiate?', ans: 'Atlas Collective Bargaining Compacts' }
          ].map((item, i) => (
            <div key={i} className="p-3 rounded border border-slate-800 bg-[#070c14] space-y-1">
              <div className="text-[11px] font-semibold text-slate-200">{item.q}</div>
              <div className="text-[11px] text-slate-400 leading-snug">{item.ans}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Nodes Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="rounded-lg border border-slate-800 bg-[#090e17] p-5 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono-code uppercase text-amber-400 font-bold">
                  Actor Category: {node.role.replace('_', ' ')}
                </span>
                <h3 className="text-base font-bold text-slate-100 font-serif-ancient mt-0.5">
                  {node.name}
                </h3>
              </div>

              <span
                className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded border ${
                  node.bargainingPower === 'SOVEREIGN'
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                    : node.bargainingPower === 'COLLECTIVE'
                    ? 'border-sky-500/40 bg-sky-950/20 text-sky-300'
                    : node.bargainingPower === 'EXTRACTIVE'
                    ? 'border-rose-500/40 bg-rose-950/20 text-rose-300'
                    : 'border-slate-700 bg-slate-800 text-slate-400'
                }`}
              >
                POWER: {node.bargainingPower}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] font-mono-code uppercase text-emerald-400 block font-semibold">
                  Value Created:
                </span>
                <span className="text-slate-300">{node.valueCreated}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] font-mono-code uppercase text-amber-400 block font-semibold">
                  Value Captured (Observed):
                </span>
                <span className="text-slate-300">{node.valueCaptured}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] font-mono-code uppercase text-rose-400 block font-semibold">
                  Risk Borne:
                </span>
                <span className="text-slate-300">{node.riskBorne}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Collective Royalty Calculator */}
      <div className="rounded-lg border border-amber-500/40 bg-[#090e17] p-6 space-y-5">
        <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
          <Calculator className="w-4 h-4" />
          <span>COLLECTIVE ROYALTIES ESCROW SIMULATOR</span>
        </div>
        <h2 className="text-lg font-bold font-serif-ancient text-slate-100">
          Enforceable Commercial Royalty Redistribution Engine
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          When commercial AI systems obtain authorized licenses under Community AI Constitution Article IV, royalties flow directly into an autonomous community escrow fund.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Gross Deployment Revenue */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-code">
              <span className="text-slate-400">Commercial Revenue</span>
              <span className="text-amber-300 font-bold">${(simulatedRevenue / 1000000).toFixed(2)}M / yr</span>
            </div>
            <input
              type="range"
              min="500000"
              max="10000000"
              step="100000"
              value={simulatedRevenue}
              onChange={(e) => setSimulatedRevenue(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800"
            />
            <div className="text-[10px] text-slate-500">Global API subscription & licensing estimate</div>
          </div>

          {/* Slider 2: Collective Royalty Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-code">
              <span className="text-slate-400">Mandated Royalty Rate</span>
              <span className="text-emerald-400 font-bold">{royaltyPercentage}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="0.5"
              value={royaltyPercentage}
              onChange={(e) => setRoyaltyPercentage(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800"
            />
            <div className="text-[10px] text-slate-500">Alliance minimum: 12.5% of gross</div>
          </div>

          {/* Result Card */}
          <div className="p-4 rounded-lg bg-slate-950 border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono-code uppercase text-emerald-400 font-bold">
                Annual Community Trust Yield
              </span>
              <div className="text-2xl font-bold font-serif-ancient text-emerald-300 mt-1">
                ${Math.round(annualRoyaltyPool).toLocaleString()}
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono-code text-slate-400 space-y-0.5">
              <div>• Direct Creators Dividend (40%): ${Math.round(creatorsDirectPortion).toLocaleString()}</div>
              <div>• Language & Heritage Sanctuary (40%): ${Math.round(languageFundPortion).toLocaleString()}</div>
              <div>• Sovereign Legal Defense (20%): ${Math.round(legalDefensePortion).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
