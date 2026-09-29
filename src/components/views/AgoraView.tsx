import React, { useState } from 'react';
import { Community, CommunityConstitution, AgoraProposal } from '../../types/atlas';
import {
  Users2,
  FileCheck2,
  ThumbsUp,
  ThumbsDown,
  Plus,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  Filter
} from 'lucide-react';

interface AgoraViewProps {
  community: Community;
  constitution: CommunityConstitution;
  proposals: AgoraProposal[];
  onVoteProposal: (proposalId: string, voteType: 'FOR' | 'AGAINST') => void;
  onCreateProposal: (proposal: Omit<AgoraProposal, 'id' | 'votesFor' | 'votesAgainst' | 'quorumReached' | 'status'>) => void;
  onOpenConstitution: () => void;
}

export const AgoraView: React.FC<AgoraViewProps> = ({
  community,
  constitution,
  proposals,
  onVoteProposal,
  onCreateProposal,
  onOpenConstitution
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // New proposal form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<AgoraProposal['category']>('CONSTITUTIONAL_AMENDMENT');
  const [newDescription, setNewDescription] = useState('');
  const [newRationale, setNewRationale] = useState('');
  const [newProposedBy, setNewProposedBy] = useState('');

  const filteredProposals = proposals.filter((p) => {
    if (filterCategory === 'ALL') return true;
    return p.category === filterCategory;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    onCreateProposal({
      communityId: community.id,
      title: newTitle,
      category: newCategory,
      description: newDescription,
      rationale: newRationale || 'Essential to maintaining community agency and preventing unauthorized extraction.',
      proposedBy: newProposedBy || 'General Assembly Member',
      deadline: '2026-11-01'
    });

    setNewTitle('');
    setNewDescription('');
    setNewRationale('');
    setNewProposedBy('');
    setShowCreateModal(false);
  };

  const handleExportConstitutionJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(constitution, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${community.id}-constitution.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Agora Header & Civic Charter */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
              <Users2 className="w-4 h-4" />
              <span>THE AGORA · DELIBERATIVE ASSEMBLY</span>
            </div>
            <h1 className="text-2xl font-bold font-serif-ancient text-slate-100 mt-1">
              Democratic AI Governance Chamber
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Where affected creators, historians, and custodians debate proposals, cast sovereign ballots, and amend the AI Constitution.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportConstitutionJSON}
              className="px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Constitution JSON-LD</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Draft New Proposal</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80">
          <span className="text-xs text-slate-500 font-mono-code flex items-center space-x-1 mr-2">
            <Filter className="w-3 h-3" />
            <span>FILTER:</span>
          </span>
          {[
            { id: 'ALL', label: 'All Proposals' },
            { id: 'CONSTITUTIONAL_AMENDMENT', label: 'Constitutional Amendments' },
            { id: 'REFUSAL_INJUNCTION', label: 'Refusal Injunctions' },
            { id: 'ECONOMIC_COMPENSATION', label: 'Economic Compensation' },
            { id: 'EMERGENCY_PROTECTION', label: 'Emergency Protection' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                filterCategory === cat.id
                  ? 'bg-slate-700 text-amber-300 font-medium'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Proposals Stream */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProposals.map((proposal) => {
          const totalVotes = proposal.votesFor + proposal.votesAgainst;
          const forPercent = totalVotes > 0 ? Math.round((proposal.votesFor / totalVotes) * 100) : 0;

          return (
            <div
              key={proposal.id}
              className="rounded-lg border border-slate-800 bg-[#090e17] p-5 hover:border-slate-700 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="font-mono-code text-amber-400 font-medium">
                      {proposal.category.replace('_', ' ')}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>Proposed by {proposal.proposedBy}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center space-x-1 text-slate-400">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Voting closes {proposal.deadline}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 font-serif-ancient mt-1">
                    {proposal.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[11px] font-mono-code uppercase px-2.5 py-0.5 rounded border ${
                      proposal.status === 'PASSED'
                        ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                        : proposal.status === 'OPEN'
                        ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                        : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}
                  >
                    {proposal.status}
                  </span>
                </div>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed">
                {proposal.description}
              </div>

              <div className="p-3 rounded bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
                <span className="text-[10px] font-mono-code text-amber-400/90 uppercase tracking-wider">
                  Ethical & Legal Rationale:
                </span>
                <p className="text-slate-300 italic">{proposal.rationale}</p>
              </div>

              {/* Voting Bar & Actions */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
                {/* Vote Tally */}
                <div className="flex-1 max-w-md">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono-code">
                    <span>Aye: {proposal.votesFor.toLocaleString()} ({forPercent}%)</span>
                    <span>Nay: {proposal.votesAgainst.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      className="bg-emerald-500 transition-all duration-500"
                      style={{ width: `${forPercent}%` }}
                    />
                    <div
                      className="bg-rose-500 transition-all duration-500"
                      style={{ width: `${100 - forPercent}%` }}
                    />
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500 flex items-center justify-between font-mono-code">
                    <span>Quorum: {proposal.quorumReached ? 'Met (Verified)' : 'Pending'}</span>
                    <span>Total Ballots: {totalVotes.toLocaleString()}</span>
                  </div>
                </div>

                {/* Vote Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onVoteProposal(proposal.id, 'FOR')}
                    className="px-3 py-1.5 rounded border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 text-xs font-medium transition-colors flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Affirm (Aye)</span>
                  </button>
                  <button
                    onClick={() => onVoteProposal(proposal.id, 'AGAINST')}
                    className="px-3 py-1.5 rounded border border-rose-500/40 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 text-xs font-medium transition-colors flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-400"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>Contest (Nay)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Draft Proposal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b101b] border border-slate-700 w-full max-w-xl rounded-lg shadow-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold font-serif-ancient text-slate-100">
              Draft Constitutional Proposal
            </h2>
            <p className="text-xs text-slate-400">
              Submit a binding amendment, refusal injunction, or collective royalty mandate to the Agora.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Proposal Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Mandatory 15% Collective Stewardship Royalty on Commercial Image Diffusion"
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                  >
                    <option value="CONSTITUTIONAL_AMENDMENT">Constitutional Amendment</option>
                    <option value="REFUSAL_INJUNCTION">Refusal Injunction</option>
                    <option value="ECONOMIC_COMPENSATION">Economic Compensation</option>
                    <option value="EMERGENCY_PROTECTION">Emergency Protection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                    Proposed By / Caucus
                  </label>
                  <input
                    type="text"
                    value={newProposedBy}
                    onChange={(e) => setNewProposedBy(e.target.value)}
                    placeholder="e.g. Translation Rights Syndicate"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Binding Legislative Text & Action
                </label>
                <textarea
                  required
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the operational constraint, dataset rule, or model restriction..."
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Ethical & Civilizational Rationale
                </label>
                <textarea
                  rows={2}
                  value={newRationale}
                  onChange={(e) => setNewRationale(e.target.value)}
                  placeholder="Why does this proposal preserve human dignity or sovereignty?"
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs"
                >
                  Submit to Agora Ballot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
