import { Button, ButtonProps } from '@components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import Flags from 'country-flag-icons/react/3x2';

type SelectLanguageBtn = ButtonProps & React.RefAttributes<HTMLButtonElement>;

export function SelectLanguage({ ...props }: SelectLanguageBtn) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props} variant="outline" size="icon">
          <Flag countryCode={getCountrCode(i18n.language)} className="w-6 rounded-sm" />
          {/* {i18n.language} */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="relative left-2 w-6 min-w-[3rem]">
        {i18n.options.supportedLngs
          ? i18n.options.supportedLngs.filter((lgn) => lgn !== 'cimode').map((option) => (
              <DropdownMenuItem onClick={() => changeLanguage(option)} className="gap-3">
                <Flag countryCode={getCountrCode(option)} className="w-8 rounded-sm" />
              </DropdownMenuItem>
            ))
          : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
function getCountrCode(countryName: string) {
  return countryName.slice(-2);
}
type FlagProps = {
  countryCode: string;
  className?: string;
};

const Flag = ({ countryCode, className }: FlagProps) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent className={className} />;
};
