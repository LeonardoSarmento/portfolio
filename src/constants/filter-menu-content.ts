import { NOT_FOUND } from "@services/utils/Images";

type TFilterMenuContent = {
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

export const FILTERMENUCONTENT: TFilterMenuContent = {
  createButton: { title: 'Criar' },
  search: { placeholder: 'Procure por um título', buttonText: 'Procurar' },
  filter: {
    title: 'Filtros',
    theme: { title: 'Temas', description: 'Selecione quais temas você quer ler sobre.' },
    quantity: {
      title: 'Quantidade',
      description: 'Selecione a quantidade de você deseja visualizar.',
      placeholder: 'Qntd',
    },
    buttons: { filterTitle: 'Filtrar', clearTitle: 'Limpar' },
  },
  noContent: {
    image: { src: NOT_FOUND, alt: 'Thumb Up Sad Cat' },
    content: {
      text: 'Não encontrei nenhuma postagem com esse tema. falhei, fui mlk blz? :(',
      author: 'Leonardo Sarmento',
    },
    button: { description: 'Retire os filtros e tente novamente: ', title: 'Tentar novamente' },
  },
  pagination: {
    back: 'string',
    foward: 'string',
  },
};
