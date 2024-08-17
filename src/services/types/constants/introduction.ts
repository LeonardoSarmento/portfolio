export type TIntroductionContent = {
  header: { initial: string; punchline: string };
  image: { src: string; alt: string };
  introduction: { h1: React.ReactNode; code: string };
};
