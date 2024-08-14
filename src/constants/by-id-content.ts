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

type TInputType = { label: string; placeholder: string };
export type THeaderFormContent = {
  title: TInputType;
  description: TInputType;
  tags: TInputType & { notfound: string };
  buttons: { save: string; goBack: string; destructive: string };
};
type toastMessages = {
  error: toastMessageContent;
  sucess: toastMessageContent;
  delete: toastMessageContent;
  noAuth: toastMessageContent;
};
type toastMessageContent = { title: string; description: string };
export type THeaderCardContent = {
  title: string;
  thumbnail: { title: string; dropMessage: string };
  form: THeaderFormContent;
  toast: toastMessages;
};
export const TOASTMESSAGESCONTENT: toastMessages = {
  delete: { description: 'Deixa isso pra uma outra hora', title: 'Sem deletar coisa por aqui malandro' },
  sucess: {
    description: 'Não tem como criar um post ainda mas quem sabe um dia...',
    title: 'Ehh mentira!! Te enganei kkkk',
  },
  error: { description: 'Vou passar pro estágiario consertar...', title: 'Vish!! parece que deu ruim' },
  noAuth: {
    description: 'Você não deveria ter acesso aqui... tô de olho em você ein',
    title: 'Você não está autenticado cara :(',
  },
};
export const HEADERCARDPOSTCONTENT: THeaderCardContent = {
  title: 'Criar novo post',
  thumbnail: { title: 'Thumbnail', dropMessage: 'Solte seu arquivo ou clique aqui' },
  form: {
    title: { label: 'Título', placeholder: 'O nome do seu post' },
    description: { label: 'Descrição', placeholder: 'Faça uma descrição da sua postagem' },
    tags: { label: 'Tags', placeholder: 'Selecione alguma tag...', notfound: 'Não foi encontrado esse tema.' },
    buttons: { goBack: 'Voltar', destructive: 'Deletar', save: 'Salvar' },
  },
  toast: TOASTMESSAGESCONTENT,
};
export const HEADERCARDCREATEPOSTCONTENT: THeaderCardContent = {
  ...HEADERCARDPOSTCONTENT,
  form: {
    ...HEADERCARDPOSTCONTENT.form,
    buttons: { goBack: 'Voltar', destructive: 'Apagar tudo', save: 'Criar' },
  },
};

export const HEADERCARDPROJECTCONTENT: THeaderCardContent = {
  title: 'Criar novo projeto',
  thumbnail: { title: 'Thumbnail', dropMessage: 'Solte seu arquivo ou clique aqui' },
  form: {
    title: { label: 'Título', placeholder: 'O nome do seu projeto' },
    description: { label: 'Descrição', placeholder: 'Faça uma descrição do seu projeto' },
    tags: { label: 'Tags', placeholder: 'Selecione alguma tag...', notfound: 'Não foi encontrado esse tema.' },
    buttons: { goBack: 'Voltar', destructive: 'Deletar', save: 'Salvar' },
  },
  toast: TOASTMESSAGESCONTENT,
};

export const HEADERCARDCREATEPROJECTCONTENT: THeaderCardContent = {
  ...HEADERCARDPROJECTCONTENT,
  form: {
    ...HEADERCARDPROJECTCONTENT.form,
    buttons: { goBack: 'Voltar', destructive: 'Apagar tudo', save: 'Criar' },
  },
};

export type TManageMarkdownContent = {
  content: { label: string; placeholder: string; description: string };
  preview: { title: string };
  button: { text: string };
};

export const MANAGEMARKDOWNCONTENT: TManageMarkdownContent = {
  content: {
    label: 'Conteúdo',
    placeholder: 'Diga oq vc tem guardado no coração.',
    description: 'Se você não mentiu aqui então bora postar mlk',
  },
  preview: { title: 'Preview' },
  button: { text: 'Salvar' },
};

export const MANAGEMARKDOWNCREATECONTENT: TManageMarkdownContent = {
  ...MANAGEMARKDOWNCONTENT,
  button: { text: 'Criar' },
};
