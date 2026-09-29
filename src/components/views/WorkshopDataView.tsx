import React, { useState } from 'react';
import { CommunityDataset, ConnectedAIModel, Community } from '../../types/atlas';
import {
  Wrench,
  Database,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Plus,
  ArrowRight,
  Sliders,
  CheckCircle2,
  FileCheck2,
  Lock,
  Layers
} from 'lucide-react';

interface WorkshopDataViewProps {
  community: Community;
  datasets: CommunityDataset[];
  models: ConnectedAIModel[];
  onToggleDatasetWithdrawal: (datasetId: string) => void;
  onConnectModel: (model: Omit<ConnectedAIModel, 'id' | 'complianceScore' | 'monitoredSince'>) => void;
  onNavigateToEvaluator: (modelId: string) => void;
}

export const WorkshopDataView: React.FC<WorkshopDataViewProps> = ({
  community,
  datasets,
  models,
  onToggleDatasetWithdrawal,
  onConnectModel,
  onNavigateToEvaluator
}) => {
  const [activeTab, setActiveTab] = useState<'DATASETS' | 'MODELS'>('DATASETS');
  const [showConnectModal, setShowConnectModal] = useState(false);

  // New model state
  const [newModelName, setNewModelName] = useState('');
  const [newDeveloper, setNewDeveloper] = useState('');
  const [newArch, setNewArch] = useState('');
  const [newLicense, setNewLicense] = useState('');
  const [newScope, setNewScope] = useState('');
  const [newRisk, setNewRisk] = useState<ConnectedAIModel['riskCategory']>('AUDIT_PENDING');

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelName.trim() || !newDeveloper.trim()) return;

    onConnectModel({
      name: newModelName,
      developer: newDeveloper,
      architectureType: newArch || 'Transformer Foundation',
      licenseModel: newLicense || 'Commercial API',
      deploymentScope: newScope || 'General Public API',
      riskCategory: newRisk,
      evaluationStatus: 'UNTESTED'
    });

    setNewModelName('');
    setNewDeveloper('');
    setNewArch('');
    setNewLicense('');
    setNewScope('');
    setShowConnectModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
              <Wrench className="w-4 h-4" />
              <span>THE WORKSHOP · COMMUNITY DATA COMMONS & MODEL BENCH</span>
            </div>
            <h1 className="text-2xl font-bold font-serif-ancient text-slate-100 mt-1">
              Governed Datasets & Connected AI Architectures
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Where community-contributed datasets are bound by machine-executable training boundaries and connected AI models are held to account.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowConnectModal(true)}
              className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Connect AI Model</span>
            </button>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('DATASETS')}
            className={`px-3 py-1.5 text-xs rounded transition-colors flex items-center space-x-2 ${
              activeTab === 'DATASETS'
                ? 'bg-slate-700 text-amber-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Governed Datasets ({datasets.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('MODELS')}
            className={`px-3 py-1.5 text-xs rounded transition-colors flex items-center space-x-2 ${
              activeTab === 'MODELS'
                ? 'bg-slate-700 text-amber-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Connected AI Models ({models.length})</span>
          </button>
        </div>
      </div>

      {/* Datasets View */}
      {activeTab === 'DATASETS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {datasets.map((dataset) => {
            const isWithdrawn = dataset.withdrawalStatus === 'MASS_WITHDRAWAL_CALLED';

            return (
              <div
                key={dataset.id}
                className="rounded-lg border border-slate-800 bg-[#090e17] p-5 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-mono-code text-amber-400 uppercase">
                      {dataset.sizeRecords} · {dataset.worksCount} Works
                    </div>
                    <h3 className="text-base font-bold text-slate-100 font-serif-ancient mt-0.5">
                      {dataset.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded border ${
                      isWithdrawn
                        ? 'border-rose-500/40 bg-rose-950/20 text-rose-300'
                        : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                    }`}
                  >
                    {isWithdrawn ? 'WITHDRAWN' : 'GOVERNED ACTIVE'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {dataset.description}
                </p>

                <div className="p-3 rounded bg-slate-950/70 border border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-400">
                    <span className="text-slate-500">License:</span> {dataset.licenseType}
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Contributors:</span> {dataset.contributorsCount} Community Knowledge Holders
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Audited:</span> {dataset.lastAudited}
                  </div>
                </div>

                {/* Allowed vs Prohibited Training Paradigms */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded border border-emerald-500/20 bg-emerald-950/10">
                    <div className="text-[10px] font-mono-code uppercase text-emerald-400 font-bold mb-1">
                      Allowed Training Paradigms
                    </div>
                    <ul className="space-y-0.5 text-slate-300 text-[11px]">
                      {dataset.allowedTrainingParadigms.map((p, i) => (
                        <li key={i}>✓ {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded border border-rose-500/20 bg-rose-950/10">
                    <div className="text-[10px] font-mono-code uppercase text-rose-400 font-bold mb-1">
                      Prohibited Paradigms (Enforced by Refusal Layer)
                    </div>
                    <ul className="space-y-0.5 text-slate-300 text-[11px]">
                      {dataset.prohibitedParadigms.map((p, i) => (
                        <li key={i}>✗ {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Withdrawal Control */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {isWithdrawn ? 'Dataset Access Halted' : 'Dataset Normal Operations'}
                  </span>
                  <button
                    onClick={() => onToggleDatasetWithdrawal(dataset.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      isWithdrawn
                        ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                        : 'bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 border border-rose-700/50'
                    }`}
                  >
                    {isWithdrawn ? 'Restore Dataset Access' : 'Invoke Collective Withdrawal'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Models View */}
      {activeTab === 'MODELS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              className="rounded-lg border border-slate-800 bg-[#090e17] p-5 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-mono-code text-amber-400 uppercase">
                    {model.developer}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 font-serif-ancient mt-0.5">
                    {model.name}
                  </h3>
                </div>

                <span
                  className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded border ${
                    model.evaluationStatus === 'VERIFIED'
                      ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                      : model.evaluationStatus === 'REFUSED'
                      ? 'border-rose-500/40 bg-rose-950/20 text-rose-300'
                      : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                  }`}
                >
                  {model.evaluationStatus}
                </span>
              </div>

              <div className="p-3 rounded bg-slate-950/70 border border-slate-800 text-[11px] space-y-1">
                <div className="text-slate-300">
                  <span className="text-slate-500">Architecture:</span> {model.architectureType}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500">License:</span> {model.licenseModel}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500">Deployment Scope:</span> {model.deploymentScope}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500">Monitored Since:</span> {model.monitoredSince}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Compliance Index:</span>
                  <span
                    className={`font-mono-code font-bold ${
                      model.complianceScore >= 80
                        ? 'text-emerald-400'
                        : model.complianceScore >= 50
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {model.complianceScore} / 100
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded ${
                    model.riskCategory === 'LOW'
                      ? 'bg-emerald-950/40 text-emerald-400'
                      : model.riskCategory === 'PROHIBITED'
                      ? 'bg-rose-950/40 text-rose-400'
                      : 'bg-amber-950/40 text-amber-400'
                  }`}
                >
                  RISK: {model.riskCategory}
                </span>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => onNavigateToEvaluator(model.id)}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-medium transition-colors flex items-center space-x-1"
                >
                  <span>Run 10-Dimension Audit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Connect AI Model */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b101b] border border-slate-700 w-full max-w-lg rounded-lg shadow-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold font-serif-ancient text-slate-100">
              Connect AI Model to Governance Perimeter
            </h2>
            <p className="text-xs text-slate-400">
              Register an external foundation model, specialized acoustic aligner, or diffusion synth to be evaluated and governed by the Commons.
            </p>

            <form onSubmit={handleConnectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Model Name
                </label>
                <input
                  type="text"
                  required
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="e.g. PolyglotSynth-Pro v2"
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                  Developer / Institution
                </label>
                <input
                  type="text"
                  required
                  value={newDeveloper}
                  onChange={(e) => setNewDeveloper(e.target.value)}
                  placeholder="e.g. Global Tech Labs Inc."
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                    Architecture Type
                  </label>
                  <input
                    type="text"
                    value={newArch}
                    onChange={(e) => setNewArch(e.target.value)}
                    placeholder="e.g. Decoder Transformer"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1">
                    License Model
                  </label>
                  <input
                    type="text"
                    value={newLicense}
                    onChange={(e) => setNewLicense(e.target.value)}
                    placeholder="e.g. Open Weights / API"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs"
                >
                  Bind Model to Perimeter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
