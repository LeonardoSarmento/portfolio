import { FAPES_LOGO, IEL_LOGO, UCL_LOGO, XP_LOGO } from '@services/utils/Images';
import { TECH_STACK } from './tech-stack';
import { TExperienceContent, TExperienceStack, TTabsContent } from '@services/types/constants/experience';
import { useTranslation } from 'react-i18next';

export const EXPERIENCESTACK: () => TExperienceStack[] = () => {
  const { t } = useTranslation();
  return [
    {
      ...t('experienceStack', { ns: 'experience', returnObjects: true })[0],
      stack: TECH_STACK.frontend,
    },
    {
      ...t('experienceStack', { ns: 'experience', returnObjects: true })[1],
      stack: TECH_STACK.mobile,
    },
    {
      ...t('experienceStack', { ns: 'experience', returnObjects: true })[2],
      stack: TECH_STACK.backend,
    },
    {
      ...t('experienceStack', { ns: 'experience', returnObjects: true })[3],
      stack: TECH_STACK.softskill,
    },
  ];
};

export const TABSEDUCATIONAL: () => TTabsContent[] = () => {
  const { t } = useTranslation();
  return [
    {
      ...t('tabsEducational', { ns: 'experience', returnObjects: true })[0],
      header: {
        ...t('tabsEducational', { ns: 'experience', returnObjects: true })[0].header,
        avatar: {
          ...t('tabsEducational', { ns: 'experience', returnObjects: true })[0].header.avatar,
          src: XP_LOGO,
        },
      },
      tools: {
        ...t('tabsEducational', { ns: 'experience', returnObjects: true })[0].tools,
        content: TECH_STACK.education[0],
      },
    },
    {
      ...t('tabsEducational', { ns: 'experience', returnObjects: true })[1],
      header: {
        ...t('tabsEducational', { ns: 'experience', returnObjects: true })[1].header,
        avatar: {
          ...t('tabsEducational', { ns: 'experience', returnObjects: true })[1].header.avatar,
          src: UCL_LOGO,
        },
      },
      tools: {
        ...t('tabsEducational', { ns: 'experience', returnObjects: true })[1].tools,
        content: TECH_STACK.education[1],
      },
    },
  ];
};

export const TABSPROFESSIONAL: () => TTabsContent[] = () => {
  const { t } = useTranslation();
  return [
    {
      ...t('tabsProfessional', { ns: 'experience', returnObjects: true })[0],
      header: {
        ...t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].header,
        avatar: {
          ...t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].header.avatar,
          src: IEL_LOGO,
        },
      },
      tools: {
        ...t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].tools,
        content: TECH_STACK.profissional[0],
      },
    },
    {
      ...t('tabsProfessional', { ns: 'experience', returnObjects: true })[1],
      header: {
        ...t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].header,
        avatar: {
          ...t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].header.avatar,
          src: FAPES_LOGO,
        },
      },
      tools: {
        ...t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].tools,
        content: TECH_STACK.profissional[1],
      },
    },
  ];
};

export const EXPERIENCECONTENT: () => TExperienceContent = () => {
  const { t } = useTranslation();
  return {
    experience: {
      ...t('experienceContent.experience', { ns: 'experience', returnObjects: true }),
      stack: EXPERIENCESTACK(),
    },
    education: {
      ...t('experienceContent.education', { ns: 'experience', returnObjects: true }),
      stack: TABSEDUCATIONAL(),
    },
    professional: {
      ...t('experienceContent.professional', { ns: 'experience', returnObjects: true }),
      stack: TABSPROFESSIONAL(),
    },
  };
};
