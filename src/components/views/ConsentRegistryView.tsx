import React, { useState } from 'react';
import { CulturalWork, LivingConsent, Community } from '../../types/atlas';
import {
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Clock,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FileSignature,
  DollarSign,
  Tag,
  Check
} from 'lucide-react';

interface ConsentRegistryViewProps {
  community: Community;
  works: CulturalWork[];
  onUpdateWorkConsent: (workId: string, updatedConsent: LivingConsent) => void;
  selectedWorkId?: string;
}

export const ConsentRegistryView: React.FC<ConsentRegistryViewProps> = ({
  community,
  works,
  onUpdateWorkConsent,
  selectedWorkId
}) => {
  const [activeWorkId, setActiveWorkId] = useState<string>(
    selectedWorkId || (works[0]?.id ?? '')
  );

  const activeWork = works.find((w) => w.id === activeWorkId) || works[0];

  if (!activeWork) {
    return <div className="p-8 text-center text-slate-400">No cultural works registered in the Commons.</div>;
  }

  const consent = activeWork.consent;

  const handleToggleRevocation = () => {
    const isRevoking = consent.status === 'ACTIVE';
    const updatedConsent: LivingConsent = {
      ...consent,
      status: isRevoking ? 'REVOKED' : 'ACTIVE',
      lastRevokedTimestamp: isRevoking ? new Date().toISOString() : undefined,
      revocationReason: isRevoking
        ? 'Custodian invoked emergency withdrawal under Community AI Constitution Article II.'
        : undefined
    };
    onUpdateWorkConsent(activeWork.id, updatedConsent);
  };

  const handleToggleCommercial = () => {
    const updatedConsent: LivingConsent = {
      ...consent,
      commercialAllowed: !consent.commercialAllowed
    };
    onUpdateWorkConsent(activeWork.id, updatedConsent);
  };

  const handleToggleAttribution = () => {
    const updatedConsent: LivingConsent = {
      ...consent,
      attributionRequired: !consent.attributionRequired
    };
    onUpdateWorkConsent(activeWork.id, updatedConsent);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6">
        <div className="flex items-center space-x-2 text-xs font-mono-code text-amber-400">
          <KeyRound className="w-4 h-4" />
          <span>ATLAS LIVING CONSENT REGISTRY · SECTION VII</span>
        </div>
        <h1 className="text-2xl font-bold font-serif-ancient text-slate-100 mt-1">
          Dynamic Machine-Readable Consent & Authority
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Consent is a living sovereign state, not a one-time terms of service waiver. Every AI access request must dynamically query this registry before execution.
        </p>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Artifacts Selection List */}
        <div className="rounded-lg border border-slate-800 bg-[#090e17] p-4 space-y-3">
          <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400 px-1">
            Registered Cultural Works ({works.length})
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {works.map((w) => {
              const isSelected = w.id === activeWorkId;
              const isRevoked = w.consent.status === 'REVOKED';
              return (
                <button
                  key={w.id}
                  onClick={() => setActiveWorkId(w.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-amber-500/50 bg-amber-950/20 text-slate-100'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-semibold truncate leading-tight">
                      {w.title}
                    </span>
                    <span
                      className={`text-[9px] font-mono-code uppercase px-1.5 py-0.2 rounded font-bold ${
                        isRevoked
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {w.consent.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 truncate">
                    {w.creator}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono-code mt-0.5 truncate">
                    Auth: {w.consent.authorizedBy}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (2/3): Living Consent Inspector & Management Console */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-slate-800 bg-[#090e17] p-6 space-y-5">
            {/* Title & Status Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <span className="text-[11px] font-mono-code text-amber-400 uppercase">
                  Active Artifact Record
                </span>
                <h2 className="text-xl font-bold font-serif-ancient text-slate-100 mt-0.5">
                  {activeWork.title}
                </h2>
                <div className="text-xs text-slate-400">
                  Custodians: {activeWork.creator} · Tradition: {activeWork.lineageOrTradition}
                </div>
              </div>

              {/* Instant Revocation Master Switch */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleToggleRevocation}
                  className={`px-4 py-2 rounded text-xs font-semibold transition-all flex items-center space-x-2 ${
                    consent.status === 'ACTIVE'
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                  }`}
                >
                  {consent.status === 'ACTIVE' ? (
                    <>
                      <ShieldAlert className="w-4 h-4" />
                      <span>REVOKE LIVING CONSENT</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>RESTORE AUTHORIZATION</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Warning if revoked */}
            {consent.status === 'REVOKED' && (
              <div className="p-4 rounded-md border border-rose-500/50 bg-rose-950/30 text-xs text-rose-200 space-y-1">
                <div className="font-bold flex items-center space-x-1.5 text-rose-300 font-mono-code">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>CONSENT CURRENTLY REVOKED — MACHINE GATE HALTS ALL ACCESS</span>
                </div>
                <p>
                  Any external API call, foundation model ingestion, or inference test referencing this work will immediately trigger an automated machine halt (Refusal Code: CR-01).
                </p>
                {consent.lastRevokedTimestamp && (
                  <div className="text-[10px] text-rose-400/80 font-mono-code pt-1">
                    Revocation Logged: {new Date(consent.lastRevokedTimestamp).toLocaleString()}
                  </div>
                )}
              </div>
            )}

            {/* Living Consent Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Authorized By */}
              <div className="p-3.5 rounded border border-slate-800 bg-slate-950/50">
                <div className="text-[10px] font-mono-code text-slate-500 uppercase">
                  Institutional / Lineage Authority
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">
                  {consent.authorizedBy}
                </div>
                <div className="text-[10px] text-slate-500 font-mono-code mt-0.5">
                  Authorized: {new Date(consent.authorizationTimestamp).toLocaleDateString()}
                </div>
              </div>

              {/* Economic Royalty & Licensing */}
              <div className="p-3.5 rounded border border-slate-800 bg-slate-950/50">
                <div className="text-[10px] font-mono-code text-slate-500 uppercase">
                  Economic & Compensation Terms
                </div>
                <div className="text-xs font-semibold text-amber-300 mt-1 flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span>{consent.compensationRate}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Sovereign Collective Royalty Trust
                </div>
              </div>
            </div>

            {/* Granular Usage Toggles */}
            <div className="p-4 rounded border border-slate-800 bg-slate-950/30 space-y-3">
              <div className="text-xs font-semibold text-slate-200 font-serif-ancient uppercase tracking-wider">
                Granular Machine Constraints
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center justify-between p-3 rounded border border-slate-800 bg-slate-900/60">
                  <div>
                    <div className="text-xs font-medium text-slate-200">Commercial Use Permitted</div>
                    <div className="text-[10px] text-slate-500">Allow for-profit commercial systems</div>
                  </div>
                  <button
                    onClick={handleToggleCommercial}
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      consent.commercialAllowed ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                        consent.commercialAllowed ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded border border-slate-800 bg-slate-900/60">
                  <div>
                    <div className="text-xs font-medium text-slate-200">Cryptographic Attribution</div>
                    <div className="text-[10px] text-slate-500">Mandatory C2PA/provenance token</div>
                  </div>
                  <button
                    onClick={handleToggleAttribution}
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      consent.attributionRequired ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                        consent.attributionRequired ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Permitted vs Prohibited Purposes Lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Authorized */}
              <div className="p-4 rounded border border-emerald-500/20 bg-emerald-950/10 space-y-2">
                <div className="text-xs font-mono-code text-emerald-400 uppercase font-semibold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authorized Purposes</span>
                </div>
                <div className="space-y-1.5">
                  {consent.authorizedPurposes.map((p, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start space-x-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prohibited */}
              <div className="p-4 rounded border border-rose-500/20 bg-rose-950/10 space-y-2">
                <div className="text-xs font-mono-code text-rose-400 uppercase font-semibold flex items-center space-x-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Prohibited Purposes</span>
                </div>
                <div className="space-y-1.5">
                  {consent.prohibitedPurposes.map((p, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start space-x-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Living Covenant Notice */}
            <div className="p-3 rounded bg-slate-950/80 border border-slate-800 text-xs text-slate-400 italic">
              <span className="text-amber-400/90 font-mono-code not-italic font-semibold">Living Covenant Clause: </span>
              {consent.revocabilityNotice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
