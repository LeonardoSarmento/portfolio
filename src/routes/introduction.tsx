import { Avatar, AvatarImage } from '@components/ui/avatar';
import { HeroHighlight, Highlight } from '@components/ui/hero-highlight';
import { INTRODUCTIONCONTENT } from '@constants/introduction-content';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/introduction')({
  component: Introduction,
});

function Introduction() {
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
        className="mx-auto mt-5 max-w-4xl px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug"
      >
        {introductionContent.header.initial} {''}
        <Highlight className="px-4 text-black dark:text-white">{introductionContent.header.punchline}</Highlight>
      </motion.h1>
      <div className="flex flex-col justify-center gap-16 p-12 xl:flex-row xl:justify-evenly xl:gap-10 2xl:mx-40">
        {/* <Avatar className="h-[380px] w-[380px] shadow-[0_0px_50px_rgba(27,_113,_18,_0.7)]"> */}
        <Avatar className="mx-auto h-64 w-64 shadow-[0_0px_50px_rgba(209,_171,_32,_0.7)] md:h-72 md:w-72 xl:h-96 xl:w-96">
          <AvatarImage src={introductionContent.image.src} alt={introductionContent.image.alt} />
        </Avatar>
        <div className="mx-auto flex flex-col justify-center gap-2 xl:w-3/4 2xl:w-1/2">
          <h2 className="scroll-m-20 whitespace-break-spaces pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {introductionContent.introduction.h1}
          </h2>
          <code className="relative w-fit rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-3xl font-semibold">
            {introductionContent.introduction.code}
          </code>
        </div>
      </div>
      <div className="flex flex-col justify-evenly gap-10 p-12 2xl:mx-40">
        <h2 className="mx-auto w-fit scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {introductionContent.aboutme} &#128521;
        </h2>
        <div className="flex flex-wrap 2xl:mx-20">
          <div className="flex flex-wrap items-center justify-center xl:flex-nowrap">
            <div className="flex flex-col p-4 xl:w-3/4">
              <p className="text-xl leading-7 [&:not(:first-child)]:mt-6">{introductionContent.description[0]}</p>
              <p className="text-xl leading-7 [&:not(:first-child)]:mt-6">{introductionContent.description[1]}</p>
            </div>
            <div className="flex justify-center p-4 xl:w-1/4">
              <img
                className="h-80 w-64 rounded-md"
                src="https://utfs.io/f/7UcJCClPcgLK0Au4mmNC5B20jYShq8QzmTFkfeoMtDgZirnL"
                alt="fotinha dando joinha com zé"
              />
            </div>
          </div>
          <div className="flex flex-wrap-reverse items-center justify-center xl:flex-nowrap">
            <div className="flex justify-center p-4 xl:w-1/4">
              <img
                className="h-80 w-64 rounded-md"
                src="https://utfs.io/f/7UcJCClPcgLK8yv0OaJi3Yqj6fR1l0crt2npeVkxsTUN45am"
                alt="fotinha no Inspire 2024 comendo e sorrindo"
              />
            </div>
            <div className="flex flex-col p-4 xl:w-3/4">
              <p className="text-xl leading-7 [&:not(:first-child)]:mt-6">{introductionContent.description[2]}</p>
              <p className="text-xl leading-7 [&:not(:first-child)]:mt-6">{introductionContent.description[3]}</p>
            </div>
          </div>
          {/* <div className="flex justify-center w-full">
            <img
              className="h-80 w-64 rounded-md"
              src="https://utfs.io/f/7UcJCClPcgLK0PvWY8NC5B20jYShq8QzmTFkfeoMtDgZirnL"
              alt="fotinha no meu aniversário"
            />
          </div> */}
        </div>
      </div>
    </HeroHighlight>
  );
}
