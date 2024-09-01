import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { ptBR, enUS } from 'date-fns/locale';
import i18n from '../i18n/config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDate(date: Date) {
  return format(date, 'PPPP', { locale: i18n.language === 'pt-BR' ? ptBR : enUS });
}

export function normalizeDateWithHour(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
}

export function normalizeDateByLongDate(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
}
