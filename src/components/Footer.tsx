import { Link } from '@tanstack/react-router';
import { Card, CardDescription, CardHeader } from './ui/card';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <Card className="grid h-fit grid-cols-12 mx-16 mb-6">
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
  );
}
