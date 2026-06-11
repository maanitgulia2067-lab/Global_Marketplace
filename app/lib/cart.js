const CART_STORAGE_KEY = "global-marketplace-cart";
const SHIPPING_STORAGE_KEY = "global-marketplace-shipping";

export function readCartItems() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function readShippingInfo() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem(SHIPPING_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveShippingInfo(shipping) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SHIPPING_STORAGE_KEY, JSON.stringify(shipping));
}

export function clearShippingInfo() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SHIPPING_STORAGE_KEY);
}

export function addCartItem(product) {
  if (typeof window === "undefined") return [];

  const productId = product._id ?? product.id;
  const cart = readCartItems();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: productId,
      title: product.title,
      price: product.price || 0,
      image: product.image || "",
      quantity: 1,
    });
  }

  saveCartItems(cart);
  return cart;
}

export function removeCartItem(productId) {
  if (typeof window === "undefined") return [];

  const cart = readCartItems().filter((item) => item.id !== productId);
  saveCartItems(cart);
  return cart;
}

export function updateCartItemQuantity(productId, quantity) {
  if (typeof window === "undefined") return [];

  const cart = readCartItems()
    .map((item) => {
      if (item.id !== productId) return item;
      return { ...item, quantity: Math.max(0, quantity) };
    })
    .filter((item) => item.quantity > 0);

  saveCartItems(cart);
  return cart;
}

export function clearCart() {
  saveCartItems([]);
  return [];
}

export function cartTotal(items) {
  return items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
}
