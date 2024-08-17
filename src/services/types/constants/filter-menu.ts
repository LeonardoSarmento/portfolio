export type TFilterMenuContent = {
  createButton: { title: string };
  search: { placeholder: string; buttonText: string };
  filter: {
    title: string;
    theme: { title: string; description: string };
    quantity: { title: string; description: string; placeholder: string };
    buttons: { filterTitle: string; clearTitle: string };
  };
  noContent: {
    image: { src: string; alt: string };
    content: { text: string; author: string };
    button: { description: string; title: string };
  };
  pagination: {
    back: string;
    foward: string;
  };
};
