import { ReloadIcon } from '@radix-ui/react-icons';
import { CardContent, CardTitle } from './ui/card';
import { MY_PHOTO } from '@services/utils/Images';

export function PendingComponent() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <CardContent className="flex flex-col items-center justify-center">
          <img className="h-80 rounded-md" src={MY_PHOTO} alt="Leonardo's photo" />
          <p className="mt-6 text-xs leading-tight text-muted-foreground">
            Front End Engineer | React | React Native | TypeScript | Agile
          </p>
          {/* <div className="mb-2 mt-4 text-lg font-medium">Leonardo</div> */}
          <CardTitle className="mb-2 mt-4">Leonardo</CardTitle>
        </CardContent>
        <CardTitle className="mt-2">Carregando...</CardTitle>
        <ReloadIcon className="mr-2 h-10 w-6 animate-spin" />
      </div>
    </div>
  );
}
