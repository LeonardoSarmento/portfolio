import { TLoginTabsContent, TTermsofService } from "@services/types/constants/login";

export const TABSLOGINCONTENT: TLoginTabsContent[] = [
  {
    title: 'Entrar',
    value: 'login',
    header: { description: 'Escreva seu nome e senha abaixo', title: 'Acesse sua conta' },
  },
  {
    title: 'Criar',
    value: 'create-account',
    header: {
      description: 'Faça sua conta para poder utilizar todas funcionalidades incriveis desse site portfolio',
      title: 'Crie sua conta',
    },
  },
];



export const TERMSOFSERVICECONTENT: TTermsofService = {
  start: 'Clicando em acessar, você concorda com todos os',
  terms: 'Termos de serviço',
  middle: 'e',
  policy: 'Políticas de Compras e Privacidades',
  end: '.',
};


