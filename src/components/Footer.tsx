import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
export const THUMBSUP = new URL('/public/assets/thumbs-up.svg', import.meta.url).href;

export function Footer() {
  return (
    <div className="relative m-16 mb-0 flex w-[95%] flex-col">
      <Card className="mb-4 flex w-full items-center justify-between">
        <Link to="https://linkedin.com/in/leonardo-araujo-sarmento" target="_blank" rel="noopener noreferrer">
          <CardContent className="col-span-3 items-center p-6 flex flex-col gap-1">
            <Linkedin />
            <CardDescription>LinkedIn</CardDescription>
          </CardContent>
        </Link>
        <Link to="https://instagram.com/leonardo.a.sarmento" target="_blank" rel="noopener noreferrer">
          <CardContent className="col-span-3 items-center p-6 flex flex-col gap-1">
            <Instagram />
            <CardDescription>Instagram</CardDescription>
          </CardContent>
        </Link>
        <Link
          to="mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardContent className="col-span-3 items-center p-6 flex flex-col gap-1">
            <Mail />
            <CardDescription>Email</CardDescription>
          </CardContent>
        </Link>
        <Link to="https://github.com/LeonardoSarmento" target="_blank" rel="noopener noreferrer">
          <CardContent className="col-span-3 items-center p-6 flex flex-col gap-1">
            <Github />
            <CardDescription>Github</CardDescription>
          </CardContent>
        </Link>
      </Card>
      <div className="my-2 flex w-full items-center justify-center gap-3">
        <CardTitle>Feito por Leonardo Araujo Sarmento</CardTitle>
        <img src={THUMBSUP} />
      </div>
    </div>
  );
}
