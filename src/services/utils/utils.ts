import { copyToClipboard } from "@components/CodeCopyButton";
import { toast } from "sonner";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomNumberWithDecimals(min = 0, max = 20000): number {
  // Ensure min is less than or equal to max
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value.');
  }

  // Generate random float between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale the random decimal to the desired range (min to max)
  const scaled = randomDecimal * (max - min);

  // Multiply by 100 to get two decimal places, then round
  const withDecimals = Math.round(scaled * 100) / 100;

  // Add the minimum value to get the final random number within range
  return withDecimals + min;
}

export function CopyToClipboardRoute(url: string) {
  try {
    copyToClipboard(url);
    toast.success('Link salvo no ctrl+v patrão', { description: `Pediu tá feito, ${url} tá na mão` });
  } catch (error) {
    toast.error('Não foi possível copiar o link', { description: 'Sinto mt falhei fui mlk :(' });
  }
}
