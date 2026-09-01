import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShoppingBag, Instagram, Twitter, Youtube, Leaf } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import serumImg from "@/assets/serum.jpg";
import rollerImg from "@/assets/roller.jpg";
import mistImg from "@/assets/mist.jpg";

import { CartDrawer } from "@/components/store/CartDrawer";
import { CheckoutDialog } from "@/components/store/CheckoutDialog";
import { AffiliateDirectory } from "@/components/store/AffiliateDirectory";
import { formatPrice, type CartLine, type Product } from "@/components/store/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumea — Glow Rituals for Skin & Body" },
      {
        name: "description",
        content:
          "Premium fitness and beauty essentials: glow serum, massage roller and hydration mist. Clean formulas, fast checkout, free shipping over $75.",
      },
      { property: "og:title", content: "Lumea — Glow Rituals for Skin & Body" },
      {
        property: "og:description",
        content:
          "Shop best sellers from Lumea: organic glow serum, therapeutic massage roller and hydrating mist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const PRODUCTS: Product[] = [
  {
    id: "serum",
    name: "Organic Glow Serum",
    tagline: "Cold-pressed botanicals · 30ml",
    price: 6800,
    image: serumImg,
  },
  {
    id: "roller",
    name: "Therapeutic Massage Roller",
    tagline: "Beechwood & sage silicone",
    price: 5400,
    image: rollerImg,
  },
  {
    id: "mist",
    name: "Hydrating Hydration Mist",
    tagline: "Rose water & aloe · 100ml",
    price: 3900,
    image: mistImg,
  },
];

const NAV = [
  { label: "Shop", href: "#shop" },
  { label: "Ritual", href: "#ritual" },
  { label: "Partners", href: "#partners" },
];

function Landing() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const lines: CartLine[] = useMemo(
    () =>
      PRODUCTS.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id] as number })),
    [cart],
  );
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  const addToCart = (id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    setCartOpen(true);
  };

  const changeQty = (id: string, delta: number) =>
    setCart((c) => {
      const next = (c[id] ?? 0) + delta;
      const copy = { ...c };
      if (next <= 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-2">
            <Leaf className="h-4 w-4 shrink-0 text-sage-deep" />
            <span className="truncate font-display text-xl tracking-[0.24em] uppercase">
              Lumea
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-6">
            <nav className="hidden items-center gap-7 md:flex">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-xs tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative rounded-full border border-border p-2.5 transition-colors hover:bg-secondary"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-sage-deep text-[10px] text-primary-foreground tabular-nums">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="surface-spa">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="eyebrow">Fitness · Beauty · Ritual</p>
              <h1 className="mt-5 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl">
                Skin that glows.
                <br />
                A body that feels it.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Clean, clinically balanced formulas and recovery tools made for the quiet
                minutes between training and rest — so wellness shows on the surface.
              </p>
              <div className="mt-9">
                <a
                  href="#shop"
                  className="inline-flex items-center justify-center rounded-full bg-charcoal px-9 py-4 text-sm tracking-[0.16em] uppercase text-background transition-opacity hover:opacity-90"
                >
                  Shop Best Sellers
                </a>
              </div>
              <p className="mt-5 text-xs tracking-[0.14em] uppercase text-muted-foreground">
                Free shipping over $75 · 60-day glow guarantee
              </p>
            </div>
            <div className="relative">
              <img
                src={heroImg}
                alt="Eucalyptus, linen towels and a lit candle on a warm nude spa surface"
                width={1280}
                height={1600}
                fetchPriority="high"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
              />
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="shop" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="max-w-xl">
            <p className="eyebrow">Best sellers</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">The essential three</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="mt-5 flex flex-1 flex-col">
                  <h3 className="text-2xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-nude px-3 py-1 text-sm tabular-nums text-charcoal">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(p.id)}
                    className="mt-5 w-full rounded-full border border-charcoal px-6 py-3 text-xs tracking-[0.16em] uppercase transition-colors hover:bg-charcoal hover:text-background"
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ritual */}
        <section id="ritual" className="border-y border-border surface-spa">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-3 sm:px-8">
            {[
              ["01 Cleanse", "Reset the skin barrier after every session."],
              ["02 Restore", "Roll out tension where the day settles."],
              ["03 Glow", "Seal in hydration and let it show."],
            ].map(([title, copy]) => (
              <div key={title}>
                <h3 className="text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="partners" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <span className="font-display text-xl tracking-[0.24em] uppercase">Lumea</span>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Considered fitness and beauty essentials, made in small batches.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Youtube, label: "YouTube" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {["Privacy Policy", "Terms of Service", "Shipping & Returns", "Contact"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <AffiliateDirectory />
          </div>

          <p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lumea. Demo storefront — payments are simulated.
          </p>
        </footer>
      </main>

      <CartDrawer
        open={cartOpen}
        lines={lines}
        total={total}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onCheckout={() => setCheckoutOpen(true)}
      />
      <CheckoutDialog
        open={checkoutOpen}
        total={total}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={() => {
          setCart({});
          setCartOpen(false);
        }}
      />
    </div>
  );
}
