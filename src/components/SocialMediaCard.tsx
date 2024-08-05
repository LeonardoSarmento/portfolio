import { TSocialMediaCard } from '@services/types/SocialMediaCard';

export default function SocialMediaCard({ item }: { item: TSocialMediaCard }) {
  return (
    <div className="relative z-20 h-full w-full space-y-4 overflow-hidden rounded-2xl border-2 border-muted-foreground bg-transparent p-4 transition-all">
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <p className="relative z-20 text-center text-xl font-bold transition-all">{item.name}</p>

        <div className="group/icon flex flex-col items-center justify-center gap-2">
          <figure className="rounded-full bg-primary-foreground p-3 transition-all group-hover/icon:scale-110 group-hover/icon:bg-primary dark:bg-secondary">
            <item.icon className="text-secondary-foreground group-hover/icon:text-secondary" />
          </figure>
        </div>
      </a>
    </div>
  );
}
