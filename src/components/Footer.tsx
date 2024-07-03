import { Link } from '@tanstack/react-router';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
export const THUMBSUP = new URL('/public/assets/thumbs-up.svg', import.meta.url).href;

export function Footer() {
  return (
    <div className="relative m-16 mb-0 flex w-[95%] flex-col">
      <Card className="mb-4 flex w-full justify-between">
        <Link
          to="https://linkedin.com/in/leonardo-araujo-sarmento"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-3"
        >
          <CardHeader className="items-center">
            <Linkedin />
            <CardDescription>
              <CardDescription>LinkedIn</CardDescription>
            </CardDescription>
          </CardHeader>
        </Link>
        <Link
          to="https://instagram.com/leonardo.a.sarmento"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-3"
        >
          <CardHeader className="items-center">
            <Instagram />
            <CardDescription>Instagram</CardDescription>
          </CardHeader>
        </Link>
        <Link
          to="mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-3"
        >
          <CardHeader className="items-center">
            <Mail />
            <CardDescription>Email</CardDescription>
          </CardHeader>
        </Link>
        <Link to="https://github.com/LeonardoSarmento" target="_blank" rel="noopener noreferrer" className="col-span-3">
          <CardHeader className="items-center">
            <Github />
            <CardDescription>Github</CardDescription>
          </CardHeader>
        </Link>
      </Card>
      <CardTitle className="my-2 flex w-full justify-center items-center gap-3">
        <span>Feito por Leonardo Araujo Sarmento</span>
        <img src={THUMBSUP} />
      </CardTitle>
    </div>
  );
}
