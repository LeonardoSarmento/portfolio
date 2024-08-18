import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enUSN1 from './en-US/n1.json';
import enUSN2 from './en-US/n2.json';
import ptBrN1 from './pt-BR/n1.json';
import ptBrN2 from './pt-BR/n2.json';
import ContactPtBR from './pt-BR/contact.json';
import ContactEnUS from './en-US/contact.json';

export const defaultNS = 'n1';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['pt-BR', 'en-US'],
    debug: true,
    defaultNS,
    resources: {
      'pt-BR': {
        n1: ptBrN1,
        n2: ptBrN2,
        contact: ContactPtBR,
      },
      'en-US': {
        n1: enUSN1,
        n2: enUSN2,
        contact: ContactEnUS,
      },
    },
  });

export default i18next;
