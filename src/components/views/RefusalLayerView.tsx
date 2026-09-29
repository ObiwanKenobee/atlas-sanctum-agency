import React, { useState } from 'react';
import { RefusalEvent, CulturalWork, CommunityDataset, ConnectedAIModel, Community } from '../../types/atlas';
import {
  ShieldAlert,
  Play,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Download,
  Filter,
  Lock,
  Layers,
  Terminal,
  Cpu,
  KeyRound,
  FileCheck2
} from 'lucide-react';

interface RefusalLayerViewProps {
  community: Community;
  works: CulturalWork[];
  datasets: CommunityDataset[];
  models: ConnectedAIModel[];
  refusals: RefusalEvent[];
  onAddRefusalEvent: (event: RefusalEvent) => void;
  prefillWorkId?: string;
}

export const RefusalLayerView: React.FC<RefusalLayerViewProps> = ({
  community,
  works,
  datasets,
  models,
  refusals,
  onAddRefusalEvent,
  prefillWorkId
}) => {
  const [selectedWorkId, setSelectedWorkId] = useState<string>(
    prefillWorkId || (works[0]?.id ?? '')
  );
  const [requester, setRequester] = useState('Commercial Game Studio Scraper (Cloud IP: 198.51.100.42)');
  const [selectedModelId, setSelectedModelId] = useState(models[0]?.name || 'AnthropoSynth-V4');
  const [intendedUse, setIntendedUse] = useState('Commercial Generative Model Training for Fantasy Lore');
  const [isCommercial, setIsCommercial] = useState(true);
  const [attributionGuaranteed, setAttributionGuaranteed] = useState(false);

  const [isSimulating, setIsSimulating] = useState(false);
  const [lastGateResponse, setLastGateResponse] = useState<any>(null);
  const [filterVerdict, setFilterVerdict] = useState<string>('ALL');

  const selectedWork = works.find((w) => w.id === selectedWorkId) || works[0];

  const handleTestGate = async () => {
    setIsSimulating(true);
    setLastGateResponse(null);

    const isConsentRevoked = selectedWork?.consent.status === 'REVOKED';
    const isSacred = Boolean(selectedWork?.isSacred);

    try {
      const response = await fetch('/api/governance/refusal-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          communityId: community.id,
          datasetId: selectedWork?.datasetId || 'dataset-general',
          workTitle: selectedWork?.title || 'Selected Work',
          requester,
          modelId: selectedModelId,
          intendedUse,
          isCommercial,
          attributionGuaranteed,
          consentRevoked: isConsentRevoked,
          isSacredOrRestricted: isSacred
        })
      });

      const data = await response.json();
      setLastGateResponse(data);

      const newEvent: RefusalEvent = {
        id: `ref-${Date.now()}`,
        timestamp: data.timestamp || new Date().toISOString(),
        requester: data.requester,
        modelId: data.modelId,
        workOrDataset: selectedWork?.title || 'Governed Artifact',
        intendedUse: data.intendedUse,
        verdict: data.verdict,
        constitutionalClause: data.violations?.[0] || 'Article I: Normal Permitted Access',
        reasonCode: data.verdict === 'REFUSED' ? 'HALTED_BY_COMMUNITY_CONSTITUTION' : 'CLEARED_BY_COMMONS',
        signatureHash: data.tamperEvidentSignature || '0x9944bb11cc33aa77',
        appealed: false
      };

      onAddRefusalEvent(newEvent);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  const filteredRefusals = refusals.filter((r) => {
    if (filterVerdict === 'ALL') return true;
    return r.verdict === filterVerdict;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6">
        <div className="flex items-center space-x-2 text-xs font-mono-code text-rose-400">
          <ShieldAlert className="w-4 h-4" />
          <span>ATLAS REFUSAL LAYER · MACHINE-ENFORCEABLE BOUNDARIES (SECTION XII)</span>
        </div>
        <h1 className="text-2xl font-bold font-serif-ancient text-slate-100 mt-1">
          Machine-Enforced Refusal & Boundary Gate
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Making refusal a first-class technical capability: ensuring that when a community says "NO", software and network proxies mechanically halt unauthorized execution.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Gate Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-lg border border-slate-800 bg-[#090e17] p-5 space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-semibold font-serif-ancient text-slate-200 uppercase tracking-wider">
                Refusal Gate Test Terminal
              </h2>
            </div>

            {/* Target Work Selector */}
            <div>
              <label className="block text-xs font-mono-code text-slate-400 uppercase mb-1">
                Target Cultural Work
              </label>
              <select
                value={selectedWorkId}
                onChange={(e) => setSelectedWorkId(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500"
              >
                {works.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.title} ({w.isSacred ? 'Sacred' : 'Secular'} · {w.consent.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Requester Persona */}
            <div>
              <label className="block text-xs font-mono-code text-slate-400 uppercase mb-1">
                Requester / Agent Identity
              </label>
              <input
                type="text"
                value={requester}
                onChange={(e) => setRequester(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500"
              />
            </div>

            {/* Intended Model */}
            <div>
              <label className="block text-xs font-mono-code text-slate-400 uppercase mb-1">
                Calling Model / Pipeline
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
                <option value="Generic Untrusted Web Crawler">Generic Untrusted Web Crawler</option>
              </select>
            </div>

            {/* Intended Use Description */}
            <div>
              <label className="block text-xs font-mono-code text-slate-400 uppercase mb-1">
                Declared Intended Use
              </label>
              <input
                type="text"
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500"
              />
            </div>

            {/* Condition Checkboxes */}
            <div className="space-y-2 pt-1 border-t border-slate-800">
              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCommercial}
                  onChange={(e) => setIsCommercial(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0"
                />
                <span>Commercial Deployment Intent</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={attributionGuaranteed}
                  onChange={(e) => setAttributionGuaranteed(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0"
                />
                <span>Cryptographic Provenance Attribution Guaranteed</span>
              </label>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleTestGate}
              disabled={isSimulating}
              className="w-full py-2.5 px-4 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Machine Boundaries...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Execute Boundary Enforcement Check</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Gate Verdict & Real-Time Refusal Ledger (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Live Gate Output Display */}
          {lastGateResponse && (
            <div
              className={`rounded-lg border p-5 space-y-4 transition-all ${
                lastGateResponse.verdict === 'REFUSED'
                  ? 'border-rose-500/60 bg-rose-950/20'
                  : 'border-emerald-500/60 bg-emerald-950/20'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  {lastGateResponse.verdict === 'REFUSED' ? (
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  <span className="font-serif-ancient text-sm font-bold uppercase text-slate-100">
                    Machine Refusal Gate Result: {lastGateResponse.verdict}
                  </span>
                </div>

                <span
                  className={`text-[11px] font-mono-code px-2.5 py-0.5 rounded font-bold uppercase ${
                    lastGateResponse.verdict === 'REFUSED'
                      ? 'bg-rose-500/30 text-rose-300'
                      : 'bg-emerald-500/30 text-emerald-300'
                  }`}
                >
                  {lastGateResponse.status}
                </span>
              </div>

              {/* Violations Triggered */}
              {lastGateResponse.violations?.length > 0 ? (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono-code uppercase text-rose-400 font-bold block">
                    Triggered Constitutional Inviolables:
                  </span>
                  {lastGateResponse.violations.map((v: string, i: number) => (
                    <div
                      key={i}
                      className="p-2.5 rounded bg-slate-950/80 border border-rose-500/30 text-xs font-mono-code text-rose-200"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                  Execution authorized under Community AI Constitution Article IV. Intended use matches active educational/creative covenants.
                </div>
              )}

              {/* Tamper Evident Details */}
              <div className="p-3 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono-code text-slate-400 space-y-1">
                <div>Enforcement Node: {lastGateResponse.enforcementNode}</div>
                <div>Cryptographic Receipt: {lastGateResponse.tamperEvidentSignature}</div>
                <div className="text-amber-400/90 pt-0.5">
                  Remedy Protocol: {lastGateResponse.constitutionalRemedy}
                </div>
              </div>
            </div>
          )}

          {/* Historical Refusal Ledger Table */}
          <div className="rounded-lg border border-slate-800 bg-[#090e17] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-semibold font-serif-ancient text-slate-100 uppercase tracking-wider">
                  Immutable Machine Refusal Ledger
                </h3>
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-1 text-xs">
                {['ALL', 'REFUSED', 'AUTHORIZED'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setFilterVerdict(v)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono-code transition-colors ${
                      filterVerdict === v
                        ? 'bg-slate-700 text-amber-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto">
              {filteredRefusals.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-colors text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono-code font-bold uppercase text-[10px] px-2 py-0.5 rounded ${
                        r.verdict === 'REFUSED'
                          ? 'bg-rose-950/40 text-rose-400 border border-rose-500/30'
                          : 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {r.verdict}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono-code">
                      {new Date(r.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-slate-200 font-medium truncate">
                    {r.workOrDataset}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Requester: {r.requester}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Model: {r.modelId} · Purpose: {r.intendedUse}
                  </div>
                  <div className="text-[10px] font-mono-code text-rose-400/90 truncate pt-0.5">
                    {r.constitutionalClause}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
