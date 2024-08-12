import { Avatar, AvatarImage } from '@components/ui/avatar';
import { HeroHighlight, Highlight } from '@components/ui/hero-highlight';
import { LEO_BARZINHO } from '@services/utils/Images';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/introduction')({
  component: Introduction,
});

function Introduction() {
  // return <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">Hello from Introduction!</div>;
  return (
    <HeroHighlight className="space-y-10">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="mx-auto mt-5 max-w-4xl px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug "
      >
        Olá, bem vindo ao mundo de {''}
        <Highlight className="px-4 text-black dark:text-white">Leonardo.</Highlight>
      </motion.h1>
      <div className="flex w-screen justify-evenly gap-10 p-12">
        <div>
          {/* <Avatar className="h-[380px] w-[380px] shadow-[0_0px_50px_rgba(27,_113,_18,_0.7)]"> */}
          <Avatar className="h-[380px] w-[380px] shadow-[0_0px_50px_rgba(209,_171,_32,_0.7)]">
            <AvatarImage src={LEO_BARZINHO} />
          </Avatar>
        </div>
        <div className="flex w-[700px] flex-col justify-center gap-2">
          <h2 className=" scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Tudo começou no fatídico dia 07 de fevereiro de 1996, uma quarta-feira, em Vitória - ES. <br /> Eu, um
            bebê, estava fadado a pagar contas no futuro. Portanto, agora que estou velho, apresento a vocês o meu
            portfólio.
          </h2>
          <code className="relative w-fit rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-3xl font-semibold">
            Sintam-se em casa.
          </code>
        </div>
      </div>
      {/* <div className="flex w-screen justify-evenly gap-10 p-12">
        <div className="flex flex-col justify-center gap-2 w-2/4">
          <p className="text-xl leading-7 [&:not(:first-child)]:mt-6">
            #Divulgue aqui
          </p>
          <p className="text-xl leading-7 [&:not(:first-child)]:mt-6">
            Tudo começo no fatídico dia de 07 de fevereiro de 1996 uma quarta-feira, em Vitória - ES. Eu, um bebê,
            estava fadado a pagar contas no futuro. Portanto agora que estou velho, apresento a vocês o meu portifolio.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-2 w-1/3">
          <p className="text-xl leading-7 [&:not(:first-child)]:mt-6">
            Tudo começo no fatídico dia de 07 de fevereiro de 1996 uma quarta-feira, em Vitória - ES. <br /> Eu, um
            bebê, estava fadado a pagar contas no futuro. Portanto agora que estou velho, apresento a vocês o meu
            portifolio.
          </p>
        </div>
      </div> */}
    </HeroHighlight>
  );
}
