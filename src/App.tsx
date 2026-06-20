import { useMemo, useState } from "react";
import rawNames from "./names.json";
import type { NameRecord, Reaction } from "./types";
import { initWeights, applyReaction, rankUntested } from "./scoring";
import NameCard from "./NameCard";
import "./App.css";

const SEED_NAMES = rawNames as NameRecord[];

function App() {
  const [weights, setWeights] = useState(() => initWeights(SEED_NAMES));
  const [reactedNames, setReactedNames] = useState<Set<string>>(new Set());
  const [shortlist, setShortlist] = useState<NameRecord[]>(
    SEED_NAMES.filter((n) => n.status === "accepted")
  );
  const [view, setView] = useState<"stack" | "shortlist">("stack");

  const queue = useMemo(() => {
    const pool = SEED_NAMES.filter(
      (n) => n.status === "untested" && !reactedNames.has(n.name)
    );
    return rankUntested(weights, pool);
  }, [weights, reactedNames]);

  const current = queue[0];

  function handleReact(reaction: Reaction) {
    if (!current) return;
    setWeights((w) => applyReaction(w, current, reaction));
    setReactedNames((s) => new Set(s).add(current.name));
    if (reaction === "keep" || reaction === "more") {
      setShortlist((list) =>
        list.find((n) => n.name === current.name) ? list : [...list, current]
      );
    }
  }

  function removeFromShortlist(name: string) {
    setShortlist((list) => list.filter((n) => n.name !== name));
  }

  return (
    <div className="app">
      <header>
        <h2>Name Discovery</h2>
        <nav>
          <button className={view === "stack" ? "active" : ""} onClick={() => setView("stack")}>
            Discover
          </button>
          <button
            className={view === "shortlist" ? "active" : ""}
            onClick={() => setView("shortlist")}
          >
            Shortlist ({shortlist.length})
          </button>
        </nav>
      </header>

      {view === "stack" && (
        <main>
          {current ? (
            <NameCard record={current} onReact={handleReact} />
          ) : (
            <p className="empty">No more names to review. Check your shortlist.</p>
          )}
          <p className="queue-count">{queue.length} names left in this pass</p>
        </main>
      )}

      {view === "shortlist" && (
        <main className="shortlist">
          {shortlist.length === 0 && <p className="empty">Nothing kept yet.</p>}
          {shortlist.map((n) => (
            <div className="shortlist-item" key={n.name}>
              <div>
                <strong>{n.name}</strong>
                <span className="pronunciation"> {n.pronunciation}</span>
                <p className="meaning">{n.meaning}</p>
              </div>
              <button onClick={() => removeFromShortlist(n.name)}>remove</button>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
