type TShareComponent = {
  button: { title: string };
  card: { title: string; description: string; label: string; buttonAlt: string };
};
const SHARECOMPONENT: TShareComponent = {
  button: { title: 'Compartilhar' },
  card: {
    title: 'Compartilhe com seus inimigos :)',
    description: 'Qualquer um com esse link em ctrl+c ctrl+v ficará mais forte que nunca.',
    label: 'Link',
    buttonAlt: 'Copiar',
  },
};
export type TByIdComponent = {
  shareComponent: TShareComponent;
  breadcrumb: { title: string };
  buttons: { edit: string; goBack: string };
};
export const PROJECTBYIDCONTENT: TByIdComponent = {
  shareComponent: SHARECOMPONENT,
  breadcrumb: { title: 'projects' },
  buttons: { edit: 'Editar', goBack: 'Voltar' },
};

export const POSTBYIDCONTENT: TByIdComponent = {
  shareComponent: SHARECOMPONENT,
  breadcrumb: { title: 'posts' },
  buttons: { edit: 'Editar', goBack: 'Voltar' },
};
