import SocialMediaCard from '@components/SocialMediaCard';
import { TSocialMediaCard } from '@services/types/SocialMediaCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function HoverContainer({ items }: { items: TSocialMediaCard[] }) {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 justify-center self-center md:grid-cols-2 lg:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.name}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-muted"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <SocialMediaCard item={item} />
        </div>
      ))}
    </div>
  );
}
