import resources from '@src/resources';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'ns1';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['pt-BR', 'en'],
    debug: true,
    ns: ['ns1', 'ns2'],
    resources: resources,
    defaultNS,
  });
