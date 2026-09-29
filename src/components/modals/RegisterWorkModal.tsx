import React, { useState } from 'react';
import { CulturalWork, Community, ProvenanceNode } from '../../types/atlas';
import { BookOpen, X, CheckCircle2, Shield } from 'lucide-react';

interface RegisterWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  community: Community;
  onRegisterWork: (work: CulturalWork) => void;
}

export const RegisterWorkModal: React.FC<RegisterWorkModalProps> = ({
  isOpen,
  onClose,
  community,
  onRegisterWork
}) => {
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [lineage, setLineage] = useState('');
  const [medium, setMedium] = useState('Master Audio Recording');
  const [yearOrigin, setYearOrigin] = useState('2024');
  const [significance, setSignificance] = useState('');
  const [isSacred, setIsSacred] = useState(false);
  const [authorizedPurposes, setAuthorizedPurposes] = useState('Educational Immersion, Archival Restoration');
  const [prohibitedPurposes, setProhibitedPurposes] = useState('Commercial Model Pre-Training, Deepfake Ingestion');
  const [commercialAllowed, setCommercialAllowed] = useState(false);
  const [authorizedBy, setAuthorizedBy] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !creator.trim()) return;

    const workId = `work-${Date.now()}`;
    const initialProvenance: ProvenanceNode[] = [
      {
        id: `prov-${Date.now()}-1`,
        type: 'PERSON',
        label: creator,
        detail: `Original custodian / author under ${lineage || community.name}`,
        timestamp: new Date().toISOString(),
        signatureHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      },
      {
        id: `prov-${Date.now()}-2`,
        type: 'WORK',
        label: title,
        detail: `${medium} cataloged in Commons`,
        timestamp: new Date().toISOString(),
        signatureHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      },
      {
        id: `prov-${Date.now()}-3`,
        type: 'INSTITUTION',
        label: community.steward,
        detail: 'Registered in sovereign community digital sanctuary',
        timestamp: new Date().toISOString(),
        signatureHash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      }
    ];

    const newWork: CulturalWork = {
      id: workId,
      communityId: community.id,
      title,
      creator,
      lineageOrTradition: lineage || community.domain,
      medium,
      yearOrigin,
      culturalSignificance: significance || 'Communal cultural work held in perpetual trust.',
      contextSummary: 'Cataloged under Atlas Cultural AI Commons covenant.',
      isSacred,
      datasetId: 'dataset-community-corpus-main',
      consent: {
        status: 'ACTIVE',
        authorizedPurposes: authorizedPurposes.split(',').map((s) => s.trim()).filter(Boolean),
        prohibitedPurposes: prohibitedPurposes.split(',').map((s) => s.trim()).filter(Boolean),
        commercialAllowed,
        attributionRequired: true,
        compensationRate: commercialAllowed ? '12.5% Collective Escrow' : 'Non-Commercial Trust',
        authorizedBy: authorizedBy || creator,
        authorizationTimestamp: new Date().toISOString(),
        revocabilityNotice: 'Consent is a living covenant. The registered custodians retain sovereign authority to revoke access upon notice.'
      },
      provenanceChain: initialProvenance
    };

    onRegisterWork(newWork);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0b101b] border border-amber-500/40 w-full max-w-2xl rounded-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-serif-ancient text-slate-100">
              Register Cultural Work into Commons Archive
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono-code text-slate-300 uppercase mb-1">
              Work Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Songs of the Cedar River & Mountain Passes"
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-code text-slate-300 uppercase mb-1">
                Creator / Custodian(s)
              </label>
              <input
                type="text"
                required
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="e.g. Master Singer Elder Tah-Nen"
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
              />
            </div>
            <div>
              <label className="block font-mono-code text-slate-300 uppercase mb-1">
                Tradition / Lineage
              </label>
              <input
                type="text"
                value={lineage}
                onChange={(e) => setLineage(e.target.value)}
                placeholder="e.g. Klamath Riparian Tradition"
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-code text-slate-300 uppercase mb-1">
                Medium / Physical Format
              </label>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="e.g. Master Reel Audio (16-bit)"
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
              />
            </div>
            <div>
              <label className="block font-mono-code text-slate-300 uppercase mb-1">
                Year / Era of Origin
              </label>
              <input
                type="text"
                value={yearOrigin}
                onChange={(e) => setYearOrigin(e.target.value)}
                placeholder="e.g. 1982 (Recorded) / Ancient"
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono-code text-slate-300 uppercase mb-1">
              Cultural & Civilizational Significance
            </label>
            <textarea
              rows={2}
              value={significance}
              onChange={(e) => setSignificance(e.target.value)}
              placeholder="Explain the living context, ecological teachings, or historical testimony..."
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
            />
          </div>

          <div className="p-3 rounded border border-slate-800 bg-[#070c14] space-y-3">
            <div className="font-serif-ancient text-slate-200 font-semibold uppercase tracking-wider">
              Living Consent Parameters (Section VII)
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono-code text-slate-400 uppercase mb-1">
                  Authorized Uses (comma separated)
                </label>
                <input
                  type="text"
                  value={authorizedPurposes}
                  onChange={(e) => setAuthorizedPurposes(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200"
                />
              </div>
              <div>
                <label className="block font-mono-code text-slate-400 uppercase mb-1">
                  Prohibited Uses (comma separated)
                </label>
                <input
                  type="text"
                  value={prohibitedPurposes}
                  onChange={(e) => setProhibitedPurposes(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-mono-code text-slate-400 uppercase mb-1">
                  Signing Authority
                </label>
                <input
                  type="text"
                  value={authorizedBy}
                  onChange={(e) => setAuthorizedBy(e.target.value)}
                  placeholder="e.g. Clan Council Assembly"
                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200"
                />
              </div>
              <div className="flex flex-col justify-end space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={isSacred}
                    onChange={(e) => setIsSacred(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-500"
                  />
                  <span>Sacred Heritage / Inviolable Protection</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={commercialAllowed}
                    onChange={(e) => setCommercialAllowed(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-500"
                  />
                  <span>Commercial Licensing Permitted (With Escrow)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded border border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            >
              Record Cultural Artifact in Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
