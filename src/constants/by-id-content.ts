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
  return {
    button: { title: t('shareContent.button.title', { ns: 'byIdContent' }) },
    card: {
      title: t('shareContent.card.title', { ns: 'byIdContent' }),
      description: t('shareContent.card.description', { ns: 'byIdContent' }),
      label: t('shareContent.card.label', { ns: 'byIdContent' }),
      buttonAlt: t('shareContent.card.buttonAlt', { ns: 'byIdContent' }),
    },
  };
};
export const PROJECTBYIDCONTENT: () => TByIdComponent = () => {
  const { t } = useTranslation();
  return {
    shareComponent: SHARECOMPONENT(),
    breadcrumb: { title: t('projectById.breadcrumb.title', { ns: 'byIdContent' }) },
    buttons: {
      edit: t('projectById.buttons.edit', { ns: 'byIdContent', returnObjects: true }),
      goBack: t('projectById.buttons.goBack', { ns: 'byIdContent', returnObjects: true }),
    },
  };
};
export const POSTBYIDCONTENT: () => TByIdComponent = () => {
  const { t } = useTranslation();
  return {
    shareComponent: SHARECOMPONENT(),
    breadcrumb: { title: t('postById.breadcrumb.title', { ns: 'byIdContent' }) },
    buttons: {
      edit: t('postById.buttons.edit', { ns: 'byIdContent', returnObjects: true }),
      goBack: t('postById.buttons.goBack', { ns: 'byIdContent', returnObjects: true }),
    },
  };
};
export const TOASTMESSAGESCONTENT: () => toastMessages = () => {
  const { t } = useTranslation();
  return {
    delete: {
      description: t('toastMessage.delete.description', { ns: 'byIdContent', returnObjects: true }),
      title: t('toastMessage.delete.title', { ns: 'byIdContent', returnObjects: true }),
    },
    success: {
      description: t('toastMessage.success.description', { ns: 'byIdContent', returnObjects: true }),
      title: t('toastMessage.success.title', { ns: 'byIdContent', returnObjects: true }),
    },
    error: {
      description: t('toastMessage.error.description', { ns: 'byIdContent', returnObjects: true }),
      title: t('toastMessage.error.title', { ns: 'byIdContent', returnObjects: true }),
    },
    noAuth: {
      description: t('toastMessage.noAuth.description', { ns: 'byIdContent', returnObjects: true }),
      title: t('toastMessage.noAuth.title', { ns: 'byIdContent', returnObjects: true }),
    },
    share: {
      success: {
        description: t('toastMessage.share.success.description', { ns: 'byIdContent', returnObjects: true }),
        title: t('toastMessage.share.success.title', { ns: 'byIdContent', returnObjects: true }),
      },
      error: {
        description: t('toastMessage.share.error.description', { ns: 'byIdContent', returnObjects: true }),
        title: t('toastMessage.share.error.title', { ns: 'byIdContent', returnObjects: true }),
      },
    },
  };
};
export const HEADERCARDPOSTCONTENT: () => THeaderCardContent = () => {
  const { t } = useTranslation();
  return {
    title: t('headerCardPost.title', { ns: 'byIdContent' }),
    thumbnail: {
      title: t('headerCardPost.thumbnail.title', { ns: 'byIdContent', returnObjects: true }),
      dropMessage: t('headerCardPost.thumbnail.dropMessage', { ns: 'byIdContent', returnObjects: true }),
    },
    form: {
      title: {
        label: t('headerCardPost.form.title.label', { ns: 'byIdContent', returnObjects: true }),
        placeholder: t('headerCardPost.form.title.placeholder', { ns: 'byIdContent', returnObjects: true }),
      },
      description: {
        label: t('headerCardPost.form.description.label', { ns: 'byIdContent', returnObjects: true }),
        placeholder: t('headerCardPost.form.description.placeholder', { ns: 'byIdContent', returnObjects: true }),
      },
      tags: {
        label: t('headerCardPost.form.tags.label', { ns: 'byIdContent', returnObjects: true }),
        placeholder: t('headerCardPost.form.tags.placeholder', { ns: 'byIdContent', returnObjects: true }),
        notfound: t('headerCardPost.form.tags.notfound', { ns: 'byIdContent', returnObjects: true }),
      },
      buttons: {
        goBack: t('headerCardPost.form.buttons.goBack', { ns: 'byIdContent', returnObjects: true }),
        destructive: t('headerCardPost.form.buttons.destructive', { ns: 'byIdContent', returnObjects: true }),
        save: t('headerCardPost.form.buttons.save', { ns: 'byIdContent', returnObjects: true }),
      },
    },
    toast: TOASTMESSAGESCONTENT(),
  };
};
export const HEADERCARDCREATEPOSTCONTENT: () => THeaderCardContent = () => {
  const { t } = useTranslation();
  return {
    ...HEADERCARDPOSTCONTENT(),
    form: {
      ...HEADERCARDPOSTCONTENT().form,
      buttons: {
        goBack: t('headerCardCreate.form.buttons.goBack', { ns: 'byIdContent', returnObjects: true }),
        destructive: t('headerCardCreate.form.buttons.destructive', { ns: 'byIdContent', returnObjects: true }),
        save: t('headerCardCreate.form.buttons.save', { ns: 'byIdContent', returnObjects: true }),
      },
    },
  };
};
export const HEADERCARDPROJECTCONTENT: () => THeaderCardContent = () => {
  const { t } = useTranslation();
  return {
    title: t('headerCardProject.title', { ns: 'byIdContent' }),
    thumbnail: {
      title: t('headerCardProject.thumbnail.title', { ns: 'byIdContent', returnObjects: true }),
      dropMessage: t('headerCardProject.thumbnail.dropMessage', { ns: 'byIdContent', returnObjects: true }),
    },
    form: {
      title: {
        label: t('headerCardProject.form.title.label', { ns: 'byIdContent', returnObjects: true }),
        placeholder: t('headerCardProject.form.title.placeholder', { ns: 'byIdContent', returnObjects: true }),
      },
      description: {
        label: t('headerCardProject.form.description.label', { ns: 'byIdContent', returnObjects: true }),
        placeholder: t('headerCardProject.form.description.placeholder', { ns: 'byIdContent', returnObjects: true }),
      },
      tags: {
        label: t('headerCardProject.form.tags.label', { ns: 'byIdContent', returnObjects: true }),
        placeholder: t('headerCardProject.form.tags.placeholder', { ns: 'byIdContent', returnObjects: true }),
        notfound: t('headerCardProject.form.tags.notfound', { ns: 'byIdContent', returnObjects: true }),
      },
      buttons: {
        goBack: t('headerCardProject.form.buttons.goBack', { ns: 'byIdContent', returnObjects: true }),
        destructive: t('headerCardProject.form.buttons.destructive', { ns: 'byIdContent', returnObjects: true }),
        save: t('headerCardProject.form.buttons.save', { ns: 'byIdContent', returnObjects: true }),
      },
    },
    toast: TOASTMESSAGESCONTENT(),
  };
};
export const HEADERCARDCREATEPROJECTCONTENT: () => THeaderCardContent = () => {
  const { t } = useTranslation();
  return {
    ...HEADERCARDPROJECTCONTENT(),
    form: {
      ...HEADERCARDPROJECTCONTENT().form,
      buttons: {
        goBack: t('headerCardCreate.form.buttons.goBack', { ns: 'byIdContent', returnObjects: true }),
        destructive: t('headerCardCreate.form.buttons.destructive', { ns: 'byIdContent', returnObjects: true }),
        save: t('headerCardCreate.form.buttons.save', { ns: 'byIdContent', returnObjects: true }),
      },
    },
  };
};
export const MANAGEMARKDOWNCONTENT: () => TManageMarkdownContent = () => {
  const { t } = useTranslation();
  return {
    content: {
      label: t('manageMarkdown.content.label', { ns: 'byIdContent', returnObjects: true }),
      placeholder: t('manageMarkdown.content.placeholder', { ns: 'byIdContent', returnObjects: true }),
      description: t('manageMarkdown.content.description', { ns: 'byIdContent', returnObjects: true }),
    },
    preview: { title: t('manageMarkdown.preview.title', { ns: 'byIdContent', returnObjects: true }) },
    button: { text: t('manageMarkdown.button.text', { ns: 'byIdContent', returnObjects: true }) },
  };
};
export const MANAGEMARKDOWNCREATECONTENT: () => TManageMarkdownContent = () => {
  const { t } = useTranslation();
  return {
    ...MANAGEMARKDOWNCONTENT(),
    button: { text: t('manageMarkdown.button.text', { ns: 'byIdContent', returnObjects: true }) },
  };
};
