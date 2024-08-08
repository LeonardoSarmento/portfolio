import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { THUMBSUP } from '@services/utils/Images';
import { SocialMediaItems } from '@constants/index';

function SocialButton({ Icon, link, name }: { link: string; name: string; Icon: LucideIcon }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg transition-all duration-300 hover:scale-110 hover:bg-muted w-[250px]"
    >
      <CardContent className="flex flex-col items-center gap-1 p-0 py-2">
        <Icon />
        <CardDescription>{name}</CardDescription>
      </CardContent>
    </a>
  );
}

export function Footer() {
  return (
    <div className="relative m-10 mb-0 grid grid-cols-12 grid-rows-3">
      <Card className="flex col-span-12 justify-around row-span-2 items-center">
        {SocialMediaItems.map((item) => (
          <SocialButton key={item.name} name={item.name} link={item.link} Icon={item.icon} />
        ))}
      </Card>
      <div className="col-span-12 row-span-1 my-2 flex w-full items-center justify-center gap-3">
        <CardTitle>Feito por Leonardo Araujo Sarmento</CardTitle>
        <img src={THUMBSUP} />
      </div>
    </div>
  );
}
