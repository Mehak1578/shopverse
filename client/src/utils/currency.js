// Utility to format numbers as INR for display
// Contract:
// - Input: number (assumed USD), will be converted to INR using rate 83
// - Output: string like "₹4,149" (no decimals, en-IN grouping)
// - Null/NaN safe: returns "₹0" for invalid input

const RATE = Number(import.meta?.env?.VITE_INR_RATE ?? 83);
const DISCOUNT = Number(import.meta?.env?.VITE_PRICE_DISCOUNT ?? 0);

export const formatINR = (value) => {
  const num = Number(value);
  if (!isFinite(num)) return '₹0';
  const effective = Math.max(0, 1 - (isFinite(DISCOUNT) ? DISCOUNT : 0));
  const inr = Math.round(num * (isFinite(RATE) ? RATE : 83) * effective);
  return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(inr)}`;
};
