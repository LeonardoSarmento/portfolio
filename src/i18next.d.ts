import { defaultNS } from '../i18n/config';
import resources_pt_BR from './i18n/pt-BR';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources_pt_BR;
  }
}