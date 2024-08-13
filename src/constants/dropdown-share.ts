type DropdownMenuContent = {
  title: string;
  share: string;
  edit: string;
  delete: string;
  toast: {
    error: { title: string; description: string };
  };
};

export const DROPDOWNMENUCONTENT: DropdownMenuContent = {
  title: 'Postagem',
  share: 'Compartilhar',
  edit: 'Editar',
  delete: 'Deletar',
  toast: { error: { title: 'Sem deletar projeto por aqui malandro', description: 'Deixa isso pra uma outra hora' } },
};
