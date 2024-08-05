import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { THUMBSUP } from '@services/utils/Images';

export function Footer() {
  return (
    <div className="relative m-10 mb-0 grid grid-cols-12 grid-rows-3 flex-col">
      <Card className="col-span-12 row-span-2 mb-4 grid w-full grid-cols-7 items-center justify-between py-4">
        <a
          href="https://linkedin.com/in/leonardo-araujo-sarmento"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1"
        >
          <CardContent className="col-span-3 flex flex-col items-center gap-1 p-0">
            <Linkedin />
            <CardDescription>LinkedIn</CardDescription>
          </CardContent>
        </a>
        <a
          href="https://instagram.com/leonardo.a.sarmento"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 col-start-3"
        >
          <CardContent className="col-span-3 flex flex-col items-center gap-1 p-0">
            <Instagram />
            <CardDescription>Instagram</CardDescription>
          </CardContent>
        </a>
        <a
          href="mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 col-start-5"
        >
          <CardContent className="col-span-3 flex flex-col items-center gap-1 p-0">
            <Mail />
            <CardDescription>Email</CardDescription>
          </CardContent>
        </a>
        <a
          href="https://github.com/LeonardoSarmento"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 col-start-7"
        >
          <CardContent className="col-span-3 flex flex-col items-center gap-1 p-0">
            <Github />
            <CardDescription>Github</CardDescription>
          </CardContent>
        </a>
      </Card>
      <div className="col-span-12 row-span-1 my-2 flex w-full items-center justify-center gap-3">
        <CardTitle>Feito por Leonardo Araujo Sarmento</CardTitle>
        <img src={THUMBSUP} />
      </div>
    </div>
  );
}
