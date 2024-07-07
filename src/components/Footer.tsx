import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
export const THUMBSUP = new URL('/public/assets/thumbs-up.svg', import.meta.url).href;

export function Footer() {
  return (
    <div className="relative m-10 mb-0 grid grid-cols-12 grid-rows-3 flex-col">
      <Card className="col-span-12 row-span-2 mb-4 grid w-full grid-cols-7 items-center justify-between py-4">
        <Link
          to="https://linkedin.com/in/leonardo-araujo-sarmento"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1"
        >
          <CardContent className="col-span-3 flex flex-col items-center gap-1 p-0">
            <Linkedin />
            <CardDescription>LinkedIn</CardDescription>
          </CardContent>
        </Link>
        <Link
          to="https://instagram.com/leonardo.a.sarmento"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 col-start-3"
        >
          <CardContent className="col-span-3 flex flex-col items-center gap-1 p-0">
            <Instagram />
            <CardDescription>Instagram</CardDescription>
          </CardContent>
        </Link>
        <Link
          to="mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 col-start-5"
        >
          <CardContent className="col-span-3 flex flex-col items-center gap-1 p-0">
            <Mail />
            <CardDescription>Email</CardDescription>
          </CardContent>
        </Link>
        <Link to="https://github.com/LeonardoSarmento" target="_blank" rel="noopener noreferrer" className="col-span-1 col-start-7">
          <CardContent className="col-span-3 flex flex-col items-center gap-1 p-0">
            <Github />
            <CardDescription>Github</CardDescription>
          </CardContent>
        </Link>
      </Card>
      <div className="col-span-12 row-span-1 my-2 flex w-full items-center justify-center gap-3">
        <CardTitle>Feito por Leonardo Araujo Sarmento</CardTitle>
        <img src={THUMBSUP} />
      </div>
    </div>
  );
}
