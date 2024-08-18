import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { CONTACTCONTENT } from '@constants/contact-content';

function SocialButton({ Icon, link, name }: { link: string; name: string; Icon: LucideIcon }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[250px] rounded-lg transition-all duration-300 hover:scale-110 hover:bg-muted"
    >
      <CardContent className="flex flex-col items-center gap-1 p-0 py-2">
        <Icon />
        <CardDescription>{name}</CardDescription>
      </CardContent>
    </a>
  );
}

export function Footer() {
  const contactContent = CONTACTCONTENT();
  return (
    <div className="relative m-10 mb-0 grid grid-cols-12 grid-rows-3">
      <Card className="col-span-12 row-span-2 flex items-center justify-around">
        {contactContent.socialMedia.content.map((item) => (
          <SocialButton key={item.name} name={item.name} link={item.link} Icon={item.icon} />
        ))}
      </Card>
      <div className="col-span-12 row-span-1 my-2 flex w-full items-center justify-center gap-3">
        <CardTitle>{contactContent.content.title}</CardTitle>
        <img
          src={contactContent.content.src}
          alt={contactContent.content.alt}
          className="h-6 rounded-lg transition-all duration-300 hover:scale-150"
        />
      </div>
    </div>
  );
}
