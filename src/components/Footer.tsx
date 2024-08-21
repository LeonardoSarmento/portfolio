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
    <div className="flex min-w-screen flex-col my-4 gap-4 px-8 xl:px-16">
      <Card className="flex py-2 items-center justify-around">
        {contactContent.socialMedia.content.map((item) => (
          <SocialButton key={item.name} name={item.name} link={item.link} Icon={item.icon} />
        ))}
      </Card>
      <div className="flex flex-wrap items-center gap-4 justify-center">
        <CardTitle className="text-center">{contactContent.content.title}</CardTitle>
        <img
          className="h-6 rounded-lg transition-all duration-300 hover:scale-150"
          src={contactContent.content.src}
          alt={contactContent.content.alt}
        />
      </div>
    </div>
  );
}
