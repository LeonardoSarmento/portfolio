import { TFilterMenuContent } from "@services/types/constants/filter-menu";
import { NOT_FOUND } from "@services/utils/Images";

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
    back: 'previous',
    foward: 'next',
  },
};
