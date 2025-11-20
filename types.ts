
export interface Reference {
  url: string;
  title: string;
  description: string;
}

export interface MineralCandidate {
  name: string;
  confidence: number;
}

export interface MineralAnalysis {
  nameChinese: string;
  nameEnglish: string;
  chemicalFormula: string;
  confidenceLevel: number; // 0 to 100
  description: string;
  historicalStories: string[]; // Changed from single string to array
  socialMediaTopics: string[]; // New field for social media discussions
  identificationReasons: string[];
  otherCandidates: MineralCandidate[]; // New field for alternative identifications
  references: Reference[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppState {
  UPLOAD = 'UPLOAD',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT'
}
