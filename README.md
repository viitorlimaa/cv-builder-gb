# CV Builder GB

Aplicação **front-end** para criação de **currículos personalizados** com **preview em tempo real**.  
Permite customização de layout, alternância de tema claro/escuro e está preparada para exportação futura em PDF.  

Desenvolvido com **React, TypeScript e TailwindCSS**.

---

## 🚀 Visão Geral

O **CV Builder GB** ajuda usuários a criarem currículos profissionais de forma simples e rápida:
- Visualização instantânea enquanto edita
- Campos validados (email, telefone, links)
- Layout moderno e responsivo
- Suporte a temas claros e escuros
- Estrutura modular para expansão futura (ex: IA para sugestões e exportação PDF)

---

## 🛠 Tecnologias

- **React 19 + TypeScript** — Base da aplicação
- **TailwindCSS v3** — Estilização moderna e responsiva
- **React Hook Form** — Controle de formulários
- **Zod** — Validação dos dados
- **Lucide Icons** — Ícones estilizados
- **Vite** — Bundler e dev server rápido

---

## ⚙️ Funcionalidades Principais

- Criar e editar currículos em tempo real  
- Alternar tema claro/escuro com persistência  
- Validação de dados pessoais (email, telefone, LinkedIn)  
- Customização do layout do currículo  
- Preparado para exportação em PDF  

---

## 📁 Estrutura do Projeto

cv-builder-gb/
│
├─ public/
│ └─ assets/ # Imagens, ícones, fontes
├─ src/
│ ├─ components/ # Componentes reutilizáveis
│ ├─ context/ # Contextos React (CVContext)
│ ├─ hooks/ # Hooks personalizados
│ ├─ pages/ # Páginas do App
│ ├─ styles/ # TailwindCSS + overrides
│ └─ main.tsx # Entrada do App
├─ README.md
├─ CONTRIBUTING.md
├─ project.yml
└─ vite.config.ts

markdown
Copiar código

---

## 🔄 Fluxo de Dados

O aplicativo usa **React Context API** para gerenciar estado global do currículo:

- `CVContext` mantém:
  - **Informações pessoais** (`name`, `email`, `phone`, `linkedin`, `summary`)
  - **Habilidades** (`skills`)
  - **Experiências profissionais** (`experiences`)

Funções disponíveis:
- `updatePersonalInfo()`
- `updateSkills()`
- `updateExperiences()`

Validações são feitas com **Zod** para garantir consistência.

---

## 💻 Instalação e Uso

```bash
# Clonar repositório
git clone https://github.com/viitorlimaa/cv-builder-gb.git
cd cv-builder-gb

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
O app estará disponível em: http://localhost:5173/ (ou similar)