export type SystemArchetype =
  | 'mission_control'
  | 'agora'
  | 'archive'
  | 'observatory'
  | 'workshop'
  | 'evaluator'
  | 'tribunal'
  | 'commons'
  | 'refusal_layer'
  | 'bridge_economy'
  | 'demonstration_walkthrough';

export interface Community {
  id: string;
  name: string;
  domain: string;
  mission: string;
  steward: string;
  councilType: string;
  membersCount: number;
  establishedDate: string;
  accentColor: string;
  symbol: string;
}

export interface RuleItem {
  id: string;
  title: string;
  description: string;
  category: 'CREATION' | 'ATTRIBUTION' | 'TRAINING' | 'COMMERCIAL' | 'GOVERNANCE' | 'SACRED_PRESERVATION';
  machineConstraint?: string;
  conditions?: string[];
  enforcementAction?: string;
  inviolable?: boolean;
  approvalBody?: string;
  feeOrRoyalty?: string;
}

export interface CommunityConstitution {
  communityId: string;
  version: string;
  lastAmended: string;
  preamble: string;
  permitted: RuleItem[];
  restricted: RuleItem[];
  prohibited: RuleItem[];
  appealProcess: string;
  redressProtocol: string;
  revisionMechanism: string;
}

export interface ProvenanceNode {
  id: string;
  type: 'PERSON' | 'WORK' | 'CONTEXT' | 'INSTITUTION' | 'DATASET' | 'MODEL' | 'APPLICATION' | 'OUTCOME';
  label: string;
  detail: string;
  timestamp: string;
  signatureHash: string;
}

export interface LivingConsent {
  status: 'ACTIVE' | 'REVOKED' | 'CONDITIONAL' | 'IN_DELIBERATION';
  authorizedPurposes: string[];
  prohibitedPurposes: string[];
  commercialAllowed: boolean;
  attributionRequired: boolean;
  compensationRate: string;
  authorizedBy: string;
  authorizationTimestamp: string;
  revocationReason?: string;
  lastRevokedTimestamp?: string;
  revocabilityNotice: string;
}

export interface CulturalWork {
  id: string;
  communityId: string;
  title: string;
  creator: string;
  lineageOrTradition: string;
  medium: string;
  yearOrigin: string;
  culturalSignificance: string;
  contextSummary: string;
  isSacred: boolean;
  datasetId: string;
  consent: LivingConsent;
  provenanceChain: ProvenanceNode[];
}

export interface CommunityDataset {
  id: string;
  communityId: string;
  title: string;
  description: string;
  worksCount: number;
  sizeRecords: string;
  licenseType: string;
  culturalContext: string;
  withdrawalStatus: 'NORMAL' | 'LOCKED' | 'MASS_WITHDRAWAL_CALLED';
  allowedTrainingParadigms: string[];
  prohibitedParadigms: string[];
  contributorsCount: number;
  lastAudited: string;
}

export interface ConnectedAIModel {
  id: string;
  name: string;
  developer: string;
  architectureType: string;
  licenseModel: string;
  deploymentScope: string;
  evaluationStatus: 'VERIFIED' | 'CONDITIONAL' | 'REFUSED' | 'UNTESTED';
  complianceScore: number;
  monitoredSince: string;
  riskCategory: 'LOW' | 'ELEVATED' | 'PROHIBITED' | 'AUDIT_PENDING';
}

export type EvaluationCriteriaKey =
  | 'accuracy'
  | 'representation'
  | 'culturalIntegrity'
  | 'attribution'
  | 'consentCompliance'
  | 'economicEffects'
  | 'humanAgency'
  | 'safety'
  | 'transparency'
  | 'governanceCompliance';

export interface EvaluationRecord {
  id: string;
  modelId: string;
  modelName: string;
  communityId: string;
  timestamp: string;
  evaluator: string;
  scores: Record<EvaluationCriteriaKey, number>;
  overallVerdict: 'COMPLIANT' | 'CONDITIONAL' | 'NON_COMPLIANT';
  criticalViolations: string[];
  narrative: string;
  reproducibleEvidenceUrl: string;
  tamperProofHash: string;
}

export interface ChallengeEvidence {
  id: string;
  title: string;
  type: 'WEIGHT_PROBE' | 'OUTPUT_DUMP' | 'UNCONSENTED_SCRAPE' | 'STYLE_DISPLACEMENT' | 'ECONOMIC_LOG';
  snippet: string;
  collectedAt: string;
}

export interface Challenge {
  id: string;
  communityId: string;
  title: string;
  targetModel: string;
  reporter: string;
  status:
    | 'IDENTIFIED'
    | 'DOCUMENTED'
    | 'EVIDENCE_ATTACHED'
    | 'COMMUNITY_REVIEW'
    | 'TECHNICAL_ANALYSIS'
    | 'GOVERNANCE_DECISION'
    | 'REMEDIATION_ENFORCED'
    | 'REFUSAL_INJUNCTION';
  allegedHarm: string;
  harmCategory: 'EXTRACTION' | 'MISREPRESENTATION' | 'UNCONSENTED_SYNTHESIS' | 'ECONOMIC_DISPLACEMENT' | 'SACRED_VIOLATION';
  evidenceArtifacts: ChallengeEvidence[];
  votes: { approve: number; reject: number; abstain: number };
  tribunalVerdict?: string;
  constitutionalClauseTriggered?: string;
  remediationEnforced?: string;
  submittedAt: string;
  resolvedAt?: string;
}

export interface AgoraProposal {
  id: string;
  communityId: string;
  title: string;
  proposedBy: string;
  category: 'CONSTITUTIONAL_AMENDMENT' | 'REFUSAL_INJUNCTION' | 'ECONOMIC_COMPENSATION' | 'EMERGENCY_PROTECTION';
  description: string;
  votesFor: number;
  votesAgainst: number;
  quorumReached: boolean;
  deadline: string;
  status: 'OPEN' | 'PASSED' | 'REJECTED';
  rationale: string;
}

export interface RefusalEvent {
  id: string;
  timestamp: string;
  requester: string;
  modelId: string;
  workOrDataset: string;
  intendedUse: string;
  verdict: 'REFUSED' | 'RESTRICTED' | 'AUTHORIZED';
  constitutionalClause: string;
  reasonCode: string;
  signatureHash: string;
  appealed: boolean;
}

export interface EconomicNode {
  id: string;
  name: string;
  role: 'CREATOR' | 'CUSTODIAN' | 'AI_DEVELOPER' | 'PLATFORM' | 'DATASET' | 'CONSUMER';
  valueCreated: string;
  valueCaptured: string;
  riskBorne: string;
  bargainingPower: 'SOVEREIGN' | 'COLLECTIVE' | 'WEAK' | 'EXTRACTIVE';
}
