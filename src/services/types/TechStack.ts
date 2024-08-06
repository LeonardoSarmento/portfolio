export type TechStackType = {
  backend?: TechType[];
  frontend?: TechType[];
  mobile?: TechType[];
  softskill?: TechType[];
  education?: TechType[][];
  profissional?: TechType[][];
};

export type TechType = {
  title: string;
  icon: JSX.Element;
  url: string;
};
