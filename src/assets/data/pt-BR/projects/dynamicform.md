# Criando Formulários Dinâmicos com TypeScript, React Hook Form e Zod

## Introdução

Criar formulários dinâmicos e altamente configuráveis é uma habilidade essencial para desenvolvedores front-end modernos. Utilizando **TypeScript**, **react-hook-form**, **Zod**, e **Tailwind CSS**, criei o **DynamicForm**, um componente de formulário altamente flexível, com validação automática e tipagem forte. Neste post, vou mostrar o processo de desenvolvimento, as tecnologias utilizadas e os principais recursos do **DynamicForm**.

## Meu Projeto: DynamicForm

O **DynamicForm** é uma solução para criar formulários interativos e adaptáveis, cobrindo uma ampla gama de tipos de campo e regras de validação. Com a combinação de **TypeScript**, **react-hook-form**, e **Zod**, é possível criar formulários seguros, válidos e com um design limpo. Além disso, as integrações com máscaras de entrada e suporte a upload de arquivos tornam este componente ideal para qualquer aplicação.

## Bibliotecas Utilizadas no Projeto

Para desenvolver o **DynamicForm**, utilizei as seguintes ferramentas e bibliotecas:

- **`TypeScript`**: Para garantir tipagem forte e confiabilidade no código.
- **`react-hook-form`**: Para lidar com o gerenciamento de estado do formulário de forma eficiente.
- **`Zod`**: Para validação de dados de forma declarativa e tipada.
- **`Tailwind CSS`**: Para estilização rápida e responsiva com uma abordagem utilitária.
- **`react-dropzone`**: Para adicionar suporte a upload de arquivos.
- **`react-day-picker` e `date-fns`**: Para a manipulação de campos de data.

## Benefícios de Utilizar Essas Ferramentas

1. **Validação Completa**:  
   Com **Zod**, a validação é feita de forma clara e tipo-segura, evitando erros comuns de validação em tempo de execução.
2. **Gerenciamento de Estado de Formulário Eficiente**:  
   **react-hook-form** permite um gerenciamento de estado simples e eficiente, sem a sobrecarga de re-renderizações desnecessárias.
3. **UI Clean e Responsiva**:  
   **Tailwind CSS** facilita a criação de interfaces modernas e adaptáveis a diferentes dispositivos.
4. **Tipagem Segura e Intuitiva**:  
   **TypeScript** e **Zod** garantem que os dados do formulário sejam tratados corretamente, evitando bugs e erros no processo de desenvolvimento.

## Principais Funcionalidades do DynamicForm

- **Formulários Dinâmicos**: Suporte a vários tipos de campos, incluindo texto, seleção, data, checkboxes e uploads de arquivos.
- **Máscaras de Entrada**: Campos como CPF, CNPJ e telefones podem ser facilmente configurados com máscaras predefinidas.
- **Validação Integrada**: Validação de dados em tempo real com **Zod** e **react-hook-form**.
- **Design Responsivo**: Totalmente otimizado para dispositivos móveis e desktop.
- **Fácil Integração**: O componente pode ser facilmente importado e usado em qualquer projeto TypeScript.

## Como Usar o DynamicForm

Integrar o **DynamicForm** ao seu projeto é simples. Basta clonar o repositório e importar o componente no seu projeto TypeScript:

1. Clone o repositório:

   ```bash
   git clone https://github.com/LeonardoSarmento/dynamic-form.git
   ```

2. Navegue até o diretório `src/feature/DynamicForm` e importe o componente:

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import DynamicForm from '@/feature/DynamicForm/DynamicForm';
import {
  DynamicSchemaTestingComponent,
  DynamicSchemaTestingComponentType,
} from '@/feature/DynamicForm/types/DynamicFormType';

import { Form } from '@/feature/DynamicForm/components/ui/form';
import { Button } from '@/feature/DynamicForm/components/ui/button';

// Using the component in your form
function DynamicFormComponent() {
  const form = useForm<DynamicSchemaTestingComponentType>({
    resolver: zodResolver(DynamicSchemaTestingComponent),
    mode: 'onChange',
    defaultValues: {
      checkbox: [],
      input: '',
      cnpj: '',
      password: '',
      multiSelect: [],
      textarea: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <DynamicForm control={form.control} name="input" label="Componente Input" placeholder="Text" type="input" />
        <DynamicForm
          control={form.control}
          name="cnpj"
          label="Componente Input com máscara para CNPJ"
          placeholder="CNPJ"
          type="input"
          mask="cnpj"
        />
      </form>
    </Form>
  );
}
```

Você pode ver o exemplo completo de uso no repositório, onde há vários tipos de campo e validações em ação.

## Conclusão

O **DynamicForm** foi desenvolvido para fornecer uma solução rápida e escalável para a criação de formulários dinâmicos. Combinando a flexibilidade de **react-hook-form**, a tipagem forte de **TypeScript**, e a validação declarativa com **Zod**, o **DynamicForm** oferece uma experiência robusta e sem complicação.

## Experimente

Você pode conferir o componente em ação através da [demonstração online](https://dynamicform.leosarmento.com).

O repositório do projeto está disponível no GitHub: [Repositório DynamicForm](https://github.com/LeonardoSarmento/dynamic-form).

---

### Abraços, do seu Leo, e até a próxima!
