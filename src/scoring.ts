import type { NameRecord, Register, Popularity, Reaction } from "./types";

const REGISTERS: Register[] = ["blend-modern", "traditional", "trendy-indian", "coined"];
const POPULARITY: Popularity[] = ["low", "medium", "high"];
const SOUND_TAGS = ["soft", "vowel-forward", "melodic", "hard"];

export const FEATURE_NAMES = [
  "syllables",
  "blend_score",
  "popularity",
  ...REGISTERS.map((r) => `register:${r}`),
  ...SOUND_TAGS.map((t) => `sound:${t}`),
];

export function featureVector(n: NameRecord): number[] {
  const popularityScore = POPULARITY.indexOf(n.popularity); // 0,1,2
  return [
    n.syllables,
    n.blend_score,
    popularityScore,
    ...REGISTERS.map((r) => (n.register === r ? 1 : 0)),
    ...SOUND_TAGS.map((t) => (n.sound_profile.includes(t) ? 1 : 0)),
  ];
}

export function zeroWeights(): number[] {
  return new Array(FEATURE_NAMES.length).fill(0);
}

const LEARNING_RATE = 0.15;

export function initWeights(seedNames: NameRecord[]): number[] {
  let weights = zeroWeights();
  for (const n of seedNames) {
    if (n.status === "accepted") weights = nudge(weights, n, 1);
    else if (n.status === "rejected") weights = nudge(weights, n, -1);
  }
  return weights;
}

function nudge(weights: number[], n: NameRecord, direction: 1 | -1, rate = LEARNING_RATE): number[] {
  const fv = featureVector(n);
  return weights.map((w, i) => w + direction * rate * fv[i]);
}

export function applyReaction(weights: number[], n: NameRecord, reaction: Reaction): number[] {
  if (reaction === "keep") return nudge(weights, n, 1);
  if (reaction === "bin") return nudge(weights, n, -1);
  return nudge(weights, n, 1, LEARNING_RATE * 2); // "more like this" = stronger positive nudge
}

export function score(weights: number[], n: NameRecord): number {
  const fv = featureVector(n);
  return weights.reduce((sum, w, i) => sum + w * fv[i], 0);
}

export function rankUntested(weights: number[], names: NameRecord[]): NameRecord[] {
  return names
    .filter((n) => n.status === "untested")
    .slice()
    .sort((a, b) => score(weights, b) - score(weights, a));
}

export function cosineSimilarity(a: NameRecord, b: NameRecord): number {
  const fa = featureVector(a);
  const fb = featureVector(b);
  const dot = fa.reduce((s, v, i) => s + v * fb[i], 0);
  const magA = Math.sqrt(fa.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(fb.reduce((s, v) => s + v * v, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

export function nearestNeighbours(target: NameRecord, pool: NameRecord[], count = 3): NameRecord[] {
  return pool
    .filter((n) => n.name !== target.name)
    .slice()
    .sort((a, b) => cosineSimilarity(target, b) - cosineSimilarity(target, a))
    .slice(0, count);
}

// Validation gate: real myth/source, non-coined, soft/melodic sound, high blend, not popular.
export function passesGate(n: NameRecord): boolean {
  if (n.register === "coined") return false;
  if (n.blend_score < 4) return false;
  if (n.popularity === "high") return false;
  if (n.syllables > 3) return false;
  const soft = n.sound_profile.includes("soft") || n.sound_profile.includes("melodic") || n.sound_profile.includes("vowel-forward");
  if (!soft) return false;
  if (!n.source || n.source.trim().length === 0) return false;
  return true;
}
