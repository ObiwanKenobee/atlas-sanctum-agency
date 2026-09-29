import React, { useState } from 'react';
import { Challenge, ChallengeEvidence, Community, CommunityConstitution } from '../../types/atlas';
import {
  Gavel,
  ShieldAlert,
  AlertTriangle,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  RotateCw
} from 'lucide-react';

interface TribunalViewProps {
  community: Community;
  constitution: CommunityConstitution;
  challenges: Challenge[];
  onVoteChallenge: (challengeId: string, voteType: 'APPROVE' | 'REJECT') => void;
  onSubmitChallenge: (challenge: Omit<Challenge, 'id' | 'votes' | 'submittedAt'>) => void;
  onEnforceRefusalInjunction: (challengeId: string) => void;
}

export const TribunalView: React.FC<TribunalViewProps> = ({
  community,
  constitution,
  challenges,
  onVoteChallenge,
  onSubmitChallenge,
  onEnforceRefusalInjunction
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    challenges[0]?.id ?? ''
  );
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [judicialAnalysis, setJudicialAnalysis] = useState<any>(null);

  // New challenge form state
  const [newTitle, setNewTitle] = useState('');
  const [newTargetModel, setNewTargetModel] = useState('');
  const [newAllegedHarm, setNewAllegedHarm] = useState('');
  const [newHarmCategory, setNewHarmCategory] = useState<Challenge['harmCategory']>('EXTRACTION');
  const [newEvidenceSnippet, setNewEvidenceSnippet] = useState('');

  const selectedChallenge =
    challenges.find((c) => c.id === selectedChallengeId) || challenges[0];

  const handleAnalyzeWithAI = async (challenge: Challenge) => {
    setIsAnalyzing(true);
    setJudicialAnalysis(null);
    try {
      const response = await fetch('/api/gemini/analyze-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: challenge.title,
          community: community.name,
          allegedHarm: challenge.allegedHarm,
          targetModel: challenge.targetModel,
          evidenceSnippet: challenge.evidenceArtifacts.map((e) => e.snippet).join('\n')
        })
      });

      const data = await response.json();
      setJudicialAnalysis(data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAllegedHarm.trim()) return;

    onSubmitChallenge({
      communityId: community.id,
      title: newTitle,
      targetModel: newTargetModel || 'Undisclosed Model Architecture',
      reporter: 'Civilian Custodian / Rights Holder',
      status: 'COMMUNITY_REVIEW',
      allegedHarm: newAllegedHarm,
      harmCategory: newHarmCategory,
      evidenceArtifacts: [
        {
          id: `ev-${Date.now()}`,
          title: 'Forensic Extraction Log',
          type: 'OUTPUT_DUMP',
          snippet: newEvidenceSnippet || 'Prompt dump matches protected work with 88% similarity.',
          collectedAt: new Date().toISOString()
        }
      ]
    });

    setNewTitle('');
    setNewTargetModel('');
    setNewAllegedHarm('');
    setNewEvidenceSnippet('');
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
              <Gavel className="w-4 h-4" />
              <span>THE TRIBUNAL · PUBLIC AI CHALLENGE REGISTRY (SECTION XI)</span>
            </div>
            <h1 className="text-2xl font-bold font-serif-ancient text-slate-100 mt-1">
              Public Interest Judicial & Forensic Injunctions
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Where affected creators, communities, and archivists contest AI deployments, submit forensic evidence, and issue legally & technologically binding injunctions.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5 shadow-sm flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Submit Formal AI Challenge</span>
          </button>
        </div>

        {/* 11-Stage Lifecycle Explanatory Tracker */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 mb-2">
            Section XI Accountable Lifecycle Protocol:
          </div>
          <div className="flex items-center space-x-1 overflow-x-auto text-[11px] font-mono-code text-slate-400 pb-1 scrollbar-none">
            {[
              'System Identified',
              'Use Documented',
              'Concern Submitted',
              'Evidence Attached',
              'Community Review',
              'Technical Analysis',
              'Governance Decision',
              'Remediation Enforced',
              'Refusal Halted'
            ].map((step, idx, arr) => (
              <React.Fragment key={step}>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 whitespace-nowrap">
                  {step}
                </span>
                {idx < arr.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Docket List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400 px-1">
            Active Docket ({challenges.length} Matters)
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto">
            {challenges.map((c) => {
              const isSelected = c.id === selectedChallengeId;
              const isInjunction = c.status === 'REFUSAL_INJUNCTION';

              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedChallengeId(c.id);
                    setJudicialAnalysis(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-sky-500/50 bg-sky-950/20 text-slate-100'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-semibold truncate leading-tight">
                      {c.title}
                    </span>
                    <span
                      className={`text-[9px] font-mono-code uppercase px-1.5 py-0.2 rounded font-bold flex-shrink-0 ${
                        isInjunction
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}
                    >
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-mono-code mt-1 truncate">
                    Target: {c.targetModel}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono-code mt-0.5 truncate">
                    Harm: {c.harmCategory} · Filed {new Date(c.submittedAt).toLocaleDateString()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case File & Judicial Deliberation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedChallenge ? (
            <div className="rounded-lg border border-slate-800 bg-[#090e17] p-5 space-y-5">
              {/* Case Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-slate-800 gap-3">
                <div>
                  <span className="text-[11px] font-mono-code text-amber-400 uppercase">
                    Case Matter #{selectedChallenge.id} · Category: {selectedChallenge.harmCategory}
                  </span>
                  <h2 className="text-xl font-bold font-serif-ancient text-slate-100 mt-0.5">
                    {selectedChallenge.title}
                  </h2>
                  <div className="text-xs text-slate-400">
                    Target System: <span className="text-amber-300 font-mono-code">{selectedChallenge.targetModel}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAnalyzeWithAI(selectedChallenge)}
                    disabled={isAnalyzing}
                    className="px-3 py-1.5 rounded border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 text-xs font-medium transition-colors flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>Judicial AI Analysis</span>
                  </button>
                </div>
              </div>

              {/* Alleged Harm Description */}
              <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="text-rose-400 font-semibold font-mono-code">Documented Harm: </span>
                {selectedChallenge.allegedHarm}
              </div>

              {/* Attached Evidence Artifacts */}
              <div className="space-y-2">
                <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Forensic Evidence Artifacts ({selectedChallenge.evidenceArtifacts.length})</span>
                </div>

                {selectedChallenge.evidenceArtifacts.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 rounded border border-slate-800 bg-[#070c14] space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{ev.title}</span>
                      <span className="text-[10px] font-mono-code text-slate-500">
                        {ev.type} · {new Date(ev.collectedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <pre className="p-2 rounded bg-slate-900 border border-slate-800 font-mono-code text-[11px] text-slate-300 whitespace-pre-wrap">
                      {ev.snippet}
                    </pre>
                  </div>
                ))}
              </div>

              {/* AI Judicial Rapporteur finding (if requested) */}
              {judicialAnalysis && (
                <div className="p-4 rounded border border-amber-500/40 bg-amber-950/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code uppercase text-amber-400 font-bold flex items-center space-x-1.5">
                      <Scale className="w-4 h-4" />
                      <span>Judicial Rapporteur Finding (Severity: {judicialAnalysis.severity})</span>
                    </span>
                  </div>
                  <p className="text-slate-200 italic leading-relaxed">
                    "{judicialAnalysis.rationale}"
                  </p>
                  <div className="pt-1 text-[11px] text-slate-400 font-mono-code">
                    Recommended Action: <span className="text-amber-300 font-bold">{judicialAnalysis.recommendedTribunalAction}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono-code">
                    Remediation: {judicialAnalysis.recommendedRemediation}
                  </div>
                </div>
              )}

              {/* Binding Verdict & Constitutional Clause */}
              {selectedChallenge.tribunalVerdict && (
                <div className="p-3.5 rounded bg-slate-950 border border-amber-500/30 text-xs space-y-1">
                  <div className="text-amber-400 font-mono-code uppercase font-semibold">
                    Binding Judicial Verdict:
                  </div>
                  <p className="text-slate-200">{selectedChallenge.tribunalVerdict}</p>
                  {selectedChallenge.constitutionalClauseTriggered && (
                    <div className="text-[11px] text-slate-400 font-mono-code pt-1">
                      Clause Grounding: {selectedChallenge.constitutionalClauseTriggered}
                    </div>
                  )}
                  {selectedChallenge.remediationEnforced && (
                    <div className="text-[11px] text-emerald-400 font-mono-code pt-0.5">
                      Remedy Active: {selectedChallenge.remediationEnforced}
                    </div>
                  )}
                </div>
              )}

              {/* Voting Bar on Injunction */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400 font-mono-code">
                  Community Consensus: {selectedChallenge.votes.approve} Ratified · {selectedChallenge.votes.reject} Rejected
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onVoteChallenge(selectedChallenge.id, 'APPROVE')}
                    className="px-3 py-1.5 rounded border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 text-xs font-medium flex items-center space-x-1"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Ratify Injunction</span>
                  </button>

                  {selectedChallenge.status !== 'REFUSAL_INJUNCTION' && (
                    <button
                      onClick={() => onEnforceRefusalInjunction(selectedChallenge.id)}
                      className="px-3.5 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Enforce Machine Refusal Gate</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">Select a case matter from the docket.</div>
          )}
        </div>
      </div>

      {/* Modal: Submit Challenge */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b101b] border border-slate-700 w-full max-w-xl rounded-lg shadow-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold font-serif-ancient text-slate-100">
              Submit Formal AI Challenge to Tribunal
            </h2>
            <p className="text-xs text-slate-400">
              Lodge an official grievance concerning unconsented data scraping, style displacement, or cultural harm.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Challenge Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Unconsented Style Emulation of Living Translator"
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                    Target AI Model / Entity
                  </label>
                  <input
                    type="text"
                    required
                    value={newTargetModel}
                    onChange={(e) => setNewTargetModel(e.target.value)}
                    placeholder="e.g. Foundation Model v4"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                    Harm Category
                  </label>
                  <select
                    value={newHarmCategory}
                    onChange={(e) => setNewHarmCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                  >
                    <option value="EXTRACTION">Extraction / Scraping</option>
                    <option value="MISREPRESENTATION">Misrepresentation</option>
                    <option value="UNCONSENTED_SYNTHESIS">Unconsented Synthesis</option>
                    <option value="ECONOMIC_DISPLACEMENT">Economic Displacement</option>
                    <option value="SACRED_VIOLATION">Sacred Heritage Violation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Documented Harm Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={newAllegedHarm}
                  onChange={(e) => setNewAllegedHarm(e.target.value)}
                  placeholder="Describe the nature of the extraction, lack of consent, or cultural injury..."
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Evidence Snippet / Prompt Log Trace
                </label>
                <textarea
                  rows={3}
                  value={newEvidenceSnippet}
                  onChange={(e) => setNewEvidenceSnippet(e.target.value)}
                  placeholder="Paste verbatim prompt logs, API outputs, or scraper hash traces..."
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 font-mono-code"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
                >
                  File Formal Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
