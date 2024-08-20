import { TLoginTabsContent, TTermsofService } from '@services/types/constants/login';
import { useTranslation } from 'react-i18next';

export const TABSLOGINCONTENT: () => TLoginTabsContent[] = () => {
  const { t } = useTranslation();
  return t('tabsLogin', { ns: 'login', returnObjects: true });
};

export const TERMSOFSERVICECONTENT: () => TTermsofService = () => {
  const { t } = useTranslation();
  return t('termsOfService', { ns: 'login', returnObjects: true });
};
