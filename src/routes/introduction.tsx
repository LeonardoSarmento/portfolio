import { Avatar, AvatarImage } from '@components/ui/avatar';
import { HeroHighlight, Highlight } from '@components/ui/hero-highlight';
import { INTRODUCTIONCONTENT } from '@constants/introduction-content';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/introduction')({
  component: Introduction,
});

function Introduction() {
  // return <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">Hello from Introduction!</div>;
  const introductionContent = INTRODUCTIONCONTENT();
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
        {introductionContent.header.initial} {''}
        <Highlight className="px-4 text-black dark:text-white">{introductionContent.header.punchline}</Highlight>
      </motion.h1>
      <div className="flex mx-auto flex-col justify-center gap-16 xl:space-x-20 p-12 xl:flex-row xl:justify-evenly xl:gap-10">
        {/* <Avatar className="h-[380px] w-[380px] shadow-[0_0px_50px_rgba(27,_113,_18,_0.7)]"> */}
        <Avatar className="h-64 w-64 mx-auto shadow-[0_0px_50px_rgba(209,_171,_32,_0.7)] md:h-72 md:w-72 xl:h-96 xl:w-96">
          <AvatarImage src={introductionContent.image.src} alt={introductionContent.image.alt} />
        </Avatar>
        <div className="flex flex-col mx-auto justify-center gap-2 lg:w-[700px]">
          <h2 className="scroll-m-20 whitespace-break-spaces pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {introductionContent.introduction.h1}
          </h2>
          <code className="relative w-fit rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-3xl font-semibold">
            {introductionContent.introduction.code}
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
