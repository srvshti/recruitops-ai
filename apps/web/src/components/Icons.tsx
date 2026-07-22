export function Icon({ name }: { name: string }) {
  const glyphs: Record<string, string> = {
    home: "⌂",
    job: "▣",
    people: "♙",
    pipeline: "◇",
    calendar: "□",
    check: "✓",
    spark: "✦",
    doc: "▤",
    flow: "⌘",
    chart: "▥",
    gear: "⚙",
    search: "⌕",
    plus: "+",
    bell: "○"
  };
  return <span className="icon" aria-hidden="true">{glyphs[name] ?? "•"}</span>;
}
