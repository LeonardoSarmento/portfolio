import {
  TByIdComponent,
  THeaderCardContent,
  TManageMarkdownContent,
  toastMessages,
  TShareComponent,
} from '@services/types/constants/by-id';
import { useTranslation } from 'react-i18next';

const SHARECOMPONENT: () => TShareComponent = () => {
  const { t } = useTranslation();
  return t('shareContent', { ns: 'byIdContent', returnObjects: true });
};
export const PROJECTBYIDCONTENT: () => TByIdComponent = () => {
  const { t } = useTranslation();
  return {
    ...t('projectById', { ns: 'byIdContent', returnObjects: true }),
    shareComponent: SHARECOMPONENT(),
  };
};
export const POSTBYIDCONTENT: () => TByIdComponent = () => {
  const { t } = useTranslation();
  return {
    ...t('postById', { ns: 'byIdContent', returnObjects: true }),
    shareComponent: SHARECOMPONENT(),
  };
};
export const TOASTMESSAGESCONTENT: () => toastMessages = () => {
  const { t } = useTranslation();
  return t('toastMessage', { ns: 'byIdContent', returnObjects: true });
};
export const HEADERCARDPOSTCONTENT: () => THeaderCardContent = () => {
  const { t } = useTranslation();
  return {
    ...t('headerCardPost', { ns: 'byIdContent', returnObjects: true }),
    toast: TOASTMESSAGESCONTENT(),
  };
};
export const HEADERCARDCREATEPOSTCONTENT: () => THeaderCardContent = () => {
  const { t } = useTranslation();
  return {
    ...HEADERCARDPOSTCONTENT(),
    form: {
      ...HEADERCARDPOSTCONTENT().form,
      buttons: t('headerCardCreate.form.buttons', { ns: 'byIdContent', returnObjects: true }),
    },
  };
};
export const HEADERCARDPROJECTCONTENT: () => THeaderCardContent = () => {
  const { t } = useTranslation();
  return {
    ...t('headerCardProject', { ns: 'byIdContent', returnObjects: true }),
    toast: TOASTMESSAGESCONTENT(),
  };
};
export const HEADERCARDCREATEPROJECTCONTENT: () => THeaderCardContent = () => {
  const { t } = useTranslation();
  return {
    ...HEADERCARDPROJECTCONTENT(),
    form: {
      ...HEADERCARDPROJECTCONTENT().form,
      buttons: t('headerCardCreate.form.buttons', { ns: 'byIdContent', returnObjects: true }),
    },
  };
};
export const MANAGEMARKDOWNCONTENT: () => TManageMarkdownContent = () => {
  const { t } = useTranslation();
  return t('manageMarkdown', { ns: 'byIdContent', returnObjects: true });
};
export const MANAGEMARKDOWNCREATECONTENT: () => TManageMarkdownContent = () => {
  const { t } = useTranslation();
  return {
    ...MANAGEMARKDOWNCONTENT(),
    button: t('manageMarkdown.button', { ns: 'byIdContent', returnObjects: true }),
  };
};
