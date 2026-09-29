import React from 'react';
import { Community, SystemArchetype } from '../types/atlas';
import { Shield, Sparkles, BookOpen, Compass, Scale, FileCheck2, Cpu, ChevronDown, CheckCircle2, AlertOctagon } from 'lucide-react';

interface HeaderProps {
  currentCommunity: Community;
  communities: Community[];
  onSelectCommunity: (comm: Community) => void;
  onOpenRegisterCommunity: () => void;
  onStartWalkthrough: () => void;
  refusalsCount: number;
  activeChallengesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCommunity,
  communities,
  onSelectCommunity,
  onOpenRegisterCommunity,
  onStartWalkthrough,
  refusalsCount,
  activeChallengesCount
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="border-b border-slate-800 bg-[#070b12]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-slate-900 to-amber-950/30 flex items-center justify-center text-amber-300 font-serif-ancient text-xl font-bold shadow-inner">
              {currentCommunity.symbol || '🜂'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif-ancient text-base tracking-widest text-slate-100 font-bold uppercase">
                  Atlas Human Agency Commons
                </span>
                <span className="text-amber-500/80 text-xs font-mono-code">™</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center space-x-1.5">
                <span className="text-amber-400/90 font-medium">Domain: Cultural AI Commons</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Civilizational Stewardship Layer</span>
              </div>
            </div>
          </div>

          {/* Center Community Selector */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded border border-slate-700 bg-slate-900/80 hover:bg-slate-800/90 transition-all text-xs text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
              <span className="font-medium text-slate-100 max-w-[220px] truncate">{currentCommunity.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-84 rounded-md bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50">
                <div className="px-3 py-2 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-mono-code">
                  Active Sovereign Communities
                </div>
                {communities.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCommunity(c);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 hover:bg-slate-800/80 transition-colors flex items-start space-x-2.5 ${
                      c.id === currentCommunity.id ? 'bg-amber-950/20 text-amber-200' : 'text-slate-300'
                    }`}
                  >
                    <span className="mt-0.5 text-base">{c.symbol}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-200 truncate">{c.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{c.domain}</div>
                      <div className="text-[10px] text-slate-500 font-mono-code mt-0.5">
                        {c.membersCount.toLocaleString()} Members · {c.councilType}
                      </div>
                    </div>
                    {c.id === currentCommunity.id && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
                <div className="p-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenRegisterCommunity();
                    }}
                    className="w-full text-center py-1.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 font-medium transition-colors"
                  >
                    + Register New Sovereign Community
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action: Guided Demonstration Walkthrough */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onStartWalkthrough}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded border border-amber-500/60 bg-gradient-to-r from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20 text-amber-200 text-xs font-medium transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)] group"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
              <span>13-Step Civilizational Demonstration</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
