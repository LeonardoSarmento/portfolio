import { DropdownMenuContent } from '@services/types/constants/dropdown-share';
import { useTranslation } from 'react-i18next';

export const DROPDOWNMENUCONTENT: () => DropdownMenuContent = () => {
  const { t } = useTranslation();
  return {
    title: t('title', { ns: 'dropdownShare' }),
    share: t('share', { ns: 'dropdownShare' }),
    edit: t('edit', { ns: 'dropdownShare' }),
    delete: t('delete', { ns: 'dropdownShare' }),
  };
};
