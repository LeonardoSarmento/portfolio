import { HeroHighlight, Highlight } from '@components/ui/hero-highlight';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/introduction')({
  component: Introduction,
});

function Introduction() {
  // return <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">Hello from Introduction!</div>;
  return (
    <HeroHighlight>
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
        className="mx-auto max-w-4xl mt-5 px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug "
      >
        Olá, bem vindo ao mundo de {''}
        <Highlight className="text-black px-4 dark:text-white">Leonardo.</Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
