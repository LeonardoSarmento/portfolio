import { DropdownMenuContent } from '@services/types/constants/dropdown-share';
import { useTranslation } from 'react-i18next';

export const DROPDOWNMENUCONTENT: () => DropdownMenuContent = () => {
  const { t } = useTranslation();
  return t('dropdown', { ns: 'dropdownShare', returnObjects: true });
};
