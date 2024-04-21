import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { ptBR } from 'date-fns/locale/pt-BR';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDate(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
}

export function normalizeDateWithHour(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
}

export function normalizeDateByLongDate(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
}
