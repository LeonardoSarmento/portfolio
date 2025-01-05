# Construindo uma Tabela de Dados Dinâmica com TypeScript, React Table e Zod

## Introdução

Construir uma tabela de dados dinâmica e flexível é um recurso fundamental para muitas aplicações modernas de front-end. Neste post, compartilharei como criei o componente **DataTable** usando **TypeScript**, **@tanstack/react-table**, **Zod** e **Tailwind CSS**. O **DataTable** oferece recursos robustos para filtragem, paginação e gerenciamento de estado, tornando-o uma ferramenta poderosa para construir aplicações escaláveis. Vou guiá-lo pelo processo de desenvolvimento, as tecnologias utilizadas e os principais recursos do **DataTable**.

## Meu Projeto: DataTable

O componente **DataTable** é uma solução altamente personalizável para gerenciar grandes conjuntos de dados em aplicações front-end. Ao integrar **@tanstack/react-table** para o gerenciamento da tabela, **react-query** para o gerenciamento de estado assíncrono, **Zod** para validação segura de tipos e **Tailwind CSS** para o estilo, o componente oferece uma solução avançada e dinâmica para exibir e interagir com dados. O componente inclui recursos como filtragem, paginação e exportação de dados para CSV.

## Bibliotecas Usadas no Projeto

Para construir o **DataTable**, utilizei as seguintes ferramentas e bibliotecas:

- **`TypeScript`**: Para garantir uma tipagem forte e confiabilidade no código.
- **`@tanstack/react-table`**: Para construir tabelas poderosas e flexíveis com suporte a filtragem, ordenação e paginação.
- **`@tanstack/react-query`**: Para lidar com o gerenciamento de estado assíncrono e requisições à API.
- **`Zod`**: Para validação declarativa e segura de tipos de dados.
- **`Tailwind CSS`**: Para criar designs limpos, responsivos e personalizáveis.
- **`@radix-ui`** & **`@shadcn/ui`**: Para componentes reutilizáveis de UI.

## Benefícios de Usar Essas Ferramentas

1. **Gerenciamento Completo de Dados**:  
   **@tanstack/react-table** facilita o gerenciamento e a manipulação de grandes conjuntos de dados com recursos avançados como ordenação, filtragem e paginação.
2. **Gerenciamento Eficiente de Estado**:  
   **react-query** simplifica o gerenciamento de estado assíncrono, mantendo os dados sincronizados entre o cliente e o servidor e minimizando a necessidade de código repetitivo.
3. **Validação Segura de Tipos**:  
   **Zod** garante que todas as validações de dados sejam seguras em termos de tipos, reduzindo erros em tempo de execução e melhorando a confiabilidade do código.
4. **UI Responsiva**:  
   **Tailwind CSS** permite um desenvolvimento rápido de UI com sua abordagem utilitária, garantindo que a tabela fique ótima em todos os tamanhos de tela.

## Principais Recursos do DataTable

- **Ações nas Linhas**: Realize ações como editar, excluir ou visualizar linhas individuais.
- **Filtragem**: Use parâmetros de pesquisa da URL para filtragem dinâmica dos dados da tabela.
- **Paginação**: Paginação integrada para gerenciar grandes conjuntos de dados.
- **Filtros Facetados**: Opções avançadas de filtragem com múltiplos critérios.
- **Exportação para CSV**: Exporte facilmente os dados exibidos na tabela para o formato CSV.
- **Colunas Personalizáveis**: Controle dinamicamente quais colunas são visíveis.
- **Entrada com Debounce**: Manipulação otimizada de campos de entrada para evitar chamadas desnecessárias à API.
- **Selecionar Todas as Linhas**: Ações em massa disponíveis para as linhas selecionadas.
- **Segurança de Tipos**: Manipulação de dados completamente segura em termos de tipos usando **Zod** e **TypeScript**.
- **Integração com Fake API**: Exemplo de integração de API para começar rapidamente com testes do mundo real.

## Como Usar o DataTable

Integrar o **DataTable** ao seu projeto é simples. Siga os passos abaixo para começar:

1. Clone o repositório:

   ```bash
   git clone https://github.com/LeonardoSarmento/data-table.git
   ```

2. Navegue até o diretório `src/feature/DataTable` e importe o componente:

```tsx
import { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import Header from '@components/header';

import DataTable from '@/feature/DataTable/common/data-table';
import { userColumns } from '@/feature/DataTable/users/user-columns';
import { DataTableToolbar } from '@/feature/DataTable/users/user-table-toolbar';
import { queryOptionsUserTable } from '@/feature/DataTable/users/queries/useTableUser';
import { UserFilters } from '@/feature/DataTable/users/types/User';

// Usando o componente DataTable na sua aplicação
export const Route = createFileRoute('/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: async ({ context: { queryClient }, deps: filters }) => {
    const userData = await queryClient.ensureQueryData(queryOptionsUserTable(filters));
    return {
      userData,
      crumb: 'User DataTable',
    };
  },
  validateSearch: () => ({}) as UserFilters,
  component: UsersComponent,
});

function UsersComponent() {
  const { userData } = Route.useLoaderData();
  const columns = useMemo(() => userColumns, []);

  return (
    <>
      <Header title="Usuários" description="Listagem de todos os usuários da plataforma" />
      <DataTable data={userData} columns={columns} toolbar={DataTableToolbar} routeId={Route.id} />
    </>
  );
}
```

Você pode explorar mais exemplos detalhados no repositório, incluindo como configurar filtros, paginação e busca de dados assíncronos.

## Conclusão

O componente **DataTable** foi projetado para simplificar o desenvolvimento de tabelas interativas e flexíveis. Ao aproveitar o poder do **react-query**, **Zod** e **@tanstack/react-table**, criei uma solução que lida com tarefas complexas de gerenciamento de dados com facilidade. A integração do **Tailwind CSS** garante que a tabela seja visualmente atraente e responsiva.

## Experimente Agora

Você pode ver o componente **DataTable** em ação através da [demo online](https://datatable.leosarmento.com).

O repositório do projeto está disponível no GitHub: [Repositório DataTable](https://github.com/LeonardoSarmento/data-table).

---

### Atenciosamente, Leo, e até a próxima!
