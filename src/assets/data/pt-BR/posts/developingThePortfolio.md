# Construindo Meu Site de Portfólio com Tecnologias Web Modernas

## Introdução

Criar um portfólio pessoal é uma excelente maneira de mostrar suas habilidades e projetos. Ao decidir construir meu site de portfólio, quis utilizar as tecnologias mais modernas e eficientes disponíveis. Neste artigo, compartilho minha experiência na criação do meu portfólio, explorando as ferramentas e frameworks que usei para construir um site rápido, responsivo e multilíngue.

## Escolhendo o Stack Ideal para um Portfólio Moderno

### Por que Vite.js, React e TypeScript?

Para o desenvolvimento do meu portfólio, optei por uma combinação poderosa de `Vite.js`, `React` e `TypeScript`. Cada uma dessas tecnologias traz benefícios únicos que, quando combinados, proporcionam uma base sólida para construir aplicações web modernas e eficientes.

- **_Vite.js_** é uma ferramenta de construção moderna que oferece uma experiência de desenvolvimento extremamente rápida, principalmente devido à sua capacidade de fornecer um servidor de desenvolvimento ágil e construir pacotes otimizados para produção. Com tempos de inicialização quase instantâneos e recarregamento a quente eficiente, o `Vite.js` melhora significativamente a produtividade durante o desenvolvimento.

- **_React_** foi escolhido como a biblioteca principal para construir a interface do usuário devido à sua flexibilidade e vasta ecossistema. A componentização do `React` permite criar interfaces reutilizáveis e fáceis de manter, facilitando a construção de uma interface dinâmica e interativa para o portfólio. Além disso, a comunidade ativa e o suporte contínuo garantem que o React esteja sempre alinhado com as últimas tendências e melhores práticas de desenvolvimento.

- **_TypeScript_** adiciona uma camada de segurança ao código, proporcionando tipos estáticos que ajudam a evitar erros e facilitam a refatoração de código em projetos maiores. A tipagem forte oferecida pelo `TypeScript` melhora a legibilidade e a manutenção do código, tornando-o mais robusto e menos propenso a bugs. Essa combinação de Vite.js, React e TypeScript me permitiu trabalhar de maneira eficiente e segura, garantindo que o código fosse fácil de manter e evoluir.

### Integração do Tanstack Router para Roteamento Dinâmico

O `Tanstack Router` foi minha escolha para o roteamento dinâmico no meu portfólio. Este roteador moderno, projetado especificamente para aplicações `React`, oferece uma ampla gama de recursos que o tornam ideal para a construção de interfaces ricas e interativas.

Algumas das principais vantagens do Tanstack Router incluem:

- **100% de suporte ao TypeScript inferido:** Com suporte totalmente inferido ao `TypeScript`, o `Tanstack Router` oferece uma experiência de desenvolvimento altamente produtiva, com navegação tipada e detecção de erros em tempo de compilação. Isso melhora a segurança e a qualidade do código, permitindo a construção de rotas de maneira confiável.

- **Roteamento aninhado e rotas de layout:** O suporte a rotas aninhadas e rotas de layout facilita a criação de layouts complexos e reutilizáveis dentro da aplicação. Isso permite uma estrutura clara e organizada, mantendo a consistência visual em todo o site.

- **Integração com Tanstack Query e suporte a SWR Caching:** O `Tanstack Router` foi projetado para se integrar perfeitamente com caches de dados no cliente, como o Tanstack Query. Essa integração melhora a experiência do usuário ao sincronizar dados dinamicamente, enquanto os loaders de rota embutidos com cache `SWR` garantem que os dados sejam sempre atualizados e rápidos.

- **Gerenciamento de estado de Search Params com validação:** Um dos destaques do `Tanstack Router` é seu gerenciamento de Search Params com APIs de navegação totalmente tipadas e schemas de validação, utilizando o `Zod`. Isso não apenas garante que os parâmetros de busca sejam gerenciados de forma segura e eficiente, mas também facilita a manipulação e validação dos dados diretamente na URL, promovendo uma experiência de usuário consistente.

- **Carregamento assíncrono de elementos e gerenciamento de erros:** O suporte a elementos de rota assíncronos e boundaries de erro permite o carregamento dinâmico de componentes, melhorando o desempenho e a usabilidade da aplicação, especialmente em páginas complexas com muitos dados.

- **Prefetching automático de rotas:** O `Tanstack Router` pode pré-carregar rotas automaticamente, o que reduz os tempos de carregamento percebidos pelo usuário e melhora a fluidez da navegação.

- **Middleware para correspondência e carregamento de rotas:** A flexibilidade do `Tanstack Router` é ainda ampliada pelo suporte a middlewares de correspondência e carregamento de rotas, permitindo uma personalização avançada do fluxo de navegação.

Essa combinação de funcionalidades robustas e integração profunda com outras ferramentas, como `Tanstack Query`, tornou o `Tanstack Router` a escolha perfeita para o roteamento dinâmico no meu portfólio, garantindo tanto uma excelente experiência de desenvolvimento quanto uma experiência de usuário de alta qualidade.

### Gerenciamento de Estado no Cliente com Tanstack Query

Para o gerenciamento de estado do cliente, utilizei o `Tanstack Query`. Essa biblioteca é ideal para gerenciar o estado de dados assíncronos e cache no lado do cliente. Com o Tanstack Query, pude facilmente sincronizar os dados de forma eficiente, reduzindo a complexidade do código e melhorando a performance geral da aplicação. Como todo o conteúdo do meu portfólio é carregado a partir de arquivos Markdown armazenados no repositório, o Tanstack Query provou ser uma escolha robusta para gerenciar esses dados de maneira reativa.

## Construindo uma Interface Responsiva e Acessível

### Tailwind CSS e Shadcn/ui para Consistência no Design

Para garantir que meu site fosse visualmente agradável, responsivo e consistente, optei por usar `Tailwind CSS` junto com `Shadcn/ui`. O Tailwind CSS é um framework utilitário que facilita a criação de interfaces de usuário estilizadas, permitindo que o design seja implementado diretamente no HTML ou JSX através de classes utilitárias.

**Uma das grandes vantagens do Tailwind CSS é a facilidade que ele proporciona para desenvolver aplicações que funcionem tanto na web quanto em dispositivos móveis.** Com suas classes utilitárias, é simples aplicar estilos responsivos que se adaptam a diferentes tamanhos de tela, garantindo que a interface do usuário funcione bem em desktops, tablets e smartphones sem a necessidade de escrever CSS adicional. Isso acelera o desenvolvimento e melhora a consistência visual em todas as plataformas.

Em complemento, utilizei o `Shadcn/ui`, uma coleção de componentes reutilizáveis e bem projetados que podem ser copiados e colados diretamente no projeto. O Shadcn/ui oferece componentes acessíveis e personalizáveis, mas **não é uma biblioteca de componentes tradicional** que você instala como uma dependência via npm. Em vez disso, você escolhe os componentes de que precisa, copia o código e o adapta às necessidades do seu projeto. Essa abordagem permite total controle sobre o código, garantindo que ele se integre perfeitamente ao restante da aplicação.

### Internacionalização com i18n

Meu site de portfólio é multilíngue, o que exigiu a configuração de uma solução de **_internacionalização (i18n)_**. Usei a biblioteca `i18n` para gerenciar as traduções do site, garantindo que os visitantes possam acessar o conteúdo no idioma de sua preferência. A configuração do i18n foi simples e permitiu que eu adicionasse facilmente suporte a novos idiomas, mantendo a estrutura do site organizada e eficiente.

## Aplicação como PWA (Progressive Web App)

Além de desenvolver o site para funcionar bem em diferentes dispositivos, também o configurei para ser um **_Progressive Web App (PWA)_**. Um `PWA` combina o melhor da web e dos aplicativos móveis, oferecendo uma experiência rica e imersiva aos usuários.

**Os benefícios de transformar o portfólio em um PWA incluem:**

- **Velocidade e Desempenho:** O `PWA` carrega rapidamente e proporciona uma experiência suave, com recursos de caching inteligente que reduzem o tempo de carregamento.
- **Instalável:** O site pode ser instalado como um aplicativo no dispositivo do usuário, com um ícone na tela inicial e uma interface sem a barra de navegação do navegador, oferecendo uma experiência de uso semelhante a um app nativo.

Implementar o `PWA` foi uma escolha estratégica para garantir que o portfólio não só atendesse às expectativas atuais dos usuários, mas também oferecesse uma experiência de navegação futura, adaptada às melhores práticas da web moderna.

## Manipulação e Validação de Formulários

### React Hook Form para Gestão Simples de Formulários

Os formulários são uma parte crucial de qualquer site que precise de interação com o usuário. Para gerenciar os formulários do meu portfólio, usei o `React Hook Form`, uma biblioteca que facilita a manipulação de formulários em React, mantendo o código limpo e minimizando o uso de hooks. Com o React Hook Form, consegui criar formulários funcionais e reativos, economizando tempo no desenvolvimento e garantindo uma ótima experiência do usuário.

### Validação de Dados com Zod

Para a validação dos dados dos formulários, utilizei o `Zod`. Zod é uma biblioteca de validação de schemas que se integra perfeitamente com o `React Hook Form`. A combinação dessas duas ferramentas me permitiu criar validações robustas e personalizadas para os formulários, assegurando que apenas dados válidos fossem enviados e processados.

## Gestão de Conteúdo

### Usando React-Markdown para Conteúdo Dinâmico

Todo o conteúdo do meu site de portfólio é gerado a partir de arquivos Markdown armazenados no repositório GitHub. Para renderizar esse conteúdo no site, utilizei o `React-Markdown`. Essa biblioteca converte arquivos Markdown em componentes `React`, permitindo que eu integre conteúdo dinâmico facilmente. Isso me deu a flexibilidade de atualizar o conteúdo diretamente no repositório, sem precisar modificar o código base.

### Otimizando Conteúdo Markdown para SEO

Mesmo utilizando Markdown, é crucial garantir que o conteúdo seja otimizado para motores de busca (SEO). Utilizei boas práticas de SEO ao estruturar os arquivos Markdown, como o uso adequado de headings, links e metadados. O `React-Markdown` facilitou essa tarefa, permitindo que eu personalizasse a renderização de cada elemento para manter a otimização do conteúdo.

## Otimização de Desempenho

### Impulsionando o Desempenho com Vite.js

Um dos principais benefícios do `Vite.js` é sua capacidade de melhorar significativamente o tempo de build. Com Vite.js, consegui dividir o código em pacotes menores e implementar técnicas de lazy loading, o que resultou em um desempenho mais rápido e uma melhor experiência para o usuário final. A velocidade do desenvolvimento também foi otimizada, permitindo que eu visse as mudanças em tempo real durante o processo de codificação.

### Utilizando TypeScript para Segurança de Tipos

O `TypeScript` desempenhou um papel vital na garantia da segurança do código ao longo do desenvolvimento do projeto. A tipagem estática fornecida pelo TypeScript ajudou a identificar potenciais erros antes mesmo de executar o código, o que foi essencial para a manutenção e escalabilidade do projeto. Além disso, o TypeScript facilitou a refatoração do código à medida que o projeto crescia, sem comprometer a funcionalidade existente.

## Deploy e Hospedagem na Vercel

### Por que Escolhi a Vercel para Hospedagem

Escolhi a `Vercel` como plataforma de hospedagem para meu portfólio por sua facilidade de uso e recursos robustos. A Vercel é ideal para projetos frontend como o meu, oferecendo um processo de deploy simplificado, integração contínua e excelente suporte para sites estáticos e dinâmicos. Além disso, a Vercel oferece otimizações automáticas de desempenho, o que se alinha perfeitamente com os objetivos do meu projeto.

### Configurando Pipeline de CI/CD

A configuração de um pipeline de `CI/CD` foi essencial para automatizar o processo de deploy e garantir que o site estivesse sempre atualizado e funcional. Com a `Vercel`, pude integrar facilmente o `GitHub` para que cada alteração no código fosse automaticamente testada e implantada, garantindo um processo de desenvolvimento e lançamento contínuo e confiável.

## Versionamento com Git

### Estratégias de Versionamento com Git

Para manter o controle das versões do projeto, utilizei o `Git`. O que facilitou o rastreamento de alterações e a colaboração. O versionamento com Git é fundamental para qualquer projeto de software, especialmente em projetos que evoluem rapidamente.

### Integração com GitHub

O `GitHub` foi a plataforma escolhida para armazenar e versionar o código-fonte do meu portfólio. Além de facilitar o controle de versões, o GitHub também oferece ferramentas de colaboração que são extremamente úteis, mesmo em projetos pessoais. A integração com a `Vercel` permitiu um fluxo de trabalho suave, onde qualquer alteração no código resultava em uma nova versão do site automaticamente.

## Futuras Melhorias

### Funcionalidades Planejadas para o Portfólio

Mesmo com o site funcionando, tenho planos para futuras melhorias. Pretendo adicionar novas funcionalidades para melhorar a experiência do usuário, como animações mais interativas, uma seção de blog integrada e ferramentas de análise de visitantes. Essas melhorias contínuas são essenciais para manter o site atualizado e relevante.

### Aprendizado Contínuo e Adaptação

Construir este portfólio foi uma excelente oportunidade para aprender e aplicar novas tecnologias. No entanto, o aprendizado não para por aqui. Planejo continuar me atualizando com as últimas tendências e melhores práticas de desenvolvimento web, garantindo que meu portfólio continue evoluindo e refletindo as habilidades que adquiro ao longo do tempo.

## Conclusão

Desenvolver meu site de portfólio foi uma experiência extremamente enriquecedora. Ao utilizar uma combinação de ferramentas e bibliotecas modernas como `Vite.js`, `TypeScript`, `Tanstack Router`, `Tanstack Query`, entre outras, consegui criar um site rápido, eficiente e preparado para o futuro. A jornada de desenvolvimento trouxe muitos aprendizados, e estou animado para continuar aprimorando e expandindo este projeto à medida que novas tecnologias surgem.

---

### FAQs

1. **Por que você escolheu o Vite.js para o seu projeto?**

   - O `Vite.js` foi escolhido devido à sua velocidade de build e simplicidade, oferecendo uma experiência de desenvolvimento rápida e otimizada.

2. **Como você gerencia o conteúdo do seu portfólio?**

   - Todo o conteúdo é gerado a partir de arquivos Markdown armazenados no repositório `GitHub`, usando React-Markdown para renderizá-los no site.

3. **Por que escolheu a Vercel como plataforma de hospedagem?**

   - A `Vercel` foi escolhida pela sua simplicidade no deploy, suporte robusto para sites frontend e integração perfeita com o `GitHub`.

4. **Quais tecnologias você planeja adicionar no futuro ao seu portfólio?**
   - Planejo adicionar funcionalidades como animações interativas, uma seção de blog integrada e ferramentas de análise de visitantes para melhorar a experiência do usuário.

---