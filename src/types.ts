export type Register = "blend-modern" | "traditional" | "trendy-indian" | "coined";
export type Popularity = "low" | "medium" | "high";
export type Status = "accepted" | "rejected" | "untested";

export interface NameRecord {
  name: string;
  pronunciation: string;
  meaning: string;
  source: string;
  origin: string;
  syllables: number;
  sound_profile: string[];
  blend_score: number;
  register: Register;
  popularity: Popularity;
  status: Status;
}

export type Reaction = "keep" | "bin" | "more";
