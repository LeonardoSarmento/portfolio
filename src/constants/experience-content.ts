import { FAPES_LOGO, IEL_LOGO, UCL_LOGO } from '@services/utils/Images';
import { TECH_STACK } from './tech-stack';
import { TExperienceContent, TExperienceStack, TTabsContent } from '@services/types/constants/experience';
import { useTranslation } from 'react-i18next';

export const EXPERIENCESTACK: () => TExperienceStack[] = () => {
  const { t } = useTranslation();
  return [
    {
      title: t('experienceStack', { ns: 'experience', returnObjects: true })[0].title,
      description: t('experienceStack', { ns: 'experience', returnObjects: true })[0].description,
      stack: TECH_STACK.frontend,
    },
    {
      title: t('experienceStack', { ns: 'experience', returnObjects: true })[1].title,
      description: t('experienceStack', { ns: 'experience', returnObjects: true })[1].description,
      stack: TECH_STACK.mobile,
    },
    {
      title: t('experienceStack', { ns: 'experience', returnObjects: true })[2].title,
      description: t('experienceStack', { ns: 'experience', returnObjects: true })[2].description,
      stack: TECH_STACK.backend,
    },
    {
      title: t('experienceStack', { ns: 'experience', returnObjects: true })[3].title,
      description: t('experienceStack', { ns: 'experience', returnObjects: true })[3].description,
      stack: TECH_STACK.softskill,
    },
  ];
};

export const TABSEDUCATIONAL: () => TTabsContent[] = () => {
  const { t } = useTranslation();
  return [
    {
      value: t('tabsEducational', { ns: 'experience', returnObjects: true })[0].value,
      title: t('tabsEducational', { ns: 'experience', returnObjects: true })[0].title,
      header: {
        avatar: {
          src: IEL_LOGO,
          avatarFallback: t('tabsEducational', { ns: 'experience', returnObjects: true })[0].header.avatar
            .avatarFallback,
        },
        title: t('tabsEducational', { ns: 'experience', returnObjects: true })[0].header.title,
        description: t('tabsEducational', { ns: 'experience', returnObjects: true })[0].header.description,
        content: {
          description: [
            t('tabsEducational', { ns: 'experience', returnObjects: true })[0].header.content.description[0],
            t('tabsEducational', { ns: 'experience', returnObjects: true })[0].header.content.description[1],
          ],
        },
      },
      learnings: {
        title: t('tabsEducational', { ns: 'experience', returnObjects: true })[0].learnings.title,
        content: {
          description: [
            t('tabsEducational', { ns: 'experience', returnObjects: true })[0].learnings.content.description[0],
          ],
        },
      },
      tools: {
        title: t('tabsEducational', { ns: 'experience', returnObjects: true })[0].tools.title,
        content: TECH_STACK.education[0],
      },
    },
    {
      value: t('tabsEducational', { ns: 'experience', returnObjects: true })[1].value,
      title: t('tabsEducational', { ns: 'experience', returnObjects: true })[1].title,
      header: {
        avatar: {
          src: UCL_LOGO,
          avatarFallback: t('tabsEducational', { ns: 'experience', returnObjects: true })[1].header.avatar
            .avatarFallback,
        },
        title: t('tabsEducational', { ns: 'experience', returnObjects: true })[1].header.title,
        description: t('tabsEducational', { ns: 'experience', returnObjects: true })[1].header.description,
        content: {
          description: [
            t('tabsEducational', { ns: 'experience', returnObjects: true })[1].header.content.description[0],
            t('tabsEducational', { ns: 'experience', returnObjects: true })[1].header.content.description[1],
            t('tabsEducational', { ns: 'experience', returnObjects: true })[1].header.content.description[2],
          ],
        },
      },
      learnings: {
        title: t('tabsEducational', { ns: 'experience', returnObjects: true })[1].learnings.title,
        content: {
          description: [
            t('tabsEducational', { ns: 'experience', returnObjects: true })[1].learnings.content.description[0],
            t('tabsEducational', { ns: 'experience', returnObjects: true })[1].learnings.content.description[1],
            t('tabsEducational', { ns: 'experience', returnObjects: true })[1].learnings.content.description[2],
          ],
        },
      },
      tools: {
        title: t('tabsEducational', { ns: 'experience', returnObjects: true })[1].tools.title,
        content: TECH_STACK.education[1],
      },
    },
  ];
};

export const TABSPROFESSIONAL: () => TTabsContent[] = () => {
  const { t } = useTranslation();
  return [
    {
      value: t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].value,
      title: t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].title,
      header: {
        avatar: {
          src: IEL_LOGO,
          avatarFallback: t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].header.avatar
            .avatarFallback,
        },
        title: t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].header.title,
        description: t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].header.description,
        content: {
          description: [
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].header.content.description[0],
          ],
        },
      },
      learnings: {
        title: t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].learnings.title,
        content: {
          description: [
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].learnings.content.description[0],
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].learnings.content.description[1],
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].learnings.content.description[2],
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].learnings.content.description[3],
          ],
        },
      },
      tools: {
        title: t('tabsProfessional', { ns: 'experience', returnObjects: true })[0].tools.title,
        content: TECH_STACK.profissional[0],
      },
    },
    {
      value: t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].value,
      title: t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].title,
      header: {
        avatar: {
          src: FAPES_LOGO,
          avatarFallback: t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].header.avatar
            .avatarFallback,
        },
        title: t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].header.title,
        description: t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].header.description,
        content: {
          description: [
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].header.content.description[0],
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].header.content.description[1],
          ],
        },
      },
      learnings: {
        title: t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].learnings.title,
        content: {
          description: [
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].learnings.content.description[0],
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].learnings.content.description[1],
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].learnings.content.description[2],
            t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].learnings.content.description[3],
          ],
        },
      },
      tools: {
        title: t('tabsProfessional', { ns: 'experience', returnObjects: true })[1].tools.title,
        content: TECH_STACK.profissional[1],
      },
    },
  ];
};

export const EXPERIENCECONTENT: () => TExperienceContent = () => {
  const { t } = useTranslation();
  return {
    experience: {
      title: t('experienceContent.experience.title', { ns: 'experience' }),
      description: [
        t('experienceContent.experience.description', { ns: 'experience', returnObjects: true })[0],
        t('experienceContent.experience.description', { ns: 'experience', returnObjects: true })[1],
        t('experienceContent.experience.description', { ns: 'experience', returnObjects: true })[2],
      ],
      stack: EXPERIENCESTACK(),
    },
    education: {
      title: t('experienceContent.education.title', { ns: 'experience' }),
      description: [t('experienceContent.education.description', { ns: 'experience', returnObjects: true })[0]],
      stack: TABSEDUCATIONAL(),
    },
    professional: {
      title: t('experienceContent.professional.title', { ns: 'experience' }),
      description: [t('experienceContent.professional.description', { ns: 'experience', returnObjects: true })[0],],
      stack: TABSPROFESSIONAL(),
    },
  };
};
