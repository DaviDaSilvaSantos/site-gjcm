# Coração Mariano — Grupo de Jovens

Site institucional do **Grupo de Jovens Coração Mariano**, criado para apresentar a identidade do grupo, sua espiritualidade, atividades e iniciativas. A aplicação também possui uma área local de gerenciamento de projetos.

Desenvolvido com **React, JavaScript, Vite e CSS**, com identidade visual inspirada na devoção mariana e no Sagrado Coração de Jesus.

---

## ✨ Funcionalidades

### Site institucional
- Apresentação do Grupo de Jovens Coração Mariano.
- Seção sobre a essência, a fé e a vivência comunitária do grupo.
- Exibição de atividades e iniciativas institucionais.
- Seção dinâmica de projetos.
- Cabeçalho com navegação adaptável a dispositivos móveis.
- Rodapé institucional.

### Gerenciamento de projetos
- Cadastro, edição e exclusão de projetos.
- Confirmação antes da exclusão.
- Pesquisa por título e descrição.
- Filtro por categoria.
- Definição de categoria e visibilidade.
- Publicação ou salvamento como rascunho.
- Marcação de projetos em destaque.
- Inclusão de imagem de capa com pré-visualização.

### Persistência local
Os projetos cadastrados pela interface são armazenados no `localStorage` do navegador. Os dados permanecem após atualizar a página ou reabrir o navegador no mesmo dispositivo e perfil.

> **Importante:** o armazenamento é local. Os projetos não são enviados para um servidor, não são compartilhados automaticamente entre dispositivos e não ficam disponíveis para todos os visitantes do site publicado. Para gerenciamento compartilhado, será necessária uma integração com backend ou banco de dados remoto.

---

## 🎨 Identidade visual

A interface segue uma direção visual editorial, acolhedora e institucional.

| Elemento | Cor | Aplicação |
|---|---|---|
| Azul mariano profundo | `#10366F` | Identidade principal e áreas institucionais |
| Marfim suave | `#F7EBDD` | Fundos e superfícies claras |
| Vermelho do Sagrado Coração | `#A91F35` | Ações e destaques |
| Dourado litúrgico | `#C9A45C` | Detalhes e ornamentos |
| Rosa floral | `#E9BFC7` | Elementos complementares |
| Grafite azulado | `#252A35` | Textos |

A logo está em `public/logo-coracao-mariano.png`.

---

## 🧰 Tecnologias

- [React](https://react.dev/) — construção da interface.
- JavaScript com ES Modules — lógica e gerenciamento dos dados.
- [Vite](https://vite.dev/) — servidor de desenvolvimento e build.
- CSS — estilização, identidade visual e responsividade.
- `localStorage` — persistência local dos projetos.

A versão atual não possui backend.

---

## 📁 Estrutura do projeto

```text
site-gjcm/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo-coracao-mariano.png
├── src/
│   ├── assets/
│   │   └── hero.png
│   ├── components/
│   │   ├── projects/
│   │   ├── Cards.jsx
│   │   ├── Eventos.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── MainContent.jsx
│   ├── dados-do-grupo/
│   │   ├── eventos.js
│   │   └── virtudes.js
│   ├── data/
│   │   └── projects.js
│   ├── hooks/
│   │   └── useProjects.js
│   ├── services/
│   │   └── projectsService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Principais arquivos

- `src/dados-do-grupo/eventos.js`: conteúdo das atividades e eventos.
- `src/dados-do-grupo/virtudes.js`: textos sobre virtudes e iniciativas do grupo.
- `src/data/projects.js`: lista inicial de projetos, atualmente vazia.
- `src/services/projectsService.js`: leitura, criação, atualização, exclusão e persistência dos projetos.
- `src/hooks/useProjects.js`: integra as operações de dados ao estado React.
- `src/components/MainContent.jsx`: seções principais e interface de gerenciamento.
- `src/components/Header.jsx`: cabeçalho e navegação.
- `src/components/Footer.jsx`: rodapé institucional.
- `src/index.css`: estilos globais e identidade visual.

---

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js compatível com a versão do Vite utilizada no projeto.
- npm, instalado junto com o Node.js.
- Git, caso deseje clonar o repositório.

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Entre na pasta

```bash
cd site-gjcm
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir a aplicação.

### 5. Gere a versão de produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para visualizar localmente a versão de produção:

```bash
npm run preview
```

---

## 🗂️ Como cadastrar e gerenciar projetos

A área de projetos está na seção **“Projetos que florescem”**.

1. Abra o site no navegador.
2. Acesse a seção **Projetos**.
3. Clique em **“Adicionar projeto”**.
4. Informe o título e a descrição curta, que são obrigatórios.
5. Preencha a descrição completa, se desejar.
6. Escolha uma categoria.
7. Defina a visibilidade como **Publicado** ou **Rascunho**.
8. Opcionalmente, selecione uma imagem de capa e marque o projeto como destaque.
9. Clique em **“Cadastrar projeto”**.

Projetos publicados aparecem na grade pública. Rascunhos ficam disponíveis no gerenciamento, mas não são exibidos na grade pública.

Para alterar um registro, utilize **Editar**. Para removê-lo, utilize **Excluir** e confirme a ação.

A pesquisa considera título e descrições. As opções do filtro de categoria são geradas a partir dos projetos cadastrados.

### Imagens de capa

- A imagem é opcional.
- O formulário aceita arquivos de imagem.
- O limite implementado é de **1 MB por imagem**.
- Há pré-visualização antes de salvar.
- A imagem é armazenada como dado do projeto no `localStorage`.

O armazenamento do navegador é limitado. Caso não haja espaço suficiente, a aplicação apresenta uma mensagem de erro. Para muitos projetos ou imagens maiores, recomenda-se utilizar um serviço de armazenamento apropriado.

---

## 💾 Como funciona a persistência

A chave utilizada no `localStorage` é:

```text
coracao-mariano:projects:v1
```

O arquivo `src/data/projects.js` fornece os dados iniciais. Quando ainda não há dados salvos nessa chave, a aplicação utiliza a lista inicial. Depois das alterações feitas pela interface, os projetos são gravados no armazenamento local do navegador.

Isso significa que:

- Atualizar a página não apaga os projetos.
- Fechar e reabrir o navegador no mesmo perfil normalmente preserva os dados.
- Limpar os dados do site ou o armazenamento do navegador pode apagar os projetos.
- Outro navegador, perfil, computador ou celular não recebe esses registros automaticamente.
- Os registros locais não alteram o arquivo `projects.js` nem o repositório Git.

**Atenção:** a interface de gerenciamento atual não possui autenticação. Ela não deve ser considerada um painel administrativo protegido. Os dados locais de um visitante não formam um cadastro central do grupo.

### Próxima evolução recomendada

Para que os responsáveis pelo grupo administrem o conteúdo e todos os visitantes vejam os mesmos projetos, será necessário integrar:

- Backend ou banco de dados remoto, como Supabase.
- Autenticação dos responsáveis pelo gerenciamento.
- Regras de autorização para criação, edição e exclusão.
- Armazenamento remoto para imagens.

Essa integração não faz parte da versão atual.

---

## 🧪 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Gera a versão de produção na pasta `dist/`. |
| `npm run preview` | Executa uma prévia local do build de produção. |
| `npm run lint` | Executa a verificação estática do ESLint. |

---

## 📌 Atualização do conteúdo institucional

Os textos das seções de atividades e virtudes estão organizados em arquivos JavaScript dentro de `src/dados-do-grupo/`.

Para atualizar esses conteúdos, edite os registros correspondentes, preservando a estrutura dos objetos e seus identificadores.

Os projetos criados pela interface são armazenados separadamente no navegador.

---

## 🤝 Manutenção

Ao modificar o projeto:

1. Preserve a identidade visual e a consistência dos componentes.
2. Mantenha os dados institucionais separados da apresentação.
3. Centralize as operações de projetos em `projectsService.js`.
4. Utilize o hook `useProjects` para integrar os dados à interface.
5. Teste cadastro, edição, exclusão, pesquisa e filtros após alterações.
6. Verifique a versão móvel e a navegação por teclado.
7. Execute `npm run lint` e `npm run build` antes de publicar, sempre que possível.

---

## 📄 Licença

Não foi identificada uma licença de distribuição específica na configuração atual do projeto. Antes de reutilizar, modificar ou redistribuir o código e os materiais visuais, defina a licença apropriada e confirme os direitos de uso dos recursos utilizados.

---

**Coração Mariano — Grupo de Jovens**  
*Jovens unidos pelo amor de Maria.*
