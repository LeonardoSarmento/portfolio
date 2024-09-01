## Múltiplas chaves SSH no PC

Configurar duas chaves SSH separadas era um desejo que eu tinha desde que comecei a trabalhar no ISTEO e precisei criar uma conta profissional no `GitHub`. Após procurar um pouco, mas nunca encontrar um tutorial completo e fácil de entender, e com uma pitada de procrastinação, finalmente resolvi aprender como fazer. Então, apresento a vocês a maneira como configuro minhas múltiplas chaves.

Para fins deste artigo, pessoal = Github e trabalho = Github, mas obviamente faça o que você precisar.

# Passo 1: Navegue até o local correto
Todas as suas chaves SSH precisam ser armazenadas em `~/.ssh`, então navegue até lá usando:

`cd ~/.ssh`

O ~ significa a raiz do seu diretório de usuário, o que deve tornar suas chaves SSH acessíveis, não importa onde você navegue na sua estrutura de arquivos, desde que você esteja logado no usuário correto.

# Passo 2: Crie as chaves SSH
Em seguida, você precisará gerar as chaves. Comece criando sua chave pessoal:

``` bash
ssh-keygen -t rsa -C "nome@email_pessoal.com"
```

Pressione enter.

Ele solicitará um nome de arquivo, você deve nomeá-lo algo como: `id_rsa_pessoal`

Isso imprimirá um grande bloco de texto para sua impressão digital. Você pode ignorar isso, pegaremos o que precisamos da chave depois.

Agora crie sua chave de trabalho:
``` bash
ssh-keygen -t rsa -C "nome@email_trabalho.com"
```

Pressione enter.

Desta vez, quando ele solicitar um nome de arquivo, use `id_rsa_trabalho`

Cada um desses comandos criará dois arquivos (então quatro no total), um com o nome que você inseriu e um segundo com .pub no final.

# Passo 3: Crie um arquivo de configuração
Ainda no mesmo terminal, tente usar `ls` para ver se existe um arquivo chamado config. Se existir, use `code config` para abri-lo no seu editor de código. Se não existir, você pode criá-lo usando `touch config`, depois abra-o com `code config`. Copie e cole o seguinte no seu config:

 ``` bash
# Conta Pessoal: (Nome-Da-Sua-Conta-No-Github)

Host github.com-(Nome-Da-Sua-Conta-No-Github)
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_pessoal

# Conta de Trabalho: (Nome-Da-Sua-Conta-No-Github)

Host github.com-(Nome-Da-Sua-Conta-No-Github)
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_trabalho

```

# Passo 4: Adicione as chaves ao Agente
Em uma nova janela do PowerShell com permissões de administrador, certifique-se de que o ssh-agent está em execução. Você pode usar as instruções "Auto-lançamento do ssh-agent" em "Trabalhando com frases de senha de chave SSH", ou iniciá-lo manualmente:
``` bash
# inicie o ssh-agent em segundo plano
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```
Primeiro, vamos verificar a lista de chaves já monitoradas pelo ssh-agent
```bash
ssh-add -l
```
Se sua chave não estiver sendo monitorada, você precisa adicioná-la à lista.
Em uma janela de terminal sem permissões elevadas, adicione sua chave privada SSH ao ssh-agent. Se você criou sua chave com um nome diferente, ou se está adicionando uma chave existente que tem um nome diferente, substitua id_rsa_pessoal no comando pelo nome do seu arquivo de chave privada.

```bash
ssh-add c:/Users/VOCÊ/.ssh/id_rsa_pessoal
```
Depois faça o mesmo com a chave de trabalho

```bash
ssh-add c:/Users/VOCÊ/.ssh/id_rsa_trabalho
```

# Passo 5: Adicione as chaves às suas contas
Em seguida, você precisará pegar a chave real para adicionar a cada conta. Para fazer isso, você pode digitar o comando:
``` bash
clip < ~/.ssh/id_rsa_pessoal.pub
``` 
A chave será copiada. Você pode então navegar até a seção de chaves SSH do Github e colar sua nova chave! 
Repita com `clip < ~/.ssh/id_rsa_trabalho.pub` e você estará pronto!

Tente puxar ou clonar um repositório de qualquer conta e veja se funciona. Você pode precisar recarregar seu arquivo de configuração (de ~/.ssh digite source config), mas se você receber um erro ao tentar, use o próximo passo. Se você não receber um erro, então você terminou a configuração e pode pular para o passo 6.

# Passo 6: Clone seu repositório com o host correto
No passo 3, criamos um campo chamado Host para cada uma de nossas chaves SSH. No meu exemplo, eu os nomeei após o site usado para controle de versão. Se você decidiu nomear os seus de outra forma, certifique-se de referenciá-los ao clonar um novo repositório. No meu caso, posso clonar o repositório com o seguinte comando:

``` bash
git clone git@github.com-(Nome-Da-Sua-Conta-No-Github):(Nome-Da-Sua-Conta-No-Github)/nome-do-repo.git
```

Espero que isso ajude!

---