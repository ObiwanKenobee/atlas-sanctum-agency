import React, { useState } from 'react';
import { CulturalWork, ProvenanceNode, Community } from '../../types/atlas';
import {
  Archive,
  Search,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Lock,
  Plus,
  ArrowRight,
  ExternalLink,
  X,
  FileText,
  Clock,
  User,
  CheckCircle2
} from 'lucide-react';

interface ArchiveVaultViewProps {
  community: Community;
  works: CulturalWork[];
  onOpenRegisterWork: () => void;
  onSelectWorkForConsent: (work: CulturalWork) => void;
}

export const ArchiveVaultView: React.FC<ArchiveVaultViewProps> = ({
  community,
  works,
  onOpenRegisterWork,
  onSelectWorkForConsent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvenanceWork, setSelectedProvenanceWork] = useState<CulturalWork | null>(null);
  const [filterSacred, setFilterSacred] = useState<boolean | null>(null);

  const filteredWorks = works.filter((w) => {
    const matchesSearch =
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.lineageOrTradition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSacred = filterSacred === null ? true : w.isSacred === filterSacred;
    return matchesSearch && matchesSacred;
  });

  return (
    <div className="space-y-6">
      {/* Archive Header */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
              <Archive className="w-4 h-4" />
              <span>THE ARCHIVE & KNOWLEDGE VAULT</span>
            </div>
            <h1 className="text-2xl font-bold font-serif-ancient text-slate-100 mt-1">
              Governed Cultural Artifacts & Lineage Records
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Living repository of community works protected from unconsented synthetic extraction, with immutable 8-node provenance trails.
            </p>
          </div>

          <button
            onClick={onOpenRegisterWork}
            className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors flex items-center space-x-1.5 shadow-sm flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Register Cultural Work</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, creator, tradition, or cultural significance..."
              className="w-full pl-9 pr-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterSacred(null)}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                filterSacred === null
                  ? 'bg-slate-700 text-amber-300 font-medium'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Works ({works.length})
            </button>
            <button
              onClick={() => setFilterSacred(true)}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                filterSacred === true
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40 font-medium'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Sacred / Protected Lineage
            </button>
            <button
              onClick={() => setFilterSacred(false)}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                filterSacred === false
                  ? 'bg-slate-700 text-slate-200 font-medium'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Secular / Public Literature
            </button>
          </div>
        </div>
      </div>

      {/* Cultural Works List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWorks.map((work) => (
          <div
            key={work.id}
            className="rounded-lg border border-slate-800 hover:border-amber-500/40 bg-[#090e17] p-5 flex flex-col justify-between space-y-4 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="text-[11px] text-slate-400 font-mono-code uppercase">
                  {work.medium} · {work.yearOrigin}
                </div>
                {work.isSacred && (
                  <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded border border-amber-500/40 bg-amber-950/20 text-amber-300">
                    Sacred Lineage
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100 font-serif-ancient leading-snug">
                  {work.title}
                </h3>
                <div className="text-xs text-amber-400/90 font-medium mt-0.5">
                  by {work.creator}
                </div>
                <div className="text-[11px] text-slate-400">
                  {work.lineageOrTradition}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {work.culturalSignificance}
              </p>

              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80 text-[11px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Consent State:</span>
                  <span
                    className={`font-mono-code font-semibold ${
                      work.consent.status === 'ACTIVE'
                        ? 'text-emerald-400'
                        : work.consent.status === 'REVOKED'
                        ? 'text-rose-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {work.consent.status}
                  </span>
                </div>
                <div className="text-slate-400 truncate">
                  Authority: {work.consent.authorizedBy}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => setSelectedProvenanceWork(work)}
                className="text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>8-Node Provenance</span>
              </button>

              <button
                onClick={() => onSelectWorkForConsent(work)}
                className="text-slate-400 hover:text-slate-200 flex items-center space-x-1"
              >
                <span>Edit Living Consent</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive 8-Node Provenance Graph Modal */}
      {selectedProvenanceWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0b101b] border border-amber-500/40 w-full max-w-4xl rounded-lg shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
                  <GitBranch className="w-4 h-4" />
                  <span>ATLAS PROVENANCE GRAPH · VERIFIABLE AUDIT CHAIN</span>
                </div>
                <h2 className="text-xl font-bold font-serif-ancient text-slate-100 mt-1">
                  {selectedProvenanceWork.title}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Creator: {selectedProvenanceWork.creator} · Lineage: {selectedProvenanceWork.lineageOrTradition}
                </div>
              </div>

              <button
                onClick={() => setSelectedProvenanceWork(null)}
                className="text-slate-400 hover:text-slate-100 p-1.5 rounded hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanatory banner */}
            <div className="p-3.5 rounded bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-300">Section VIII Protocol: </span>
              Traces unbroken chain of custody from human origin through context, custodial repository, governed dataset, downstream AI models, and real-world outcomes. A system that cannot explain where material originated cannot be held accountable.
            </div>

            {/* 8-Stage Visual Nodes */}
            <div className="space-y-3 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-sky-500 before:to-emerald-500">
              {selectedProvenanceWork.provenanceChain.map((node, index) => (
                <div key={node.id} className="relative flex items-start space-x-4 pl-2">
                  <div className="w-7 h-7 rounded-full bg-slate-900 border border-amber-500 flex items-center justify-center text-amber-300 text-xs font-mono-code z-10 font-bold shadow-md">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-3.5 rounded-lg border border-slate-800 bg-[#070c14] hover:border-slate-700 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono-code font-bold uppercase text-amber-400">
                          {node.type}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-xs font-semibold text-slate-100">
                          {node.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono-code">
                        {node.timestamp ? new Date(node.timestamp).toLocaleDateString() : 'Historical Covenant'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {node.detail}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-code text-slate-500">
                      <span>Cryptographic Seal: {node.signatureHash}</span>
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Tamper Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedProvenanceWork(null)}
                className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                Close Provenance Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
