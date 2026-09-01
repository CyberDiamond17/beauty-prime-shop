import { useState, type FormEvent } from "react";
import { Lock, CheckCircle2, X } from "lucide-react";
import { formatPrice } from "./types";

type Props = {
  open: boolean;
  total: number;
  onClose: () => void;
  onSuccess: () => void;
};

export function CheckoutDialog({ open, total, onClose, onSuccess }: Props) {
  const [status, setStatus] = useState<"form" | "processing" | "done">("form");

  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    window.setTimeout(() => {
      setStatus("done");
      onSuccess();
    }, 1400);
  };

  const close = () => {
    setStatus("form");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/40 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="w-full max-w-md rounded-t-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)] sm:rounded-2xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="eyebrow">Secure checkout</p>
            <h3 className="truncate text-2xl">Pay {formatPrice(total)}</h3>
          </div>
          <button
            onClick={close}
            aria-label="Close checkout"
            className="shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "done" ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-sage-deep" />
            <p className="mt-4 text-lg">Payment confirmed</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A demo receipt has been sent to your inbox.
            </p>
            <button
              onClick={close}
              className="mt-6 w-full rounded-full bg-charcoal px-6 py-3 text-sm tracking-wide text-background"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Email" placeholder="you@example.com" type="email" />
            <Field label="Card number" placeholder="4242 4242 4242 4242" inputMode="numeric" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" placeholder="12 / 28" />
              <Field label="CVC" placeholder="123" inputMode="numeric" />
            </div>
            <Field label="Name on card" placeholder="Ada Bloom" />
            <button
              type="submit"
              disabled={status === "processing"}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-sage-deep px-6 py-3.5 text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <Lock className="h-4 w-4" />
              {status === "processing" ? "Processing…" : `Pay ${formatPrice(total)}`}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Mock Stripe form — no real card is charged.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        required
        {...rest}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-sage"
      />
    </label>
  );
}
