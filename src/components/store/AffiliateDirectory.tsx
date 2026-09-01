import { useEffect, useState, type FormEvent } from "react";
import { Trash2, Plus, ExternalLink } from "lucide-react";

type LinkItem = { id: string; label: string; url: string };

const DEFAULTS: LinkItem[] = [
  { id: "a1", label: "Verdant Studio — Yoga Mats", url: "https://example.com/verdant" },
  { id: "a2", label: "Maison Lin — Spa Linens", url: "https://example.com/maison-lin" },
  { id: "a3", label: "Still Hours — Retreats", url: "https://example.com/still-hours" },
];

const KEY = "lumea-affiliates";

export function AffiliateDirectory() {
  const [links, setLinks] = useState<LinkItem[]>(DEFAULTS);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      try {
        setLinks(JSON.parse(saved) as LinkItem[]);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const persist = (next: LinkItem[]) => {
    setLinks(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !url.trim()) return;
    persist([...links, { id: crypto.randomUUID(), label: label.trim(), url: url.trim() }]);
    setLabel("");
    setUrl("");
  };

  return (
    <div>
      <p className="eyebrow">Partner directory</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="truncate">{l.label}</span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
            <button
              onClick={() => persist(links.filter((x) => x.id !== l.id))}
              aria-label={`Remove ${l.label}`}
              className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={add} className="mt-5 space-y-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Partner name"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-sage"
        />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            className="w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-sage"
          />
          <button
            type="submit"
            aria-label="Add partner link"
            className="shrink-0 rounded-md border border-border px-3 transition-colors hover:bg-secondary"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
