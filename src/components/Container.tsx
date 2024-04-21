import { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid h-dvh max-w-full grid-cols-12 grid-rows-12 gap-4 px-16">{children}</div>;
};

export default Container;
