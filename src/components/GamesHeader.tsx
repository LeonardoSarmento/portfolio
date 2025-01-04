import { GAMESCONTENT } from '@constants/games-content';
import { cn } from '@lib/utils';
import { motion } from 'framer-motion';

export function GamesHeader({
  routeId,
  className,
  ...props
}: { routeId: string } & React.HTMLAttributes<HTMLDivElement>) {
  const game = GAMESCONTENT();
  return (
    <div {...props} className={cn('flex flex-col items-center space-y-4', className)}>
      <motion.h1
        className="text-5xl font-extrabold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {game.content.items.find((item) => item.link === routeId)?.title}
      </motion.h1>
      <motion.h4
        className="scroll-m-20 text-xl font-semibold tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {game.content.items.find((item) => item.link === routeId)?.description}
      </motion.h4>
    </div>
  );
}
