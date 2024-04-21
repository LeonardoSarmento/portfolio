import { MY_PHOTO } from '@components/NavigationMenu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';
import { Link, createFileRoute } from '@tanstack/react-router';
import Autoplay from 'embla-carousel-autoplay';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import React from 'react';
const gif = new URL('/public/assets/Animation - 1707702469299.gif', import.meta.url).href;

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="grid h-full max-h-screen max-w-full grid-cols-12 grid-rows-12 gap-4 px-16">
      <Card className="col-span-6 row-span-6 grid grid-cols-2 px-4 pt-8">
        <CardContent className="flex flex-col items-center justify-center">
          <img className="h-80 rounded-md" src={MY_PHOTO} alt="Leonardo's photo" />
          <p className="mt-6 text-xs leading-tight text-muted-foreground">
            Front End Engineer | React | React Native | TypeScript | Agile
          </p>
          {/* <div className="mb-2 mt-4 text-lg font-medium">Leonardo</div> */}
          <CardTitle className="mb-2 mt-4">Leonardo</CardTitle>
        </CardContent>
        <CardContent className="flex flex-col items-center justify-center">
          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            As a dedicated Virtual Systems Fellow at the SENAI Institute of Technology — Operational Efficiency, I have
            been actively developing web applications for various clients.
          </p>

          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            My expertise lies in using ReactJs, React Native, and TypeScript for frontend development and integrating
            REST APIs with Node.Js on the backend, always ensuring agility in my work. In my pursuit of specialization,
            I have embarked on postgraduate studies in Software Architecture and Solutions, with a keen focus on
            understanding the comprehensive Cloud environment.
          </p>

          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            Currently, I am honing my skills in React Native through a project targeted at industry professionals in
            occupational health and safety. This project involves capturing data via Bluetooth connection with various
            sensors, storing it in the application with an offline-first approach, and displaying the data through
            real-time graphs. The technologies I’m using include Expo, React Native, TypeScript, React-native-ble-plx,
            Redux-toolkit, React Query with Axios, React-hook-form, and Zod.
          </p>

          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            In addition, I have contributed to a health sector project, where we developed a management system for
            companies to analyze their employees’ mental health data. This involved creating a Progressive Web
            Application (PWA) for employees to manage their appointments, available clinics for consultations, and
            mental health forms. A separate website was also developed for the company and clinics to manage all their
            employees’ data, appointments, and forms.
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-3 row-span-6 flex flex-col items-center justify-center px-4">
        <CardContent>
          <CardHeader>
            <CardTitle>XP Educação</CardTitle>
            <CardDescription>
              <p>Postgraduate Degree, Software Architecture and Solutions</p>
              <p>Nov 2023 - Aug 2024</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs leading-tight text-muted-foreground">
              Specialized in software project lifecycle, focusing on project requirements, structuring, and management.
              Gained expertise in Software Architecture and Cloud-based Solutions Architecture.
            </p>
          </CardContent>
          <CardHeader>
            <CardTitle>Faculdade UCL</CardTitle>
            <CardDescription>
              <p>Bachelor of Engineering - BE, Engenharia Civil</p>
              <p>2014 - 2021</p>
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
      <Card className="col-span-3 col-start-10 h-fit px-4">
        <CardHeader>
          <CardTitle>Virtual Systems Fellow</CardTitle>
          <CardDescription>
            <p>Sistema Findes · Full-time</p>
            <p>Feb 2023 - Present · 1 yr 2 mos</p>
            <p>Vitória, Espírito Santo, Brazil · On-site</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs leading-tight text-muted-foreground">
            Working on software development projects, focusing on the frontend.
          </p>
          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            • Collaborated with a cross-functional team in an Agile environment to successfully deliver multiple
            software projects on time and within budget
          </p>
          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            • Participated in calls with 4 companies, helping the development of 4 innovative projects and securing
            R$300K plus in funding.
          </p>
          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            • Developing projects using React, React Native, TypeScript, Expo, React Query, Axios, Zod, React -
            hook-form, React-native-ble-plx, Redux Toolkit, REST API, BPMN and Agile Methodologies.
          </p>
        </CardContent>
        <CardHeader>
          <CardTitle>Laboratorist</CardTitle>
          <CardDescription>
            <p>LABMATERIAIS · Internship</p>
            <p>Feb 2021 - Jun 2021 · 5 mos</p>
            <p>Serra, Espírito Santo, Brazil · On-site</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs leading-tight text-muted-foreground">
            Development of activities related to all the stages of the concrete compressive strength test. Therefore,
            participation in the concreting of the client's site, carrying out the concrete slump test.
          </p>
          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            Demolding of specimens obtained during concreting at the client's site. Identification and storage of the
            specimens in the wet chamber.
          </p>
          <p className="mt-3 text-xs leading-tight text-muted-foreground">
            Maintenance of the molds used in concreting, concrete compressive strength test, disposal of broken
            specimens and creation of the test certificate for each invoice.
          </p>
        </CardContent>
      </Card>
      <div className=" col-span-9 row-span-3 row-start-7 mt-3 h-fit">
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <Card>
                  <CardContent className="flex h-96 items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Card className="col-span-3 row-span-2 row-start-9 mt-24 flex h-32 items-center justify-between">
        <Link to="https://linkedin.com/in/leonardo-araujo-sarmento" target="_blank" rel="noopener noreferrer">
          <CardHeader className="items-center">
            <Linkedin />
            <CardDescription>
              <CardDescription>LinkedIn</CardDescription>
            </CardDescription>
          </CardHeader>
        </Link>
        <Link to="https://instagram.com/leonardo.a.sarmento" target="_blank" rel="noopener noreferrer">
          <CardHeader className="items-center">
            <Instagram />
            <CardDescription>Instagram</CardDescription>
          </CardHeader>
        </Link>
        <Link
          to="mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardHeader className="items-center">
            <Mail />
            <CardDescription>Email</CardDescription>
          </CardHeader>
        </Link>
        <Link to="https://github.com/LeonardoSarmento" target="_blank" rel="noopener noreferrer">
          <CardHeader className="items-center">
            <Github />
            <CardDescription>Github</CardDescription>
          </CardHeader>
        </Link>
      </Card>
    </div>
  );
}
