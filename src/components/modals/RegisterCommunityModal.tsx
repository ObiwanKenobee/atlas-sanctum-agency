import React, { useState } from 'react';
import { Community } from '../../types/atlas';
import { Users2, X, Sparkles } from 'lucide-react';

interface RegisterCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterCommunity: (community: Community) => void;
}

export const RegisterCommunityModal: React.FC<RegisterCommunityModalProps> = ({
  isOpen,
  onClose,
  onRegisterCommunity
}) => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [mission, setMission] = useState('');
  const [steward, setSteward] = useState('');
  const [councilType, setCouncilType] = useState('Consensus Council & Archival Assembly');
  const [membersCount, setMembersCount] = useState(1200);
  const [symbol, setSymbol] = useState('🜂');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = `comm-${name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 24)}`;
    const newCommunity: Community = {
      id,
      name,
      domain: domain || 'Cultural Heritage & Knowledge Preservation',
      mission: mission || 'Defending human agency and sovereign knowledge transmission in the age of artificial intelligence.',
      steward: steward || `${name} Stewardship Circle`,
      councilType,
      membersCount: Number(membersCount) || 500,
      establishedDate: `${new Date().getFullYear()} / Digital Treaty Ratified`,
      accentColor: '#d4af37',
      symbol: symbol || '🜂'
    };

    onRegisterCommunity(newCommunity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0b101b] border border-amber-500/40 w-full max-w-xl rounded-lg shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Users2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-serif-ancient text-slate-100">
              Register Sovereign Community into Atlas Commons
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Establish an autonomous community collective (union, tribal council, archival league, artist guild) equipped with binding constitutional governance over AI.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono-code text-slate-300 uppercase mb-1">
              Community Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Traditional Botanical Healers Alliance"
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-code text-slate-300 uppercase mb-1">
                Domain / Cultural Focus
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. Ethnobotany, Oral Formulaic Verse"
                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200"
              />
            </div>
            <div>
              <label className="block font-mono-code text-slate-300 uppercase mb-1">
                Glyph Symbol
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. 🜂, 🪶, 👁, 🌿"
                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono-code text-slate-300 uppercase mb-1">
              Sovereign Mission Statement
            </label>
            <textarea
              rows={2}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="What does this community protect from extraction, commodification, or distortion?"
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-code text-slate-300 uppercase mb-1">
                Steward Authority / Custodian Board
              </label>
              <input
                type="text"
                value={steward}
                onChange={(e) => setSteward(e.target.value)}
                placeholder="e.g. Council of Lineage Knowledge Keepers"
                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200"
              />
            </div>
            <div>
              <label className="block font-mono-code text-slate-300 uppercase mb-1">
                Initial Members / Custodians Count
              </label>
              <input
                type="number"
                value={membersCount}
                onChange={(e) => setMembersCount(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-200"
              />
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
              Charter Sovereign Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
