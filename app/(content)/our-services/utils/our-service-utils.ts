// ─────────────────────────────────────────────────────────────────────────────
// UTILS — parse deliverables dari deskripsi
// Format: "...some text. deliverables: item one, item two, item three"
// ─────────────────────────────────────────────────────────────────────────────

function parseDeliverables(description: string): {
  body: string;
  deliverables: string[];
} {
  const lower = description.toLowerCase();
  const idx = lower.indexOf("deliverables:");

  if (idx === -1) return { body: description.trim(), deliverables: [] };

  const body = description
    .slice(0, idx)
    .trim()
    .replace(/\.\s*$/, ".");
  const raw = description.slice(idx + "deliverables:".length).trim();
  const deliverables = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\.$/, "").toUpperCase());

  return { body, deliverables };
}

export default parseDeliverables;
