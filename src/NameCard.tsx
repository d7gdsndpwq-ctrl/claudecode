import type { NameRecord } from "./types";
import { passesGate } from "./scoring";

interface Props {
  record: NameRecord;
  onReact: (reaction: "keep" | "bin" | "more") => void;
}

export default function NameCard({ record, onReact }: Props) {
  const thinRoot = record.blend_score >= 4 && record.source.toLowerCase().includes("thin");
  const trending = record.popularity === "high";
  const flagged = !passesGate(record);

  return (
    <div className="name-card">
      <h1>{record.name}</h1>
      {record.pronunciation && <p className="pronunciation">{record.pronunciation}</p>}
      <p className="meaning">{record.meaning}</p>
      <p className="source">{record.source}</p>
      <div className="badges">
        <span className={`badge origin`}>{record.origin}</span>
        <span className={`badge register-${record.register}`}>{record.register}</span>
        {trending && <span className="badge warn">trending popular</span>}
        {thinRoot && <span className="badge warn">root is thin</span>}
        {flagged && <span className="badge warn">outside corridor</span>}
      </div>
      <div className="actions">
        <button className="bin" onClick={() => onReact("bin")}>
          👎 Bin
        </button>
        <button className="more" onClick={() => onReact("more")}>
          ✨ More like this
        </button>
        <button className="keep" onClick={() => onReact("keep")}>
          👍 Keep
        </button>
      </div>
    </div>
  );
}
