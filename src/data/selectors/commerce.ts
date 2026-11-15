import { orderEmailTemplate } from "@/data/fixtures/email-template";
import { sampleCart, sampleCheckoutDraft, sampleOrderMeta } from "@/data/fixtures/sample-state";
import { getShippingMethods } from "@/data/selectors/content";
import { getProducts, getVariantsForProduct } from "@/data/selectors/products";
import type { Cart, CheckoutDraft, MinorUnits, Order, OrderEmailTemplate, Product, ProductVariant, ShippingMethod } from "@/types";

export type CartLine = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  unitPrice: MinorUnits;
  lineTotal: MinorUnits;
};

export function getSampleCart(): Cart {
  return sampleCart;
}

export function getSampleCheckoutDraft(): CheckoutDraft {
  return sampleCheckoutDraft;
}

/** Resolves items against fixtures; items whose product or variant no longer exists are skipped. */
export function getCartLines(cart: Cart): CartLine[] {
  const products = getProducts();
  return cart.items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    const variant = getVariantsForProduct(item.productId).find((v) => v.id === item.variantId);
    if (!product || !variant) return [];
    const unitPrice = product.basePrice + (variant.priceDelta ?? 0);
    return [{ product, variant, quantity: item.quantity, unitPrice, lineTotal: unitPrice * item.quantity }];
  });
}

export function getCartSubtotal(lines: CartLine[]): MinorUnits {
  return lines.reduce((sum, l) => sum + l.lineTotal, 0);
}

export function getSelectedShipping(draft: CheckoutDraft): ShippingMethod | undefined {
  return getShippingMethods().find((m) => m.id === draft.shippingMethodId);
}

export function getSampleOrder(): Order {
  const lines = getCartLines(sampleCart);
  const subtotal = getCartSubtotal(lines);
  const shipping = getSelectedShipping(sampleCheckoutDraft)?.price ?? 0;
  return {
    ...sampleOrderMeta,
    lines: lines.map((l) => ({
      productName: l.product.name,
      variantLabel: l.variant.label === "Standard" ? "" : l.variant.label,
      quantity: l.quantity,
      unitPrice: l.unitPrice,
    })),
    subtotal,
    shipping,
    total: subtotal + shipping,
    currency: "USD",
  };
}

export function getOrderEmailTemplate(): OrderEmailTemplate {
  return orderEmailTemplate;
}
