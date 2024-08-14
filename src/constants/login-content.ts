export type TLoginTabsContent = {
  title: string;
  value: string;
  header: TLoginTabContent;
};

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

type TTermsofService = {
  start: string;
  middle: string;
  end: string;
  terms: string;
  policy: string;
};

export const TERMSOFSERVICECONTENT: TTermsofService = {
  start: 'Clicando em acessar, você concorda com todos os',
  terms: 'Termos de serviço',
  middle: 'e',
  policy: 'Políticas de Compras e Privacidades',
  end: '.',
};

type TLoginTabContent = {
  title: string;
  description: string;
};
