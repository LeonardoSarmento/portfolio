import { TIntroductionContent } from '@services/types/constants/introduction';
import { LEO_BARZINHO } from '@services/utils/Images';

export const INTRODUCTIONCONTENT: TIntroductionContent = {
  header: { initial: 'Olá, bem vindo ao mundo de', punchline: 'Leonardo.' },
  image: { src: LEO_BARZINHO, alt: 'Leonardo tomando cerveja e fazendo brinde' },
  introduction: {
    h1: (
      <>
        Tudo começou no fatídico dia 07 de fevereiro de 1996, uma quarta-feira, em Vitória - ES. <br /> Eu, um bebê,
        estava fadado a pagar contas no futuro. Portanto, agora que estou velho, apresento a vocês o meu portfólio.
      </>
    ),
    code: 'Sintam-se em casa.',
  },
};
