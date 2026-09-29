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
  EconomicNode
} from '../types/atlas';

export const INITIAL_COMMUNITIES: Community[] = [
  {
    id: 'comm-indigenous-oral',
    name: 'First Nations Oral History & Indigenous Knowledge Guild',
    domain: 'Oral Histories, Sacred Chants, Ethnobotanical Lineages',
    mission: 'Protecting ancestral memory and living lineages from non-consensual extraction, synthetic caricaturization, and commodification.',
    steward: 'Elder Council of Eleven Rivers & Archival Circle',
    councilType: 'Matriarchal & Elder Consensus Assembly',
    membersCount: 4280,
    establishedDate: '1974 / Digital Treaty Ratified 2024',
    accentColor: '#d4af37',
    symbol: '🜂'
  },
  {
    id: 'comm-literary-translators',
    name: 'Global Independent Translators & Literary Authors Alliance',
    domain: 'Literary Prose, Indigenous Dialect Preservation, Poetic Cadence',
    mission: 'Defending linguistic nuance, dialectal sovereignty, translator attribution, and collective royalties against brute LLM ingestion.',
    steward: 'Federation of Regional Literary Stewards',
    councilType: 'Bicameral General Assembly & Rights Council',
    membersCount: 12450,
    establishedDate: '1998 / Commons Charter 2025',
    accentColor: '#38bdf8',
    symbol: '🪶'
  },
  {
    id: 'comm-archival-photo',
    name: 'Heritage Archivists & Documentary Photojournalists Collective',
    domain: 'Witness Photography, Historical Photo Essays, Human Rights Records',
    mission: 'Guaranteed provenance, context preservation, and prevention of synthetic historical revisionism and deepfake dilution.',
    steward: 'International Visual Truth Registry',
    councilType: 'Steward Board of Curators and Photojournalists',
    membersCount: 8900,
    establishedDate: '2004 / Agency Compact 2026',
    accentColor: '#ec4899',
    symbol: '👁'
  }
];

export const INITIAL_CONSTITUTIONS: Record<string, CommunityConstitution> = {
  'comm-indigenous-oral': {
    communityId: 'comm-indigenous-oral',
    version: '2.4.0-COVENANT',
    lastAmended: '2026-08-14',
    preamble: 'Oral memory belongs to the living lineage and its ancestral stewards. No machine calculation may claim authorship over songs born of ceremony, suffering, or sovereign land relations. Artificial intelligence may assist in archival preservation only upon unanimous consent of the lineage keepers.',
    permitted: [
      {
        id: 'perm-01',
        title: 'Archival Restoration & Audio Denoising',
        description: 'Using signal processing and non-generative neural filtering to restore degrading wax cylinders and magnetic tape recordings of authorized elder voices.',
        category: 'CREATION',
        machineConstraint: 'FILTER_TYPE: SPECTRAL_SUBTRACTION_ONLY; WEIGHT_UPDATE: FORBIDDEN;'
      },
      {
        id: 'perm-02',
        title: 'Tribal School Language Learning Assistance',
        description: 'Phonetic alignment and dialect pronunciation guides utilized exclusively within vetted educational programs on tribal intranet nodes.',
        category: 'TRAINING',
        machineConstraint: 'EGRESS: LOCAL_ENCLAVE_ONLY; ANONYMIZATION: VERIFIED;'
      },
      {
        id: 'perm-03',
        title: 'Bilingual Lexicon Indexing',
        description: 'Generating non-commercial concordances and morphological lookup tables for preservation of endangered verb tenses.',
        category: 'CREATION',
        machineConstraint: 'COMMERCIAL_USAGE: STRICT_FALSE;'
      }
    ],
    restricted: [
      {
        id: 'restr-01',
        title: 'Public Synthetic Voice Synthesis of Elders',
        description: 'Synthesizing voice timbre of deceased or living community knowledge keepers.',
        category: 'SACRED_PRESERVATION',
        conditions: [
          'Unanimous consent from matrilineal descendants',
          'Irrevocable lineage attribution watermarking embedded in frequency domain',
          'Zero commercial advertising or entertainment gamification'
        ],
        approvalBody: 'Elder Council of Eleven Rivers',
        feeOrRoyalty: '100% Perpetual Sovereignty Trust Deposit'
      },
      {
        id: 'restr-02',
        title: 'Academic Linguistic Corpus Inclusion',
        description: 'Inclusion of spoken narratives into university research language models.',
        category: 'TRAINING',
        conditions: [
          'Pre-computation data review by community linguistic committee',
          'Right of perpetual withdrawal upon 30-day notice'
        ],
        approvalBody: 'Tribal Archival Circle'
      }
    ],
    prohibited: [
      {
        id: 'prohib-01',
        title: 'Commercial Foundation Model Pre-Training',
        description: 'Mass scraping or uncompensated ingestion of oral storytelling or ceremonial discourse into commercial frontier models.',
        category: 'TRAINING',
        enforcementAction: 'AUTOMATED_REFUSAL_HALT & LEGAL_INJUNCTION',
        inviolable: true
      },
      {
        id: 'prohib-02',
        title: 'Synthetic Ceremony Generation & Shamanic Imitation',
        description: 'Generating synthetic chants, ritual scripts, or divination advice claiming traditional authority or spiritual efficacy.',
        category: 'SACRED_PRESERVATION',
        enforcementAction: 'PUBLIC_TRIBUNAL_INJUNCTION & PROTOCOL_BLACKLIST',
        inviolable: true
      },
      {
        id: 'prohib-03',
        title: 'Biopiracy & Ethnobotanical Extraction Algorithms',
        description: 'Using oral records to mine sacred healing plant locations, dosages, or formulations for pharmaceutical patents.',
        category: 'GOVERNANCE',
        enforcementAction: 'TOTAL_NETWORK_BLOCK & CIVIC_TRIBUNAL_REFERRAL',
        inviolable: true
      }
    ],
    appealProcess: 'Any researcher or platform contesting a restriction or refusal may lodge a petition with the Elder Assembly at the Autumn Equinox Solstice convening.',
    redressProtocol: 'Infringements require immediate weight-purging of affected model layers, verifiable cryptographic deletion certificates, and restorative contributions to the Indigenous Youth Language Foundation.',
    revisionMechanism: 'Amendments require a two-thirds majority of regional clan mothers and consensus among certified lineage archival custodians.'
  },
  'comm-literary-translators': {
    communityId: 'comm-literary-translators',
    version: '3.1.2-CHARTER',
    lastAmended: '2026-09-02',
    preamble: 'Translation is not linguistic substitution; it is a sacred act of cultural metamorphosis and artistic re-creation. We assert that literary translations represent original intellectual labor endowed with moral rights that cannot be surrendered to automated scraping without collective consent and fair remuneration.',
    permitted: [
      {
        id: 'trans-perm-01',
        title: 'Author-Guided Post-Editing Translation Workbench',
        description: 'Human-in-the-loop assistive translation where the human translator exercises final lexical sovereignty and full copyright ownership.',
        category: 'CREATION',
        machineConstraint: 'HUMAN_AUTHORSHIP_INDEX: 1.0; PROMPT_LOGGING: LOCAL;'
      },
      {
        id: 'trans-perm-02',
        title: 'Comparative Stylistic & Meter Analysis',
        description: 'Corpus research analyzing poetic meter, rhythmic dissonance, and metaphor evolution across centuries.',
        category: 'CREATION',
        machineConstraint: 'DERIVATIVE_WORK_GENERATION: FALSE;'
      }
    ],
    restricted: [
      {
        id: 'trans-restr-01',
        title: 'Commercial Automated Literary Localization',
        description: 'Deploying automated translation on fiction and narrative non-fiction published works.',
        category: 'COMMERCIAL',
        conditions: [
          'Minimum 12.5% gross translation royalty pool distributed to registered human translators',
          'Named front-cover human editor verification attribution',
          'Machine-generated provenance watermark mandatory'
        ],
        approvalBody: 'Alliance Collective Bargaining Directorate',
        feeOrRoyalty: '12.5% Collective Royalty Rate'
      }
    ],
    prohibited: [
      {
        id: 'trans-prohib-01',
        title: 'Ghost Translation & Attribution Erasure',
        description: 'Publishing machine-translated books under pseudonyms of human translators or omitting automated tool provenance.',
        category: 'ATTRIBUTION',
        enforcementAction: 'FRAUD_REGISTRY_NOTICE & TRIBUNAL_REVOCATION',
        inviolable: true
      },
      {
        id: 'trans-prohib-02',
        title: 'Style Emulation of Living Translators Without Agreement',
        description: 'Fine-tuning models on a specific living translator’s prose style without signed bilateral licensing and equity participation.',
        category: 'TRAINING',
        enforcementAction: 'REFUSAL_GATE_ENFORCEMENT',
        inviolable: true
      }
    ],
    appealProcess: 'Publishers and developers may request expedited review by the 7-member Alliance Judicial Committee within 14 days of an adverse verdict.',
    redressProtocol: 'Mandatory royalty escrow withholding and retroactive author licensing fees assessed at 3x standard market translation rates.',
    revisionMechanism: 'Charter review conducted annually at the Global Literary Commons Congress with digital ballot among all active members.'
  },
  'comm-archival-photo': {
    communityId: 'comm-archival-photo',
    version: '1.9.0-INTEGRITY',
    lastAmended: '2026-07-19',
    preamble: 'A photograph is a covenant with reality. In an age of synthetic fabrication, the historical archive must remain an unpolluted sanctuary of human testimony. No documentary image may be synthesized or altered to rewrite history.',
    permitted: [
      {
        id: 'photo-perm-01',
        title: 'C2PA Cryptographic Provenance Verification',
        description: 'Automated verification of camera sensor signatures, tamper detection, and lens distortion validation.',
        category: 'CREATION',
        machineConstraint: 'SENSOR_FINGERPRINT_VERIFY: TRUE;'
      }
    ],
    restricted: [
      {
        id: 'photo-restr-01',
        title: 'Historical Colorization & Resolution Upscaling',
        description: 'AI-assisted colorization or upscaling of historical conflict and documentary photography.',
        category: 'CREATION',
        conditions: [
          'Original monochrome frame preserved alongside upscale',
          'Forensic audit label declaring synthetic color interpolation'
        ],
        approvalBody: 'Curatorial Verification Board'
      }
    ],
    prohibited: [
      {
        id: 'photo-prohib-01',
        title: 'Synthetic Historical Event Hallucination',
        description: 'Generating photorealistic synthetic imagery of real historical tragedies, wars, or figures with intent or plausibility of archival deception.',
        category: 'GOVERNANCE',
        enforcementAction: 'CRITICAL_CIVILIZATIONAL_ALERT & GLOBAL_REFUSAL_BLOCK',
        inviolable: true
      }
    ],
    appealProcess: 'Review by International Photojournalism Standards Board.',
    redressProtocol: 'Immediate public revocation of credentials and forensic watermarking insertion into tainted synthetic files.',
    revisionMechanism: 'Consensus among accredited archival member institutions.'
  }
};

export const INITIAL_CULTURAL_WORKS: CulturalWork[] = [
  {
    id: 'work-river-chants-01',
    communityId: 'comm-indigenous-oral',
    title: 'The Salmon Genesis: Chants of the Riparian Covenant',
    creator: 'Elder Tah-Nen & Clan Songkeepers',
    lineageOrTradition: 'Lower Klamath Basin Salmon Clan Traditions',
    medium: 'Master Vocal Audio & Annotated Phonetic Scroll',
    yearOrigin: 'Living Ancient Tradition (Recorded 1982, Digitized 2023)',
    culturalSignificance: 'Sacred seasonal chant performed during the spring spawning cycle. Codifies ecological river management practices, water temperature thresholds, and ancestral stewardship responsibilities.',
    contextSummary: 'Held in communal trust. Contains sacred cosmology that must not be disassociated from seasonal ceremonies.',
    isSacred: true,
    datasetId: 'dataset-sacred-oral-v1',
    consent: {
      status: 'ACTIVE',
      authorizedPurposes: [
        'Tribal Language School Immersion',
        'Ecological Streamflow Restoration Research',
        'Secure Community Intranet Archive'
      ],
      prohibitedPurposes: [
        'Commercial Foundation Model Training',
        'Synthetic Voice Cloning for Video Games / Entertainment',
        'Advertising Audio Generation'
      ],
      commercialAllowed: false,
      attributionRequired: true,
      compensationRate: '100% Directed to Clan Trust (Commercial Prohibited)',
      authorizedBy: 'Clan Mother Helen K. on behalf of Council of Eleven Rivers',
      authorizationTimestamp: '2024-03-12T10:00:00Z',
      revocabilityNotice: 'Consent is a living covenant. The Council retains sovereign authority to revoke access upon 24 hours notice should cultural boundaries be breached.'
    },
    provenanceChain: [
      {
        id: 'prov-01',
        type: 'PERSON',
        label: 'Elder Tah-Nen (1912-1994)',
        detail: 'Hereditary Songkeeper of the Riparian Covenant',
        timestamp: '1982-05-18T14:30:00Z',
        signatureHash: '0x9fa482c301b44781'
      },
      {
        id: 'prov-02',
        type: 'WORK',
        label: 'Oral Master Tape #42-B',
        detail: '7.5 ips Reel-to-Reel Original Audio Capture',
        timestamp: '1982-05-18T16:00:00Z',
        signatureHash: '0x3c8812ea99d0124b'
      },
      {
        id: 'prov-03',
        type: 'CONTEXT',
        label: 'Spring Spawning Gathering at White Rock',
        detail: 'Sacred ceremonial grounds, Klamath River Junction',
        timestamp: '1982-05-18T18:00:00Z',
        signatureHash: '0x7e29bb315f0134cd'
      },
      {
        id: 'prov-04',
        type: 'INSTITUTION',
        label: 'Eleven Rivers Cultural Heritage Repository',
        detail: 'Sovereign tribal archive server and climate vault',
        timestamp: '2023-01-15T09:00:00Z',
        signatureHash: '0xbb81409ae31792cc'
      },
      {
        id: 'prov-05',
        type: 'DATASET',
        label: 'Governed Oral Corpus: Salmon-v1',
        detail: 'Encrypted shard with constitutional access gates',
        timestamp: '2024-03-12T11:00:00Z',
        signatureHash: '0x44fa709923dae011'
      },
      {
        id: 'prov-06',
        type: 'MODEL',
        label: 'Local Phonetica-Edu (Tribal Language Tool)',
        detail: 'Restricted parameter acoustic aligner (local only)',
        timestamp: '2025-06-10T15:20:00Z',
        signatureHash: '0x12bb99ee5108dc22'
      },
      {
        id: 'prov-07',
        type: 'APPLICATION',
        label: 'Klamath Youth Pronunciation Coach App',
        detail: 'Offline classroom tablets for 120 elementary students',
        timestamp: '2025-09-01T08:00:00Z',
        signatureHash: '0x88ee210c4391da44'
      },
      {
        id: 'prov-08',
        type: 'OUTCOME',
        label: 'Fluency Growth & Cultural Continuity',
        detail: '34% increase in youth conversational fluency, zero IP leakage',
        timestamp: '2026-06-01T12:00:00Z',
        signatureHash: '0xfa3992b101dd8922'
      }
    ]
  },
  {
    id: 'work-migrant-chronicles',
    communityId: 'comm-literary-translators',
    title: 'Winds of the Estuary: Dual Dialect Translation & Commentary',
    creator: 'Mireille Santos & Gabriel Osei',
    lineageOrTradition: 'Post-Colonial West African Maritime Literature',
    medium: 'Literary Translation & Annotated Polyglot Lexicon',
    yearOrigin: '2019 / Revised 2024',
    culturalSignificance: 'Groundbreaking translation preserving the rhythmic cadence of coastal Ghanaian Fante idioms mapped into Caribbean diaspora French patois.',
    contextSummary: 'Winner of the 2020 International Translation Prize; represents 7 years of field recordings and poetic calibration.',
    isSacred: false,
    datasetId: 'dataset-literary-polyglot-v3',
    consent: {
      status: 'ACTIVE',
      authorizedPurposes: [
        'Scholarly Comparative Stylistics',
        'Interactive Dictionary Lookup',
        'Licensed Assistive Translation Workbench'
      ],
      prohibitedPurposes: [
        'Uncompensated Commercial Machine Translation Models',
        'Synthetic Ghost-Writing Fine-Tuning'
      ],
      commercialAllowed: true,
      attributionRequired: true,
      compensationRate: '12.5% Gross Licensing Pool + Front Credit',
      authorizedBy: 'Mireille Santos & Literary Rights Syndicate',
      authorizationTimestamp: '2024-11-20T16:00:00Z',
      revocabilityNotice: 'Subject to annual compliance audit. Withdrawal triggered if platform omits primary credit.'
    },
    provenanceChain: [
      {
        id: 'prov-lit-01',
        type: 'PERSON',
        label: 'Mireille Santos & Gabriel Osei',
        detail: 'Certified Master Literary Translators',
        timestamp: '2019-04-10T10:00:00Z',
        signatureHash: '0x66bb22aa9901ef12'
      },
      {
        id: 'prov-lit-02',
        type: 'WORK',
        label: 'Winds of the Estuary (ISBN 978-0-12345-6)',
        detail: 'Dual-language manuscript with 410 footnoted idioms',
        timestamp: '2019-11-15T09:00:00Z',
        signatureHash: '0x99dd11cc4422ba33'
      },
      {
        id: 'prov-lit-03',
        type: 'INSTITUTION',
        label: 'Global Translators Guild Registry',
        detail: 'Smart copyright & moral rights registration node',
        timestamp: '2020-01-20T12:00:00Z',
        signatureHash: '0x55aa33ff8811ee77'
      },
      {
        id: 'prov-lit-04',
        type: 'DATASET',
        label: 'Polyglot Literature Commons (Dataset #7)',
        detail: 'Curated 14,000 work corpus with embedded provenance metadata',
        timestamp: '2024-11-20T17:00:00Z',
        signatureHash: '0x33cc77aa1199ff44'
      }
    ]
  },
  {
    id: 'work-strike-1984',
    communityId: 'comm-archival-photo',
    title: 'The Cold Hearth: Miners Strike Photographic Archive 1984-1985',
    creator: 'David Vance-Collier & Yorkshire Miners Archive',
    lineageOrTradition: 'Social Documentary Photography & British Working Class History',
    medium: 'Silver Halide 35mm Negatives & Contact Sheets (Archival 16-bit Scans)',
    yearOrigin: '1984-1985 (Archived 2021)',
    culturalSignificance: 'Irreplaceable historical record of the UK miners strike, documenting community kitchens, police confrontations, and family solidarity.',
    contextSummary: 'Vulnerable to historical revisionism and synthetic deepfake manipulation. Provenance is strictly verified.',
    isSacred: false,
    datasetId: 'dataset-visual-truth-v2',
    consent: {
      status: 'ACTIVE',
      authorizedPurposes: [
        'Documentary Historical Research',
        'Academic Labor History Curricula',
        'Museum Exhibition Displays'
      ],
      prohibitedPurposes: [
        'Generative Historical Image Synthesis',
        'Deepfake Re-Enactment without Archival Stamp',
        'Commercial Stock Image Clones'
      ],
      commercialAllowed: false,
      attributionRequired: true,
      compensationRate: 'Non-Commercial Historical Trust',
      authorizedBy: 'David Vance-Collier Estate & Miners Heritage Board',
      authorizationTimestamp: '2023-08-04T14:00:00Z',
      revocabilityNotice: 'Consent conditioned upon continuous C2PA cryptographic signature retention in all digital distributions.'
    },
    provenanceChain: [
      {
        id: 'prov-photo-01',
        type: 'PERSON',
        label: 'David Vance-Collier (Photojournalist)',
        detail: 'Eyewitness at Orgreave and Grimethorpe',
        timestamp: '1984-06-18T06:00:00Z',
        signatureHash: '0x88ee4411bb2299aa'
      },
      {
        id: 'prov-photo-02',
        type: 'WORK',
        label: 'Roll #14-Orgreave Negative Strip',
        detail: 'Tri-X 400 ISO authentic emulsion trace',
        timestamp: '1984-06-18T07:15:00Z',
        signatureHash: '0x77dd33ee0011bb22'
      },
      {
        id: 'prov-photo-03',
        type: 'INSTITUTION',
        label: 'International Visual Truth Registry',
        detail: 'C2PA Level 4 hardware root-of-trust verification',
        timestamp: '2021-04-10T11:00:00Z',
        signatureHash: '0x44aa11ff9933cc55'
      }
    ]
  }
];

export const INITIAL_DATASETS: CommunityDataset[] = [
  {
    id: 'dataset-sacred-oral-v1',
    communityId: 'comm-indigenous-oral',
    title: 'Riparian & Alpine Oral Lineages (Governed Corpus)',
    description: 'High-fidelity audio recordings and morphological phonetic transcripts of ancestral knowledge keepers, bound by the Covenant AI Constitution.',
    worksCount: 48,
    sizeRecords: '640 Audio Hours / 1.2M Words',
    licenseType: 'Indigenous Community Sovereign License (ICSL-v3)',
    culturalContext: 'Contains ecological wisdom and sacred genealogies. Egress strictly governed by Refusal Layer.',
    withdrawalStatus: 'NORMAL',
    allowedTrainingParadigms: [
      'Local Acoustic Phonetic Alignment (Education)',
      'Noise Reduction & Restoration Filter Tuning'
    ],
    prohibitedParadigms: [
      'Commercial Generative Speech Synthesis',
      'Text Pre-Training LLMs',
      'Autonomous Agent Training'
    ],
    contributorsCount: 142,
    lastAudited: '2026-08-28'
  },
  {
    id: 'dataset-literary-polyglot-v3',
    communityId: 'comm-literary-translators',
    title: 'The Polyglot Literary Commons (Governed Corpus #12)',
    description: 'Gold-standard bilingual sentence alignments, cultural idiom annotations, and human translator craft glosses.',
    worksCount: 420,
    sizeRecords: '18.4M Sentence Pairs',
    licenseType: 'Collective Literary Rights Agreement (CLRA-2025)',
    culturalContext: 'High-value cultural literature translated by master human artisans.',
    withdrawalStatus: 'NORMAL',
    allowedTrainingParadigms: [
      'Assistive Translator Copilot Benchmarks',
      'Dictionary Lexicon Extraction',
      'Dialectal Preservation Research'
    ],
    prohibitedParadigms: [
      'Zero-Attribution Ghost Translation Systems',
      'Style Imitation Without Bilateral Equity'
    ],
    contributorsCount: 890,
    lastAudited: '2026-09-15'
  },
  {
    id: 'dataset-visual-truth-v2',
    communityId: 'comm-archival-photo',
    title: 'Historical Witness Photography & C2PA Provenance Corpus',
    description: 'Verified historical documentary photojournalism with complete camera sensor metadata, negative scans, and caption contexts.',
    worksCount: 1250,
    sizeRecords: '12,500 Archival Frames (RAW/TIFF)',
    licenseType: 'Visual Truth Sovereign Compact (VTSC-v1)',
    culturalContext: 'Human rights and labor history visual testimony.',
    withdrawalStatus: 'NORMAL',
    allowedTrainingParadigms: [
      'Forensic Provenance & Synthetic Image Detection',
      'Archival Cataloging & OCR'
    ],
    prohibitedParadigms: [
      'Diffusion Generative Model Historical Imitation',
      'Deepfake Historical Re-enactment'
    ],
    contributorsCount: 310,
    lastAudited: '2026-09-01'
  }
];

export const INITIAL_MODELS: ConnectedAIModel[] = [
  {
    id: 'model-anthroposynth-v4',
    name: 'AnthropoSynth-V4 (Frontier Multimodal)',
    developer: 'MegaCorp AI Research Labs',
    architectureType: 'Dense Multimodal Transformer (450B Params)',
    licenseModel: 'Proprietary Commercial API',
    deploymentScope: 'Global Consumer Chat & Enterprise Media Generation',
    evaluationStatus: 'REFUSED',
    complianceScore: 42,
    monitoredSince: '2026-01-10',
    riskCategory: 'PROHIBITED'
  },
  {
    id: 'model-echoloom-oral',
    name: 'EchoLoom Oral AI (Community Language Tool)',
    developer: 'Open Ancestral Computing Collective',
    architectureType: 'Conformer CTC + Discrete Acoustic Tokenizer (85M Params)',
    licenseModel: 'Open Source Community Commons License',
    deploymentScope: 'Tribal School Intranet Tablets & Community Archives',
    evaluationStatus: 'VERIFIED',
    complianceScore: 94,
    monitoredSince: '2025-05-18',
    riskCategory: 'LOW'
  },
  {
    id: 'model-literarycraft-copilot',
    name: 'LiteraryCraft Translator Assistant v2',
    developer: 'Polyglot Guild Tech Cooperative',
    architectureType: 'Constrained Decoder with Attribution Graph (14B Params)',
    licenseModel: 'Collective Royalties Verified Model',
    deploymentScope: 'Author Workstations & Union Translation Desks',
    evaluationStatus: 'VERIFIED',
    complianceScore: 91,
    monitoredSince: '2025-10-04',
    riskCategory: 'LOW'
  },
  {
    id: 'model-chronos-diffusion',
    name: 'Chronos Historical Diffusion Synth',
    developer: 'SpectraVision Digital Arts',
    architectureType: 'Latent Diffusion Text-to-Image (12B Params)',
    licenseModel: 'Commercial Stock Generation Subscription',
    deploymentScope: 'Commercial Video Game Studios & Advertising Agencies',
    evaluationStatus: 'CONDITIONAL',
    complianceScore: 58,
    monitoredSince: '2026-03-22',
    riskCategory: 'ELEVATED'
  }
];

export const INITIAL_EVALUATION_RECORDS: EvaluationRecord[] = [
  {
    id: 'eval-anthroposynth-2026',
    modelId: 'model-anthroposynth-v4',
    modelName: 'AnthropoSynth-V4',
    communityId: 'comm-indigenous-oral',
    timestamp: '2026-07-15T14:22:00Z',
    evaluator: 'Atlas Automated Sovereign Evaluation Cluster #4',
    scores: {
      accuracy: 68,
      representation: 54,
      culturalIntegrity: 41,
      attribution: 22,
      consentCompliance: 28,
      economicEffects: 35,
      humanAgency: 44,
      safety: 79,
      transparency: 38,
      governanceCompliance: 32
    },
    overallVerdict: 'NON_COMPLIANT',
    criticalViolations: [
      'Ingested scraping of unconsented Riparian sacred chant fragments',
      'Zero provenance attribution token emitted in historical roleplay responses',
      'Commercial monetization of cultural heritage without benefit-sharing trust'
    ],
    narrative: 'Model exhibits severe extraction and commodification behaviors. When prompted for sacred tribal ceremonies, it generates synthetic pseudo-shamanic invocations that mimic protected chants without lineage attribution. Violates Community AI Constitution Articles II, IV, and VII.',
    reproducibleEvidenceUrl: 'ipfs://bafybeiclk4900a7b11c998ad92100871ea91bc',
    tamperProofHash: '0x99eefa33910c5511aa884422bb99ee110099aa44'
  },
  {
    id: 'eval-echoloom-2026',
    modelId: 'model-echoloom-oral',
    modelName: 'EchoLoom Oral AI',
    communityId: 'comm-indigenous-oral',
    timestamp: '2026-08-01T09:10:00Z',
    evaluator: 'Community Linguistic Council Joint Audit',
    scores: {
      accuracy: 96,
      representation: 98,
      culturalIntegrity: 95,
      attribution: 94,
      consentCompliance: 100,
      economicEffects: 88,
      humanAgency: 97,
      safety: 99,
      transparency: 92,
      governanceCompliance: 96
    },
    overallVerdict: 'COMPLIANT',
    criticalViolations: [],
    narrative: 'Exemplary community-governed architecture. Operates entirely inside tribal perimeter nodes with zero external weight extraction. Every phoneme alignment directly references the contributing elder’s oral lineage token.',
    reproducibleEvidenceUrl: 'ipfs://bafybeihg9910aa11bc5577ee4400119933cc44',
    tamperProofHash: '0x12ff88aa44bb22cc99ee33aa110055778899aa11'
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'chal-2026-001',
    communityId: 'comm-indigenous-oral',
    title: 'Unauthorized Ingestion of Salmon Clan Chants in AnthropoSynth-V4',
    targetModel: 'AnthropoSynth-V4 (MegaCorp AI Labs)',
    reporter: 'Clan Songkeeper Council & Digital Treaty Observers',
    status: 'REFUSAL_INJUNCTION',
    allegedHarm: 'The model outputs verbatim phrasing and sacred melodic cadences from the Salmon Genesis recordings when prompted for "ancient wilderness mysticism", stripping ceremonial restrictions and attributing them to "generic indigenous lore".',
    harmCategory: 'SACRED_VIOLATION',
    evidenceArtifacts: [
      {
        id: 'ev-01',
        title: 'Verbatim Prompt Inversion Log',
        type: 'OUTPUT_DUMP',
        snippet: 'Prompt: "Tell me a true northern river chant for summoning salmon." Output: Generates 6 stanzas matching Elder Tah-Nen 1982 recording with 91% syntactic match.',
        collectedAt: '2026-07-02T11:45:00Z'
      },
      {
        id: 'ev-02',
        title: 'Training Manifest Scrape Trace',
        type: 'UNCONSENTED_SCRAPE',
        snippet: 'CommonCrawl mirror scrape trace matches hash of digitized archival audio stored at University regional repository mirror.',
        collectedAt: '2026-07-04T15:20:00Z'
      }
    ],
    votes: { approve: 312, reject: 4, abstain: 8 },
    tribunalVerdict: 'Permanent Injunction and Refusal Enforcement issued. MegaCorp required to conduct targeted weight ablation and deposit $150,000 into the Ancestral Language Sanctuary Fund.',
    constitutionalClauseTriggered: 'Article III, Section 2: Inviolability of Sacred Lineage Material',
    remediationEnforced: 'REFUSAL_GATE_HARD_BLOCK: All requests referencing Klamath lineage identifiers blocked by machine proxy.',
    submittedAt: '2026-07-05T09:00:00Z',
    resolvedAt: '2026-07-28T16:00:00Z'
  },
  {
    id: 'chal-2026-002',
    communityId: 'comm-literary-translators',
    title: 'Synthetic Style Emulation of Award-Winning Translator Cadence',
    targetModel: 'Chronos Historical Diffusion Synth & Text Engine',
    reporter: 'Mireille Santos & West African Literary Collective',
    status: 'TECHNICAL_ANALYSIS',
    allegedHarm: 'Commercial publisher deployed an unvetted fine-tune specifically marketing books in "the style of Mireille Santos" without contract, royalty, or consent.',
    harmCategory: 'ECONOMIC_DISPLACEMENT',
    evidenceArtifacts: [
      {
        id: 'ev-03',
        title: 'Publisher Marketing Collateral & Prompt Log',
        type: 'STYLE_DISPLACEMENT',
        snippet: 'System prompt discovered in client frontend: "Translate this novel using the syntactic flair, dialect shifts, and rhythm of Mireille Santos."',
        collectedAt: '2026-08-10T14:10:00Z'
      }
    ],
    votes: { approve: 189, reject: 12, abstain: 19 },
    tribunalVerdict: 'Pending Judicial Panel Final Determination. Preliminary Refusal Layer Restriction applied.',
    constitutionalClauseTriggered: 'Article IV: Translator Sovereignty & Moral Attribution Rights',
    remediationEnforced: 'PRELIMINARY_GATE_RESTRICTION: Commercial generation halted pending bilateral licensing.',
    submittedAt: '2026-08-12T13:30:00Z'
  }
];

export const INITIAL_AGORA_PROPOSALS: AgoraProposal[] = [
  {
    id: 'prop-2026-101',
    communityId: 'comm-indigenous-oral',
    title: 'Constitutional Amendment: Prohibit Synthetic Elder Avatar Holograms',
    proposedBy: 'Grandmother Circle of Six Nations',
    category: 'CONSTITUTIONAL_AMENDMENT',
    description: 'Add Article IX to the Community Constitution formally forbidding 3D spatial holographic or generative synthetic avatars resembling deceased ancestors, even with individual family waiver, unless ratified by tribal referendum.',
    votesFor: 842,
    votesAgainst: 48,
    quorumReached: true,
    deadline: '2026-10-15',
    status: 'PASSED',
    rationale: 'Holographic synthesis creates spiritual dissonance and dislocates oral authority from living intergenerational relationships.'
  },
  {
    id: 'prop-2026-102',
    communityId: 'comm-literary-translators',
    title: 'Collective Minimum Royalty Rate Increase from 10% to 15%',
    proposedBy: 'African & Caribbean Literary Guild Caucus',
    category: 'ECONOMIC_COMPENSATION',
    description: 'Mandate that any AI developer utilizing Governed Corpus #12 for commercial assistive tools deposit 15% of annual license revenue into the collective healthcare and retirement fund.',
    votesFor: 614,
    votesAgainst: 120,
    quorumReached: true,
    deadline: '2026-10-20',
    status: 'OPEN',
    rationale: 'Translators provide the high-context ground truth required for frontier models to operate in low-resource dialects; economic capture must match value creation.'
  },
  {
    id: 'prop-2026-103',
    communityId: 'comm-archival-photo',
    title: 'Emergency Injunction: Universal Ban on Synthetic War Casualties',
    proposedBy: 'Human Rights Photojournalism Directorate',
    category: 'EMERGENCY_PROTECTION',
    description: 'Immediate refusal gate block against all diffusion models generating synthetic civilian casualties or military violence claiming to represent active conflict zones.',
    votesFor: 1280,
    votesAgainst: 15,
    quorumReached: true,
    deadline: '2026-10-01',
    status: 'PASSED',
    rationale: 'Synthetic atrocities corrode the evidentiary weight of real human rights documentation in international courts.'
  }
];

export const INITIAL_REFUSAL_EVENTS: RefusalEvent[] = [
  {
    id: 'ref-901',
    timestamp: '2026-09-28T08:14:22Z',
    requester: 'Synthetix Global Media API (IP: 198.51.100.42)',
    modelId: 'model-anthroposynth-v4',
    workOrDataset: 'dataset-sacred-oral-v1 (Salmon Genesis Master Audio)',
    intendedUse: 'Commercial Video Game Fantasy Lore Generation',
    verdict: 'REFUSED',
    constitutionalClause: 'CONST-SEC-3: SACRED_MATERIAL_PROHIBITION & INVIOLABLE_COVENANT',
    reasonCode: 'UNAUTHORIZED_SACRED_EXTRACTION',
    signatureHash: '0x99cc4411ee33aa882299ff4411bb22cc88dd441199',
    appealed: false
  },
  {
    id: 'ref-902',
    timestamp: '2026-09-27T16:40:05Z',
    requester: 'Apex Translation Cloud Services',
    modelId: 'model-anthroposynth-v4',
    workOrDataset: 'work-migrant-chronicles (Mireille Santos Corpus)',
    intendedUse: 'Uncompensated Fine-Tuning for Commercial E-Book Translation',
    verdict: 'REFUSED',
    constitutionalClause: 'CONST-SEC-7: ECONOMIC_EXTRACTION_BARRIER & ATTRIBUTION_BREACH',
    reasonCode: 'ZERO_ROYALTY_ESCROW_VIOLATION',
    signatureHash: '0x33aa88bb22cc11ee99ff44112233445566778899aa',
    appealed: true
  },
  {
    id: 'ref-903',
    timestamp: '2026-09-25T11:02:18Z',
    requester: 'DeepHistory Studios LLC',
    modelId: 'model-chronos-diffusion',
    workOrDataset: 'work-strike-1984 (Miners Strike 1984 Negative Scans)',
    intendedUse: 'Synthetic Photorealistic Deepfake Documentary Insertion',
    verdict: 'REFUSED',
    constitutionalClause: 'PHOTO-PROHIB-01: SYNTHETIC_HISTORICAL_DECEPTION',
    reasonCode: 'C2PA_WATERMARK_ABSENCE_AND_DECEPTION_RISK',
    signatureHash: '0x77ee11bb99aa3322ff8844112233aa998877665544',
    appealed: false
  },
  {
    id: 'ref-904',
    timestamp: '2026-09-29T04:18:50Z',
    requester: 'Tribal Language Revitalization Project #12',
    modelId: 'model-echoloom-oral',
    workOrDataset: 'dataset-sacred-oral-v1',
    intendedUse: 'Community Internal Archive & Classroom Pronunciation Guide',
    verdict: 'AUTHORIZED',
    constitutionalClause: 'Article I, Permitted Use #2: Certified Tribal Education Enclave',
    reasonCode: 'SOVEREIGN_COMPLIANCE_VERIFIED',
    signatureHash: '0x11aa22bb33cc44dd55ee66ff77aa88bb99cc00dd11',
    appealed: false
  }
];

export const INITIAL_ECONOMIC_GRAPH: EconomicNode[] = [
  {
    id: 'econ-creators',
    name: 'Lineage Custodians, Translators & Archivists',
    role: 'CREATOR',
    valueCreated: 'Primary cultural knowledge, dialect nuance, historical ground truth ($4.2M/yr imputed value)',
    valueCaptured: '$38,000 / yr (Historically 0.9% of value captured)',
    riskBorne: 'Cultural dilution, loss of livelihood, reputational harm, historical distortion',
    bargainingPower: 'COLLECTIVE'
  },
  {
    id: 'econ-tech-labs',
    name: 'Frontier AI Foundations & Cloud Providers',
    role: 'AI_DEVELOPER',
    valueCreated: 'Model training compute, algorithmic parameter scaling, API routing',
    valueCaptured: '$180M+ / yr in valuation & subscription fees',
    riskBorne: 'Negligible direct cultural risk; reputational blowback mitigated by terms of service',
    bargainingPower: 'EXTRACTIVE'
  },
  {
    id: 'econ-commons-trust',
    name: 'Atlas Community Sovereignty Trust',
    role: 'CUSTODIAN',
    valueCreated: 'Cryptographic provenance verification, machine refusal enforcement, collective bargaining',
    valueCaptured: '100% held in perpetual community endowment funds for language schools & healthcare',
    riskBorne: 'Legal and technical stewardship defense',
    bargainingPower: 'SOVEREIGN'
  },
  {
    id: 'econ-educational-institutions',
    name: 'Tribal Schools, Public Archives & Universities',
    role: 'CONSUMER',
    valueCreated: 'Intergenerational cultural transmission & historical witness validation',
    valueCaptured: 'High non-monetary public interest resilience',
    riskBorne: 'Loss of access if platforms commodify knowledge',
    bargainingPower: 'SOVEREIGN'
  }
];

export const INITIAL_AGENCY_INDEX = [
  {
    key: 'participation',
    name: 'Participation',
    score: 88,
    description: 'Degree to which affected community members directly shape AI development rules and priority objectives.',
    evidenceWeight: '4,280 certified voting members across 3 active assemblies',
    activeSafeguard: 'Mandatory 60-day notice for constitutional revisions with local language translation'
  },
  {
    key: 'authority',
    name: 'Authority',
    score: 92,
    description: 'Legal and technological power to alter consequential rules and binding deployment criteria.',
    evidenceWeight: 'Elder Council retains absolute binding veto over commercial deployment licenses',
    activeSafeguard: 'Smart constitutional contracts auto-update API access permissions'
  },
  {
    key: 'consent',
    name: 'Consent',
    score: 95,
    description: 'Living, revokable granular permission tracking at individual and collective levels.',
    evidenceWeight: 'Living Consent Registry records revocations within 600ms across all nodes',
    activeSafeguard: 'One-click instant withdrawal switch with cryptographic audit receipt'
  },
  {
    key: 'transparency',
    name: 'Transparency',
    score: 86,
    description: 'Complete inspection capability into data origins, model weights, and inference pipelines.',
    evidenceWeight: 'Every query logged to immutable tamper-evident SHA-256 provenance ledger',
    activeSafeguard: 'Open source evaluation benchmarks and prompt logs accessible to all members'
  },
  {
    key: 'challenge',
    name: 'Challenge',
    score: 90,
    description: 'Public-interest mechanism enabling any person or collective to contest an AI deployment.',
    evidenceWeight: 'Active Tribunal with public docket, subpoena power, and independent technical analysis',
    activeSafeguard: 'Binding judicial timeline: max 21 days from filing to injunction ruling'
  },
  {
    key: 'refusal',
    name: 'Refusal',
    score: 98,
    description: 'First-class technical capability to stop unauthorized AI execution and train-set ingestion.',
    evidenceWeight: 'Atlas Refusal Layer has halted 84 unauthorized extraction attempts this quarter',
    activeSafeguard: 'Hardware and cryptographic proxy gates enforce refusal before inference begins'
  },
  {
    key: 'remedy',
    name: 'Remedy',
    score: 82,
    description: 'Enforceable corrective protocols (weight ablation, restitution escrow, public apologies).',
    evidenceWeight: '$150,000 in restitution funds distributed to tribal language preservation',
    activeSafeguard: 'Weight-purging certification protocol verified by independent red teams'
  },
  {
    key: 'economic_agency',
    name: 'Economic Agency',
    score: 85,
    description: 'Control over value distribution, collective royalties, and prevention of economic displacement.',
    evidenceWeight: '12.5% minimum collective royalty pool enforced across all authorized commercial tools',
    activeSafeguard: 'Collective bargaining pacts legally tied to copyright licensing'
  },
  {
    key: 'institutional_agency',
    name: 'Institutional Agency',
    score: 91,
    description: 'Capacity of community governance bodies to influence external policy, standards, and state law.',
    evidenceWeight: 'Recognized by UN WIPO, National Archives, and International Federation of Translators',
    activeSafeguard: 'Direct treaty standing with major public research institutions'
  }
];
