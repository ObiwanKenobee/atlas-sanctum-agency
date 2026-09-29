import React from 'react';
import { SystemArchetype } from '../types/atlas';
import {
  LayoutDashboard,
  Users2,
  Archive,
  KeyRound,
  Wrench,
  Binary,
  Gavel,
  ShieldAlert,
  Compass,
  Coins
} from 'lucide-react';

interface NavigationProps {
  currentTab: SystemArchetype;
  onSelectTab: (tab: SystemArchetype) => void;
  refusalsCount: number;
  challengesCount: number;
  proposalsCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  refusalsCount,
  challengesCount,
  proposalsCount
}) => {
  const tabs = [
    {
      id: 'mission_control' as SystemArchetype,
      label: 'Mission Control',
      sublabel: 'Command Center',
      icon: LayoutDashboard
    },
    {
      id: 'agora' as SystemArchetype,
      label: 'The Agora',
      sublabel: 'Deliberation & Votes',
      icon: Users2,
      count: proposalsCount
    },
    {
      id: 'archive' as SystemArchetype,
      label: 'The Archive',
      sublabel: 'Works & Provenance',
      icon: Archive
    },
    {
      id: 'commons' as SystemArchetype,
      label: 'Consent Registry',
      sublabel: 'Living Permissions',
      icon: KeyRound
    },
    {
      id: 'workshop' as SystemArchetype,
      label: 'The Workshop',
      sublabel: 'Datasets & Models',
      icon: Wrench
    },
    {
      id: 'evaluator' as SystemArchetype,
      label: 'Evaluation Engine',
      sublabel: '10-Dimension Audit',
      icon: Binary
    },
    {
      id: 'tribunal' as SystemArchetype,
      label: 'The Tribunal',
      sublabel: 'Challenges & Injunctions',
      icon: Gavel,
      count: challengesCount
    },
    {
      id: 'refusal_layer' as SystemArchetype,
      label: 'The Refusal Layer',
      sublabel: 'Machine Enforcement',
      icon: ShieldAlert,
      count: refusalsCount,
      alert: refusalsCount > 0
    },
    {
      id: 'observatory' as SystemArchetype,
      label: 'The Observatory',
      sublabel: 'Human Agency Index',
      icon: Compass
    },
    {
      id: 'bridge_economy' as SystemArchetype,
      label: 'The Bridge',
      sublabel: 'Economic Realities',
      icon: Coins
    }
  ];

  return (
    <nav className="border-b border-slate-800 bg-[#090e17] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center space-x-2.5 px-3 py-2 rounded text-left transition-all flex-shrink-0 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 ${
                isActive
                  ? 'bg-slate-800/90 text-amber-200 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive
                    ? 'text-amber-400'
                    : tab.alert
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }`}
              />
              <div className="text-left">
                <div className="text-xs font-medium leading-none flex items-center space-x-1.5">
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono-code px-1 rounded ${
                        isActive
                          ? 'bg-amber-400/20 text-amber-300'
                          : tab.alert
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-none">
                  {tab.sublabel}
                </div>
              </div>
              {isActive && (
                <div className="absolute -bottom-2 left-3 right-3 h-[2px] bg-amber-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
