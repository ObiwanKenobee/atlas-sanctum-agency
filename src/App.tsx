/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Community,
  CommunityConstitution,
  CulturalWork,
  CommunityDataset,
  ConnectedAIModel,
  EvaluationRecord,
  Challenge,
  AgoraProposal,
  RefusalEvent,
  SystemArchetype,
  LivingConsent
} from './types/atlas';

import {
  INITIAL_COMMUNITIES,
  INITIAL_CONSTITUTIONS,
  INITIAL_CULTURAL_WORKS,
  INITIAL_DATASETS,
  INITIAL_MODELS,
  INITIAL_EVALUATION_RECORDS,
  INITIAL_CHALLENGES,
  INITIAL_AGORA_PROPOSALS,
  INITIAL_REFUSAL_EVENTS,
  INITIAL_AGENCY_INDEX
} from './data/seedData';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { GuidedDemonstrationModal } from './components/GuidedDemonstrationModal';
import { MissionControlView } from './components/views/MissionControlView';
import { AgoraView } from './components/views/AgoraView';
import { ArchiveVaultView } from './components/views/ArchiveVaultView';
import { ConsentRegistryView } from './components/views/ConsentRegistryView';
import { WorkshopDataView } from './components/views/WorkshopDataView';
import { EvaluationEngineView } from './components/views/EvaluationEngineView';
import { TribunalView } from './components/views/TribunalView';
import { RefusalLayerView } from './components/views/RefusalLayerView';
import { ObservatoryIndexView } from './components/views/ObservatoryIndexView';
import { EconomicGraphView } from './components/views/EconomicGraphView';

import { ConstitutionModal } from './components/modals/ConstitutionModal';
import { RegisterWorkModal } from './components/modals/RegisterWorkModal';
import { RegisterCommunityModal } from './components/modals/RegisterCommunityModal';

export default function App() {
  // Sovereign Communities State
  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem('atlas_communities');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITIES;
  });

  const [currentCommunity, setCurrentCommunity] = useState<Community>(
    communities[0] || INITIAL_COMMUNITIES[0]
  );

  // Active Tab
  const [currentTab, setCurrentTab] = useState<SystemArchetype>('mission_control');

  // Constitutions
  const [constitutions, setConstitutions] = useState<Record<string, CommunityConstitution>>(() => {
    const saved = localStorage.getItem('atlas_constitutions');
    return saved ? JSON.parse(saved) : INITIAL_CONSTITUTIONS;
  });

  // Works
  const [works, setWorks] = useState<CulturalWork[]>(() => {
    const saved = localStorage.getItem('atlas_works');
    return saved ? JSON.parse(saved) : INITIAL_CULTURAL_WORKS;
  });

  // Datasets
  const [datasets, setDatasets] = useState<CommunityDataset[]>(() => {
    const saved = localStorage.getItem('atlas_datasets');
    return saved ? JSON.parse(saved) : INITIAL_DATASETS;
  });

  // Models
  const [models, setModels] = useState<ConnectedAIModel[]>(() => {
    const saved = localStorage.getItem('atlas_models');
    return saved ? JSON.parse(saved) : INITIAL_MODELS;
  });

  // Evaluations
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>(() => {
    const saved = localStorage.getItem('atlas_evaluations');
    return saved ? JSON.parse(saved) : INITIAL_EVALUATION_RECORDS;
  });

  // Challenges (Tribunal)
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('atlas_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  // Agora Proposals
  const [proposals, setProposals] = useState<AgoraProposal[]>(() => {
    const saved = localStorage.getItem('atlas_proposals');
    return saved ? JSON.parse(saved) : INITIAL_AGORA_PROPOSALS;
  });

  // Refusal Events
  const [refusals, setRefusals] = useState<RefusalEvent[]>(() => {
    const saved = localStorage.getItem('atlas_refusals');
    return saved ? JSON.parse(saved) : INITIAL_REFUSAL_EVENTS;
  });

  // Modals
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [isConstitutionOpen, setIsConstitutionOpen] = useState(false);
  const [isRegisterWorkOpen, setIsRegisterWorkOpen] = useState(false);
  const [isRegisterCommunityOpen, setIsRegisterCommunityOpen] = useState(false);

  // Cross-view selection hooks
  const [selectedConsentWorkId, setSelectedConsentWorkId] = useState<string | undefined>();
  const [selectedEvalModelId, setSelectedEvalModelId] = useState<string | undefined>();

  // Flash toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('atlas_communities', JSON.stringify(communities));
  }, [communities]);
  useEffect(() => {
    localStorage.setItem('atlas_constitutions', JSON.stringify(constitutions));
  }, [constitutions]);
  useEffect(() => {
    localStorage.setItem('atlas_works', JSON.stringify(works));
  }, [works]);
  useEffect(() => {
    localStorage.setItem('atlas_datasets', JSON.stringify(datasets));
  }, [datasets]);
  useEffect(() => {
    localStorage.setItem('atlas_models', JSON.stringify(models));
  }, [models]);
  useEffect(() => {
    localStorage.setItem('atlas_evaluations', JSON.stringify(evaluations));
  }, [evaluations]);
  useEffect(() => {
    localStorage.setItem('atlas_challenges', JSON.stringify(challenges));
  }, [challenges]);
  useEffect(() => {
    localStorage.setItem('atlas_proposals', JSON.stringify(proposals));
  }, [proposals]);
  useEffect(() => {
    localStorage.setItem('atlas_refusals', JSON.stringify(refusals));
  }, [refusals]);

  // Current community constitution
  const activeConstitution =
    constitutions[currentCommunity.id] ||
    INITIAL_CONSTITUTIONS['comm-indigenous-oral'] || {
      communityId: currentCommunity.id,
      version: '1.0.0-PROVISIONAL',
      lastAmended: new Date().toISOString().split('T')[0],
      preamble: 'We assert our collective right to govern all artificial intelligence systems interacting with our cultural heritage.',
      permitted: [],
      restricted: [],
      prohibited: [],
      appealProcess: 'Review by Community Council.',
      redressProtocol: 'Immediate weight-purging and public apology.',
      revisionMechanism: 'Consensus among active custodians.'
    };

  // Community-specific filtered items
  const communityWorks = works.filter((w) => w.communityId === currentCommunity.id);
  const communityDatasets = datasets.filter((d) => d.communityId === currentCommunity.id);
  const communityChallenges = challenges.filter((c) => c.communityId === currentCommunity.id);
  const communityProposals = proposals.filter((p) => p.communityId === currentCommunity.id);

  // Overall agency score calculation
  const overallAgencyScore = Math.round(
    INITIAL_AGENCY_INDEX.reduce((acc, curr) => acc + curr.score, 0) /
      INITIAL_AGENCY_INDEX.length
  );

  // Handlers
  const handleSelectCommunity = (comm: Community) => {
    setCurrentCommunity(comm);
    showToast(`Switched active community to ${comm.name}`);
  };

  const handleRegisterCommunity = (newComm: Community) => {
    setCommunities((prev) => [...prev, newComm]);
    setCurrentCommunity(newComm);
    // Add default constitution
    setConstitutions((prev) => ({
      ...prev,
      [newComm.id]: {
        communityId: newComm.id,
        version: '1.0.0-CHARTER',
        lastAmended: new Date().toISOString().split('T')[0],
        preamble: `${newComm.name} asserts sovereign authorship over all knowledge and creative artifacts produced within its lineage.`,
        permitted: [
          {
            id: `p-${Date.now()}`,
            title: 'Internal Archival Preservation',
            description: 'Non-generative digital preservation on community intranet nodes.',
            category: 'CREATION'
          }
        ],
        restricted: [
          {
            id: `r-${Date.now()}`,
            title: 'Scholarly Educational Research',
            description: 'Requires written data transfer agreement and named attribution.',
            category: 'TRAINING',
            approvalBody: newComm.steward
          }
        ],
        prohibited: [
          {
            id: `pr-${Date.now()}`,
            title: 'Commercial Foundation Ingestion Without Consent',
            description: 'Automated scraping or commercial model training is strictly forbidden.',
            category: 'TRAINING',
            enforcementAction: 'AUTOMATED_REFUSAL_HALT',
            inviolable: true
          }
        ],
        appealProcess: `Petitions may be lodged with the ${newComm.steward}.`,
        redressProtocol: 'Weight ablation and community trust restitution.',
        revisionMechanism: 'Ratified by majority of active assembly members.'
      }
    }));
    showToast(`Sovereign Community "${newComm.name}" successfully chartered!`);
  };

  const handleUpdateConstitution = (updated: CommunityConstitution) => {
    setConstitutions((prev) => ({
      ...prev,
      [currentCommunity.id]: updated
    }));
    showToast(`Constitution v${updated.version} updated with new ratified clause.`);
  };

  const handleRegisterWork = (newWork: CulturalWork) => {
    setWorks((prev) => [newWork, ...prev]);
    showToast(`Cultural Work "${newWork.title}" added to Archive Vault.`);
  };

  const handleUpdateWorkConsent = (workId: string, updatedConsent: LivingConsent) => {
    setWorks((prev) =>
      prev.map((w) => (w.id === workId ? { ...w, consent: updatedConsent } : w))
    );
    showToast(
      updatedConsent.status === 'REVOKED'
        ? `Consent REVOKED for artifact. Refusal Gate armed.`
        : `Living consent conditions updated.`
    );
  };

  const handleToggleDatasetWithdrawal = (datasetId: string) => {
    setDatasets((prev) =>
      prev.map((d) => {
        if (d.id === datasetId) {
          const isWithdrawn = d.withdrawalStatus === 'MASS_WITHDRAWAL_CALLED';
          return {
            ...d,
            withdrawalStatus: isWithdrawn ? 'NORMAL' : 'MASS_WITHDRAWAL_CALLED'
          };
        }
        return d;
      })
    );
    showToast('Dataset withdrawal state updated.');
  };

  const handleConnectModel = (newModelData: Omit<ConnectedAIModel, 'id' | 'complianceScore' | 'monitoredSince'>) => {
    const newModel: ConnectedAIModel = {
      ...newModelData,
      id: `model-${Date.now()}`,
      complianceScore: 65,
      monitoredSince: new Date().toISOString().split('T')[0]
    };
    setModels((prev) => [newModel, ...prev]);
    showToast(`AI Model "${newModel.name}" bound to Governance Perimeter.`);
  };

  const handleSaveEvaluation = (record: EvaluationRecord) => {
    setEvaluations((prev) => [record, ...prev]);
    // update target model compliance score based on average
    const avgScore = Math.round(
      Object.values(record.scores).reduce((a, b) => a + b, 0) /
        Object.keys(record.scores).length
    );
    setModels((prev) =>
      prev.map((m) =>
        m.id === record.modelId
          ? {
              ...m,
              complianceScore: avgScore,
              evaluationStatus:
                record.overallVerdict === 'COMPLIANT'
                  ? 'VERIFIED'
                  : record.overallVerdict === 'CONDITIONAL'
                  ? 'CONDITIONAL'
                  : 'REFUSED',
              riskCategory: avgScore >= 80 ? 'LOW' : avgScore >= 50 ? 'ELEVATED' : 'PROHIBITED'
            }
          : m
      )
    );
    showToast(`Evaluation completed. Model Compliance Index updated to ${avgScore}%.`);
  };

  const handleSubmitChallenge = (challengeData: Omit<Challenge, 'id' | 'votes' | 'submittedAt'>) => {
    const newChallenge: Challenge = {
      ...challengeData,
      id: `chal-${Date.now()}`,
      votes: { approve: 1, reject: 0, abstain: 0 },
      submittedAt: new Date().toISOString()
    };
    setChallenges((prev) => [newChallenge, ...prev]);
    showToast(`Challenge filed on Tribunal Public Docket.`);
  };

  const handleSubmitChallengeFromEval = (evalRecord: EvaluationRecord) => {
    const newChallenge: Challenge = {
      id: `chal-${Date.now()}`,
      communityId: currentCommunity.id,
      title: `Critical Extraction Alert: ${evalRecord.modelName}`,
      targetModel: evalRecord.modelName,
      reporter: evalRecord.evaluator,
      status: 'TECHNICAL_ANALYSIS',
      allegedHarm: evalRecord.narrative,
      harmCategory: 'EXTRACTION',
      evidenceArtifacts: [
        {
          id: `ev-${Date.now()}`,
          title: 'Automated 10-Dimension Evaluation Dossier',
          type: 'OUTPUT_DUMP',
          snippet: `Violations: ${evalRecord.criticalViolations.join('; ')}\nVerdict: ${evalRecord.overallVerdict}\nAudit Hash: ${evalRecord.tamperProofHash}`,
          collectedAt: evalRecord.timestamp
        }
      ],
      votes: { approve: 42, reject: 0, abstain: 2 },
      submittedAt: new Date().toISOString()
    };
    setChallenges((prev) => [newChallenge, ...prev]);
    setCurrentTab('tribunal');
    showToast(`Evaluation dossier converted into formal Tribunal Challenge.`);
  };

  const handleVoteChallenge = (challengeId: string, voteType: 'APPROVE' | 'REJECT') => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          return {
            ...c,
            votes: {
              ...c.votes,
              approve: voteType === 'APPROVE' ? c.votes.approve + 1 : c.votes.approve,
              reject: voteType === 'REJECT' ? c.votes.reject + 1 : c.votes.reject
            }
          };
        }
        return c;
      })
    );
    showToast('Your vote on this judicial matter has been recorded.');
  };

  const handleEnforceRefusalInjunction = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          return {
            ...c,
            status: 'REFUSAL_INJUNCTION',
            tribunalVerdict: 'Permanent Injunction ratified by community assembly. Refusal Layer enforcement active.',
            remediationEnforced: 'MACHINE_GATE_HARD_BLOCK: All requests referencing protected lineage identifiers halted by network proxy.'
          };
        }
        return c;
      })
    );

    const challenge = challenges.find((c) => c.id === challengeId);
    if (challenge) {
      const newRefusal: RefusalEvent = {
        id: `ref-${Date.now()}`,
        timestamp: new Date().toISOString(),
        requester: 'Frontier AI Crawl Node',
        modelId: challenge.targetModel,
        workOrDataset: challenge.title,
        intendedUse: 'Scraping and Ingestion Attempt',
        verdict: 'REFUSED',
        constitutionalClause: 'Article III: Tribunal Injunction Enforcement',
        reasonCode: 'INJUNCTION_HALT_ACTIVE',
        signatureHash: `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        appealed: false
      };
      setRefusals((prev) => [newRefusal, ...prev]);
    }

    showToast('Binding Injunction issued. Refusal Gate is now actively halting target model.');
  };

  const handleVoteProposal = (proposalId: string, voteType: 'FOR' | 'AGAINST') => {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id === proposalId) {
          const newFor = voteType === 'FOR' ? p.votesFor + 1 : p.votesFor;
          const newAgainst = voteType === 'AGAINST' ? p.votesAgainst + 1 : p.votesAgainst;
          const total = newFor + newAgainst;
          return {
            ...p,
            votesFor: newFor,
            votesAgainst: newAgainst,
            quorumReached: total > 200,
            status: total > 500 && newFor / total > 0.66 ? 'PASSED' : p.status
          };
        }
        return p;
      })
    );
    showToast('Sovereign ballot cast in the Agora.');
  };

  const handleCreateProposal = (proposalData: Omit<AgoraProposal, 'id' | 'votesFor' | 'votesAgainst' | 'quorumReached' | 'status'>) => {
    const newProposal: AgoraProposal = {
      ...proposalData,
      id: `prop-${Date.now()}`,
      votesFor: 1,
      votesAgainst: 0,
      quorumReached: false,
      status: 'OPEN'
    };
    setProposals((prev) => [newProposal, ...prev]);
    showToast(`New Proposal "${newProposal.title}" submitted to the Agora.`);
  };

  const handleAddRefusalEvent = (event: RefusalEvent) => {
    setRefusals((prev) => [event, ...prev]);
    if (event.verdict === 'REFUSED') {
      showToast(`Machine Refusal Gate Triggered! Execution halted.`);
    } else {
      showToast(`Machine Gate: Request Cleared for Deployment.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded border border-amber-500/40 bg-slate-900/95 text-amber-200 text-xs font-mono-code shadow-2xl backdrop-blur-md animate-fade-in flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentCommunity={currentCommunity}
        communities={communities}
        onSelectCommunity={handleSelectCommunity}
        onOpenRegisterCommunity={() => setIsRegisterCommunityOpen(true)}
        onStartWalkthrough={() => setIsWalkthroughOpen(true)}
        refusalsCount={refusals.filter((r) => r.verdict === 'REFUSED').length}
        activeChallengesCount={challenges.filter((c) => c.status !== 'REMEDIATION_ENFORCED').length}
      />

      {/* Archetype Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        refusalsCount={refusals.filter((r) => r.verdict === 'REFUSED').length}
        challengesCount={challenges.length}
        proposalsCount={proposals.filter((p) => p.status === 'OPEN').length}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'mission_control' && (
          <MissionControlView
            community={currentCommunity}
            constitution={activeConstitution}
            works={communityWorks}
            evaluations={evaluations}
            challenges={communityChallenges}
            refusals={refusals}
            onNavigateTab={setCurrentTab}
            onOpenConstitution={() => setIsConstitutionOpen(true)}
            onStartWalkthrough={() => setIsWalkthroughOpen(true)}
            onOpenRegisterWork={() => setIsRegisterWorkOpen(true)}
            overallAgencyScore={overallAgencyScore}
          />
        )}

        {currentTab === 'agora' && (
          <AgoraView
            community={currentCommunity}
            constitution={activeConstitution}
            proposals={communityProposals}
            onVoteProposal={handleVoteProposal}
            onCreateProposal={handleCreateProposal}
            onOpenConstitution={() => setIsConstitutionOpen(true)}
          />
        )}

        {currentTab === 'archive' && (
          <ArchiveVaultView
            community={currentCommunity}
            works={communityWorks}
            onOpenRegisterWork={() => setIsRegisterWorkOpen(true)}
            onSelectWorkForConsent={(work) => {
              setSelectedConsentWorkId(work.id);
              setCurrentTab('commons');
            }}
          />
        )}

        {currentTab === 'commons' && (
          <ConsentRegistryView
            community={currentCommunity}
            works={communityWorks}
            onUpdateWorkConsent={handleUpdateWorkConsent}
            selectedWorkId={selectedConsentWorkId}
          />
        )}

        {currentTab === 'workshop' && (
          <WorkshopDataView
            community={currentCommunity}
            datasets={communityDatasets}
            models={models}
            onToggleDatasetWithdrawal={handleToggleDatasetWithdrawal}
            onConnectModel={handleConnectModel}
            onNavigateToEvaluator={(modelId) => {
              setSelectedEvalModelId(modelId);
              setCurrentTab('evaluator');
            }}
          />
        )}

        {currentTab === 'evaluator' && (
          <EvaluationEngineView
            community={currentCommunity}
            constitution={activeConstitution}
            models={models}
            evaluations={evaluations}
            onSaveEvaluation={handleSaveEvaluation}
            onSubmitChallengeFromEval={handleSubmitChallengeFromEval}
            preselectedModelId={selectedEvalModelId}
          />
        )}

        {currentTab === 'tribunal' && (
          <TribunalView
            community={currentCommunity}
            constitution={activeConstitution}
            challenges={communityChallenges}
            onVoteChallenge={handleVoteChallenge}
            onSubmitChallenge={handleSubmitChallenge}
            onEnforceRefusalInjunction={handleEnforceRefusalInjunction}
          />
        )}

        {currentTab === 'refusal_layer' && (
          <RefusalLayerView
            community={currentCommunity}
            works={communityWorks}
            datasets={communityDatasets}
            models={models}
            refusals={refusals}
            onAddRefusalEvent={handleAddRefusalEvent}
          />
        )}

        {currentTab === 'observatory' && (
          <ObservatoryIndexView community={currentCommunity} />
        )}

        {currentTab === 'bridge_economy' && (
          <EconomicGraphView community={currentCommunity} />
        )}
      </main>

      {/* Civilizational Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b12] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-serif-ancient text-slate-300 font-bold tracking-wider">
              ATLAS SANCTUM
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Ancient wisdom. Modern intelligence. Human agency.</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono-code text-slate-400">
            <span>Open Source Civic Infrastructure</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>WIPO / C2PA Standards Interoperable</span>
          </div>
        </div>
      </footer>

      {/* Guided 13-Step Demonstration Modal */}
      <GuidedDemonstrationModal
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onNavigateToTab={(tab) => {
          setCurrentTab(tab);
          setIsWalkthroughOpen(false);
        }}
        onOpenConstitutionModal={() => {
          setIsWalkthroughOpen(false);
          setIsConstitutionOpen(true);
        }}
        onOpenRegisterWorkModal={() => {
          setIsWalkthroughOpen(false);
          setIsRegisterWorkOpen(true);
        }}
        onOpenRegisterCommunityModal={() => {
          setIsWalkthroughOpen(false);
          setIsRegisterCommunityOpen(true);
        }}
        onTriggerEvaluationDemo={() => {
          setCurrentTab('evaluator');
          setIsWalkthroughOpen(false);
        }}
        onTriggerRefusalTest={() => {
          setCurrentTab('refusal_layer');
          setIsWalkthroughOpen(false);
        }}
      />

      {/* Constitution Modal */}
      <ConstitutionModal
        isOpen={isConstitutionOpen}
        onClose={() => setIsConstitutionOpen(false)}
        community={currentCommunity}
        constitution={activeConstitution}
        onUpdateConstitution={handleUpdateConstitution}
      />

      {/* Register Work Modal */}
      <RegisterWorkModal
        isOpen={isRegisterWorkOpen}
        onClose={() => setIsRegisterWorkOpen(false)}
        community={currentCommunity}
        onRegisterWork={handleRegisterWork}
      />

      {/* Register Community Modal */}
      <RegisterCommunityModal
        isOpen={isRegisterCommunityOpen}
        onClose={() => setIsRegisterCommunityOpen(false)}
        onRegisterCommunity={handleRegisterCommunity}
      />
    </div>
  );
}
