# Coração Mariano — Site institucional

Site institucional do Grupo de Jovens Coração Mariano, desenvolvido com React, JavaScript e Vite.

## Tecnologias

- React 19
- JavaScript (ES Modules)
- Vite 8
- CSS responsivo, sem framework adicional

## Executar localmente

Requisitos: Node.js compatível com Vite 8 (Node.js 20.19+ ou 22.12+).

```bash
npm install
npm run dev
```

O Vite exibirá o endereço local no terminal.

## Gerar versão de produção

```bash
npm run build
npm run preview
```

## Projetos: cadastro e persistência

A área **Projetos** permite cadastrar, editar e excluir iniciativas, pesquisar por título/descrição e filtrar por categoria. Os registros publicados aparecem na listagem pública.

- `src/data/projects.js`: dados iniciais. Está vazio para não apresentar iniciativas fictícias como atividades oficiais.
- `src/services/projectsService.js`: leitura, validação, criação, edição e exclusão.
- `src/hooks/useProjects.js`: sincroniza os dados com o estado React.
- `src/components/MainContent.jsx`: interface pública e formulário de gerenciamento.

Os projetos cadastrados são guardados no `localStorage` do navegador, na chave `coracao-mariano:projects:v1`. Portanto, permanecem após atualizar a página no mesmo navegador/perfil, mas **não são compartilhados entre dispositivos ou usuários**. Limpar os dados do navegador pode apagá-los.

O arquivo `projects.js` fornece apenas os dados iniciais; alterações feitas pela interface não modificam o arquivo-fonte.

### Imagens

A seleção de imagem aceita arquivos de imagem de até 1 MB. A imagem é convertida para Data URL e armazenada junto ao projeto no `localStorage`. Essa abordagem é adequada apenas para um pequeno volume de conteúdo; o limite de armazenamento do navegador pode ser atingido. Para publicação colaborativa, recomenda-se backend/API e armazenamento remoto de arquivos.

## Conteúdo institucional

Os textos de encontros e virtudes existentes no projeto foram preservados e reapresentados na nova interface. Não foram criados eventos, contatos ou perfis sociais fictícios.

## Limitações atuais

- Não há backend, autenticação ou painel administrativo protegido.
- O gerenciamento está disponível na própria interface e não deve ser considerado restrito.
- Os dados e imagens são locais ao navegador.
- As fontes Cormorant Garamond, Montserrat e Cinzel são carregadas pelo Google Fonts; a tipografia alternativa do sistema será utilizada se a conexão externa não estiver disponível.
