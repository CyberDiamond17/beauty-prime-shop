import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { formatPrice, type CartLine } from "./types";

type Props = {
  open: boolean;
  lines: CartLine[];
  total: number;
  onClose: () => void;
  onQty: (id: string, delta: number) => void;
  onCheckout: () => void;
};

export function CartDrawer({ open, lines, total, onClose, onQty, onCheckout }: Props) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-charcoal/35 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-card shadow-[var(--shadow-lift)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-5">
          <div className="min-w-0">
            <p className="eyebrow">Your ritual</p>
            <h2 className="truncate text-2xl">Cart</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">Your cart is quiet for now.</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map((l) => (
                <li key={l.id} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm">{l.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(l.price)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => onQty(l.id, -1)}
                        aria-label={`Decrease ${l.name}`}
                        className="rounded-full border border-border p-1.5 transition-colors hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center text-sm tabular-nums">{l.qty}</span>
                      <button
                        onClick={() => onQty(l.id, 1)}
                        aria-label={`Increase ${l.name}`}
                        className="rounded-full border border-border p-1.5 transition-colors hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border px-5 py-5">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Total</span>
            <span className="text-2xl tabular-nums">{formatPrice(total)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={lines.length === 0}
            className="mt-4 w-full rounded-full bg-charcoal px-6 py-3.5 text-sm tracking-wide text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Proceed to Checkout
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Free carbon-neutral shipping over $75
          </p>
        </footer>
      </aside>
    </>
  );
}
