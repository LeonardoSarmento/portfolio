import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  SiAxios,
  SiBluetooth,
  SiExpo,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiRedux,
  SiSqlite,
  SiTypescript,
  SiZod,
} from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';

export const Route = createFileRoute('/experience')({
  component: Experience,
});

type TIconTecBtn = {
  children: React.ReactNode;
  path: string;
  className?: string;
};
function IconTecButton({ children, path, className }: TIconTecBtn) {
  return (
    <Button variant="ghost" className={cn('col-span-3 flex w-full gap-2', className)} asChild>
      <Link to={path} params={false} search={false} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </Button>
  );
}

function Experience() {
  return (
    <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
      <div className="col-span-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Experiências</CardTitle>
            <CardDescription>
              Ao longo de minha jornada, passei por várias áreas de conhecimentos e acumulei algumas experiências
              profissionais que levo diariamente, no pessoal e profissional.
            </CardDescription>
            <CardDescription>
              Atualmente trabalhando com desenvolvimento de software no{' '}
              <strong>ISTEO - Instituto SENAI de Tecnologia em Eficiência Operacional</strong>. Ativamente desenvolvendo
              aplicações web e mobile junto a clientes de divesas áreas e localidades.
            </CardDescription>
            <CardDescription>Possuo experiências nas seguintes Stacks e suas tecnologias:</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="mt-5 grid w-full grid-cols-12 justify-items-center gap-2 py-0">
            <CardTitle className="col-span-12">Frontend</CardTitle>
            <CardDescription className="col-span-12">
              Aplicações web feitas com gerenciamento de estados globais, formulários com validação e integração com
              REST APIs.
            </CardDescription>
            <CardContent className="col-span-12 grid grid-cols-12 gap-2">
              <IconTecButton path="https://www.typescriptlang.org/">
                <SiTypescript size={20} />
                Typescript
              </IconTecButton>
              <IconTecButton path="https://react.dev/">
                <SiReact size={20} />
                React
              </IconTecButton>
              <IconTecButton path="https://tanstack.com/query/latest/docs/framework/react/overview">
                <SiReactquery size={20} />
                Tanstack Query
              </IconTecButton>
              <IconTecButton path="https://tanstack.com/router/latest/docs/framework/react/overview">
                <SiReactquery size={20} />
                Tanstack Router
              </IconTecButton>
              <IconTecButton path="https://www.react-hook-form.com/">
                <SiReacthookform size={20} />
                React Hook Form
              </IconTecButton>
              <IconTecButton path="https://zod.dev/">
                <SiZod size={20} />
                Zod
              </IconTecButton>
              <IconTecButton path="https://axios-http.com/docs/intro">
                <SiAxios size={20} />
                Axios
              </IconTecButton>
              <IconTecButton path="https://redux-toolkit.js.org/">
                <SiRedux size={20} />
                Redux Toolkit
              </IconTecButton>
            </CardContent>
          </CardContent>
          <Separator />
          <CardContent className="mt-5 grid w-full grid-cols-12 justify-items-center gap-2 py-0">
            <CardTitle className="col-span-12">Mobile</CardTitle>
            <CardDescription className="col-span-12">
              Aplicações mobile que utilizam a conectividade bluetooth para coleta de dados. Sempre com mentalidade
              Offline-first para gerantia de persistência de dados.
            </CardDescription>
            <CardContent className="col-span-12 grid grid-cols-12 gap-2">
              <IconTecButton className="col-span-4" path="https://docs.expo.dev/">
                <SiExpo size={20} />
                Expo
              </IconTecButton>
              <IconTecButton className="col-span-4" path="https://reactnative.dev/">
                <SiReact size={20} />
                React Native
              </IconTecButton>
              <IconTecButton className="col-span-4" path="https://github.com/dotintent/react-native-ble-plx">
                <SiBluetooth size={15} />
                react-native-ble-plx
              </IconTecButton>
            </CardContent>
          </CardContent>
          <Separator />
          <CardContent className="mt-5 grid w-full grid-cols-12 justify-items-center gap-2 py-0">
            <CardTitle className="col-span-12">Backend</CardTitle>
            <CardDescription className="col-span-12">
              Banco de dados e ORM utilizados para persistência de dados da aplicação mobile no celular do usuário.
            </CardDescription>
            <CardContent className="col-span-12 grid grid-cols-12 gap-2">
              <IconTecButton className="col-span-6" path="https://www.sqlite.org/">
                <SiSqlite size={20} />
                SQLite
              </IconTecButton>
              <IconTecButton className="col-span-6" path="https://typeorm.io/">
                <VscJson size={20} />
                TypeORM
              </IconTecButton>
            </CardContent>
          </CardContent>
          <Separator />
          <CardContent className="mt-5 grid w-full grid-cols-12 justify-items-center gap-2 py-0">
            <CardTitle className="col-span-12">SoftSkills</CardTitle>
            <CardDescription className="col-span-12">
              Ao longo dos projetos tive a oportunidade desenvolver minha comunição, empatia, liderança, trabalho em equipe
            </CardDescription>
            <CardContent className="col-span-12 grid grid-cols-12 gap-2">
              <IconTecButton className="col-span-6" path="https://www.sqlite.org/">
                <SiSqlite size={20} />
                Metodologia Ágil 
              </IconTecButton>
              <IconTecButton className="col-span-6" path="https://typeorm.io/">
                <VscJson size={20} />
                TypeORM
              </IconTecButton>
            </CardContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
