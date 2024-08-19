import { TLoginTabsContent, TTermsofService } from '@services/types/constants/login';
import { useTranslation } from 'react-i18next';

export const TABSLOGINCONTENT: () => TLoginTabsContent[] = () => {
  const { t } = useTranslation();
  return [
    {
      title: t('tabsLogin', { ns: 'login', returnObjects: true })[0].title,
      value: 'login',
      header: {
        description: t('tabsLogin', { ns: 'login', returnObjects: true })[0].header.description,
        title: t('tabsLogin', { ns: 'login', returnObjects: true })[0].header.title,
      },
    },
    {
      title: t('tabsLogin', { ns: 'login', returnObjects: true })[1].title,
      value: 'create-account',
      header: {
        description: t('tabsLogin', { ns: 'login', returnObjects: true })[1].header.description,
        title: t('tabsLogin', { ns: 'login', returnObjects: true })[1].header.title,
      },
    },
  ];
};

export const TERMSOFSERVICECONTENT: () => TTermsofService = () => {
  const { t } = useTranslation();
  return {
    start: t('termsOfService.start', { ns: 'login' }),
    terms: t('termsOfService.terms', { ns: 'login' }),
    middle: t('termsOfService.middle', { ns: 'login' }),
    policy: t('termsOfService.policy', { ns: 'login' }),
    end: t('termsOfService.end', { ns: 'login' }),
  };
};
