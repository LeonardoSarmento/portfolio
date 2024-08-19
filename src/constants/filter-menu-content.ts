import { TFilterMenuContent } from '@services/types/constants/filter-menu';
import { NOT_FOUND } from '@services/utils/Images';
import { useTranslation } from 'react-i18next';

export const FILTERMENUCONTENT: () => TFilterMenuContent = () => {
  const { t } = useTranslation();
  return {
    createButton: { title: t('createButton.title', { ns: 'filterMenu', returnObjects: true }) },
    search: {
      placeholder: t('search.placeholder', { ns: 'filterMenu', returnObjects: true }),
      buttonText: t('search.buttonText', { ns: 'filterMenu', returnObjects: true }),
    },
    filter: {
      title: t('filter.title', { ns: 'filterMenu', returnObjects: true }),
      theme: {
        title: t('filter.title', { ns: 'filterMenu', returnObjects: true }),
        description: t('filter.theme.description', { ns: 'filterMenu', returnObjects: true }),
      },
      quantity: {
        title: t('filter.quantity.title', { ns: 'filterMenu', returnObjects: true }),
        description: t('filter.quantity.description', { ns: 'filterMenu', returnObjects: true }),
        placeholder: t('filter.quantity.placeholder', { ns: 'filterMenu', returnObjects: true }),
      },
      buttons: {
        filterTitle: t('filter.buttons.filterTitle', { ns: 'filterMenu', returnObjects: true }),
        clearTitle: t('filter.buttons.clearTitle', { ns: 'filterMenu', returnObjects: true }),
      },
    },
    noContent: {
      image: { src: NOT_FOUND, alt: t('noContent.image.alt', { ns: 'filterMenu', returnObjects: true }) },
      content: {
        text: t('noContent.content.text', { ns: 'filterMenu', returnObjects: true }),
        author: t('noContent.content.author', { ns: 'filterMenu', returnObjects: true }),
      },
      button: {
        description: t('noContent.button.description', { ns: 'filterMenu', returnObjects: true }),
        title: t('noContent.button.title', { ns: 'filterMenu', returnObjects: true }),
      },
    },
    pagination: {
      back: t('pagination.back', { ns: 'filterMenu', returnObjects: true }),
      foward: t('pagination.foward', { ns: 'filterMenu', returnObjects: true }),
    },
  };
};
