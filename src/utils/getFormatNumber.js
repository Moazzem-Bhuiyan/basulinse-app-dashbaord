export default function getFormatNumber(price) {
  if (!price) return "0";

  // Convert to string and handle negative numbers
  const isNegative = price < 0;
  const strPrice = Math.abs(price).toString();

  // Add thousand separators
  let formatted = "";
  const len = strPrice.length;

  for (let i = 0; i < len; i++) {
    if (i > 0 && (len - i) % 3 === 0) {
      formatted += ",";
    }
    formatted += strPrice[i];
  }

  // Add negative sign if applicable
  return isNegative ? `-${formatted}` : formatted;
}
