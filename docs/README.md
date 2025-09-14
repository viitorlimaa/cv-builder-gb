# Documentação do Projeto CV Builder GB

## Visão Geral

O CV Builder GB é uma aplicação front-end para criar currículos modernos e personalizados.  
Permite ao usuário montar um currículo a partir de blocos pré-definidos, editar textos e seções, e visualizar o resultado instantaneamente.

---

## Estrutura do Projeto

/cv-builder-gb
├── public/ # Arquivos estáticos (imagens, fontes, assets)
├── src/ # Código-fonte
│ └── styles/ # Estilos globais e customizações
├── components.json # Blocos do currículo
├── example-env # Exemplo de variáveis de ambiente
├── index.html # Ponto de entrada
├── package.json # Dependências e scripts
├── tailwind.config.js # Configurações do TailwindCSS
├── tsconfig.json # Configurações do TypeScript
├── vite.config.ts # Configurações do Vite
└── postcss.config.js # Configurações do PostCSS 

---

## Como Rodar

1. Instalar dependências:

```bash
npm install
# ou
yarn

Configurar variáveis de ambiente copiando example-env para .env.

Rodar em desenvolvimento:
npm run dev
Build para produção:

bash
Copiar código
npm run build
Fluxo do Projeto
rust
Copiar código
Usuário -> Preenche campos -> Atualiza estado -> Preview em tempo real -> Layout/Tailwind -> Visualização final -> Exportação PDF
yaml
Copiar código

---

### `docs/CONTRIBUTING.md`

```markdown
# Contribuindo para o CV Builder GB

Obrigado por querer contribuir!  

## Regras Básicas

- Fork o repositório e crie sua branch a partir de `main`.
- Use commits descritivos e claros.
- Envie pull requests detalhando alterações.

## Desenvolvimento

- Instale dependências: `npm install`  
- Rode o projeto local: `npm run dev`  
- Crie novos componentes ou edite `components.json` conforme necessidade.  
- Teste todas as alterações antes de enviar PR.

## Código

- Usar TypeScript estrito.  
- Seguir padrão de estilo do projeto (TailwindCSS e componentes React).

