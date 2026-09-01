export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
};

export type CartLine = Product & { qty: number };

export const formatPrice = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
