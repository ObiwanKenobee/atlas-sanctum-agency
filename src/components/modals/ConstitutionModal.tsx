import React, { useState } from 'react';
import { CommunityConstitution, RuleItem, Community } from '../../types/atlas';
import {
  FileCheck2,
  X,
  Plus,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Download,
  CheckCircle2,
  Code
} from 'lucide-react';

interface ConstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  community: Community;
  constitution: CommunityConstitution;
  onUpdateConstitution: (updated: CommunityConstitution) => void;
}

export const ConstitutionModal: React.FC<ConstitutionModalProps> = ({
  isOpen,
  onClose,
  community,
  constitution,
  onUpdateConstitution
}) => {
  const [activeTab, setActiveTab] = useState<'VIEW' | 'ADD_RULE' | 'JSON'>('VIEW');
  const [ruleType, setRuleType] = useState<'permitted' | 'restricted' | 'prohibited'>('permitted');

  // New rule state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<RuleItem['category']>('TRAINING');
  const [newMachineConstraint, setNewMachineConstraint] = useState('');

  if (!isOpen) return null;

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRule: RuleItem = {
      id: `rule-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      category: newCategory,
      machineConstraint: newMachineConstraint || undefined
    };

    const updated = {
      ...constitution,
      [ruleType]: [...constitution[ruleType], newRule],
      lastAmended: new Date().toISOString().split('T')[0]
    };

    onUpdateConstitution(updated);
    setNewTitle('');
    setNewDesc('');
    setNewMachineConstraint('');
    setActiveTab('VIEW');
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(constitution, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${community.id}-constitution.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0b101b] border border-amber-500/40 w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#080d16] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono-code text-amber-400 uppercase">
                Machine-Executable AI Governance Framework
              </div>
              <h2 className="text-base font-bold text-slate-100 font-serif-ancient">
                {community.name} Constitution (v{constitution.version})
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadJSON}
              className="px-2.5 py-1.5 rounded border border-slate-700 bg-slate-800 text-xs text-slate-300 hover:text-slate-100 flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON-LD</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-100 p-1.5 rounded hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="px-6 py-2 bg-[#0d1424] border-b border-slate-800 flex items-center space-x-3 text-xs">
          <button
            onClick={() => setActiveTab('VIEW')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'VIEW' ? 'bg-slate-700 text-amber-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Articles & Clauses
          </button>
          <button
            onClick={() => setActiveTab('ADD_RULE')}
            className={`px-3 py-1 rounded transition-colors flex items-center space-x-1 ${
              activeTab === 'ADD_RULE' ? 'bg-slate-700 text-amber-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3 h-3" />
            <span>Amend / Add Rule</span>
          </button>
          <button
            onClick={() => setActiveTab('JSON')}
            className={`px-3 py-1 rounded transition-colors flex items-center space-x-1 ${
              activeTab === 'JSON' ? 'bg-slate-700 text-amber-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3 h-3" />
            <span>Machine Schema</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'VIEW' && (
            <div className="space-y-6">
              {/* Preamble */}
              <div className="p-4 rounded-lg border border-slate-800 bg-[#070c14] space-y-2">
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-amber-400 font-bold">
                  Preamble & Sovereign Intent
                </span>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{constitution.preamble}"
                </p>
                <div className="text-[10px] text-slate-500 font-mono-code pt-1">
                  Last Amended: {constitution.lastAmended}
                </div>
              </div>

              {/* 3 Categories: Permitted, Restricted, Prohibited */}
              <div className="space-y-4">
                {/* Permitted */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono-code text-emerald-400 font-bold uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Permitted Uses ({constitution.permitted.length})</span>
                  </div>
                  <div className="space-y-2">
                    {constitution.permitted.map((p) => (
                      <div key={p.id} className="p-3 rounded border border-emerald-500/20 bg-emerald-950/10 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-100">{p.title}</span>
                          <span className="text-[10px] font-mono-code text-emerald-400">{p.category}</span>
                        </div>
                        <p className="text-slate-300">{p.description}</p>
                        {p.machineConstraint && (
                          <div className="p-1.5 rounded bg-slate-900 font-mono-code text-[10px] text-emerald-300 border border-emerald-500/30">
                            {p.machineConstraint}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restricted */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400 font-bold uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Restricted Uses ({constitution.restricted.length})</span>
                  </div>
                  <div className="space-y-2">
                    {constitution.restricted.map((r) => (
                      <div key={r.id} className="p-3 rounded border border-amber-500/20 bg-amber-950/10 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-100">{r.title}</span>
                          <span className="text-[10px] font-mono-code text-amber-400">{r.category}</span>
                        </div>
                        <p className="text-slate-300">{r.description}</p>
                        {r.conditions && (
                          <div className="pt-1 text-[11px] text-slate-400">
                            <span className="text-amber-400 font-mono-code">Mandatory Conditions:</span>
                            <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
                              {r.conditions.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {r.approvalBody && (
                          <div className="text-[10px] font-mono-code text-slate-500">
                            Approval Authority: {r.approvalBody}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prohibited */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono-code text-rose-400 font-bold uppercase">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Prohibited Inviolables ({constitution.prohibited.length})</span>
                  </div>
                  <div className="space-y-2">
                    {constitution.prohibited.map((pr) => (
                      <div key={pr.id} className="p-3 rounded border border-rose-500/20 bg-rose-950/10 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-100">{pr.title}</span>
                          <span className="text-[10px] font-mono-code text-rose-400">{pr.category}</span>
                        </div>
                        <p className="text-slate-300">{pr.description}</p>
                        {pr.enforcementAction && (
                          <div className="p-1.5 rounded bg-rose-950/50 font-mono-code text-[10px] text-rose-300 border border-rose-500/30">
                            Automated Enforcement: {pr.enforcementAction}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Appeal & Redress Protocols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded border border-slate-800 bg-[#070c14] space-y-1 text-xs">
                  <div className="font-mono-code text-slate-400 uppercase font-bold text-[10px]">
                    Appeal Mechanism (Section VI)
                  </div>
                  <p className="text-slate-300">{constitution.appealProcess}</p>
                </div>
                <div className="p-3.5 rounded border border-slate-800 bg-[#070c14] space-y-1 text-xs">
                  <div className="font-mono-code text-slate-400 uppercase font-bold text-[10px]">
                    Redress Protocol (Section VI)
                  </div>
                  <p className="text-slate-300">{constitution.redressProtocol}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ADD_RULE' && (
            <form onSubmit={handleAddRule} className="space-y-4">
              <h3 className="text-sm font-semibold font-serif-ancient text-slate-200">
                Draft New Machine-Executable Constitutional Clause
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                    Rule Tier
                  </label>
                  <select
                    value={ruleType}
                    onChange={(e) => setRuleType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                  >
                    <option value="permitted">Permitted Use</option>
                    <option value="restricted">Restricted (Conditional)</option>
                    <option value="prohibited">Prohibited (Inviolable Refusal)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                  >
                    <option value="TRAINING">Model Training</option>
                    <option value="CREATION">Content Creation</option>
                    <option value="ATTRIBUTION">Attribution & Provenance</option>
                    <option value="COMMERCIAL">Commercial Monetization</option>
                    <option value="SACRED_PRESERVATION">Sacred Preservation</option>
                    <option value="GOVERNANCE">Governance & Audit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Clause Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Inviolable Watermarking on Archival Folk Vocals"
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Full Clause Prose & Conditions
                </label>
                <textarea
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Specify who is bound, under what circumstances, and requirements..."
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Machine-Executable Constraint Syntax
                </label>
                <input
                  type="text"
                  value={newMachineConstraint}
                  onChange={(e) => setNewMachineConstraint(e.target.value)}
                  placeholder="e.g. EGRESS: LOCAL_ENCLAVE_ONLY; WATERMARK: C2PA_LEVEL4;"
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono-code focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs"
                >
                  Ratify Clause into Constitution
                </button>
              </div>
            </form>
          )}

          {activeTab === 'JSON' && (
            <div className="space-y-2">
              <span className="text-xs font-mono-code text-slate-400">
                Machine-Readable JSON-LD Representation (For Machine Gate & Smart Audits):
              </span>
              <pre className="p-4 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono-code text-xs max-h-96 overflow-y-auto">
                {JSON.stringify(constitution, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
