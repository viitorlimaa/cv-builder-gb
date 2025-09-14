# CV Builder GB

Uma aplicação front-end para criação de currículos personalizados, com visualização em tempo real e possibilidade de customização de layout.  
Desenvolvido com **TypeScript**, **Vite** e **TailwindCSS**.

---

_**Autores:**_  
- [@viitorlimaa](https://github.com/viitorlimaa)  
- [@kaylanny-1](https://github.com/Kaylanny-1)  
- [@devrichele](https://github.com/devrichele)  
- [@gicrisfer](https://github.com/GICRISFER)

_**Propósito:**_  
Permitir ao usuário montar um currículo por meio de componentes pré-definidos, estilos customizáveis, com visualização em tempo real e possibilidade de exportação.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)  
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
- [Estrutura do Projeto](#-estrutura-do-projeto)  
- [Instalação e Execução Local](#-instalação-e-execução-local)  


---

## 🔎 Visão Geral

O **CV Builder GB** é uma ferramenta front-end que permite criar currículos modernos e personalizados.  
O usuário pode montar seu currículo a partir de componentes pré-definidos, editar textos e seções, e visualizar o resultado instantaneamente.  

O projeto é totalmente front-end, funcionando diretamente no navegador, e pode ser hospedado como site estático.

---

## ⚙️ Tecnologias Utilizadas

- TypeScript  
- Vite  
- TailwindCSS  
- PostCSS  
- HTML, CSS e JavaScript  

---

## 📂 Estrutura do Projeto

/cv-builder-gb
├── public/ # Arquivos estáticos (imagens, fontes, assets)
├── src/ # Código-fonte
│ └── styles/ # Estilos globais e customizações
├── .gitignore # Arquivos ignorados pelo Git
├── README.md # Documentação do projeto
├── components.json # Definição dos blocos e seções do currículo
├── example-env # Exemplo de variáveis de ambiente
├── index.html # Ponto de entrada da aplicação
├── package.json # Dependências e scripts
├── tailwind.config.js # Configurações do TailwindCSS
├── tsconfig.json # Configurações do TypeScript
├── vite.config.ts # Configurações do Vite
└── postcss.config.js # Configurações do PostCSS


---

## 💻 Instalação e Execução Local

### 1. Instalar Dependências

```bash
npm install
# ou
yarn

2. Configurar Variáveis de Ambiente

Copie o arquivo example-env e renomeie para .env.

Preencha os valores conforme necessário.

Essas variáveis controlam parâmetros do projeto, como caminhos de assets e configurações de build.

3. Rodar em Modo de Desenvolvimento
npm run dev
# ou
yarn dev


A aplicação será servida localmente em http://localhost:5173/.

Hot reload habilitado: alterações no código atualizam instantaneamente o preview do currículo.

4. Build para Produção
npm run build
# ou
yarn build


O resultado será colocado na pasta dist/.

Pode ser hospedado em qualquer servidor de arquivos estáticos.

🛠 Como o Projeto Funciona

Estrutura de Componentes

components.json define os blocos do currículo (Experiência, Educação, Habilidades, Resumo, Informações Pessoais).

Cada bloco contém campos editáveis que o usuário preenche.

Fluxo de Dados

Inputs do usuário atualizam instantaneamente o estado da aplicação.

Pode ser armazenado temporariamente em localStorage.

Renderização

Cada bloco é mapeado para um componente visual.

TailwindCSS aplica estilos e espaçamentos.

Templates

Permite múltiplos templates de layout.

Novos templates podem ser adicionados alterando components.json e estilos CSS.

Exportação (Futura)

Permite exportação de PDF usando bibliotecas front-end externas.

🌍 Configurações de Ambiente

Arquivo .env baseado em example-env.

TailwindCSS configurável via tailwind.config.js.

PostCSS ajustável via postcss.config.js.

Vite configurável via vite.config.ts.

🚀 Funcionalidades Principais

Criação de currículo a partir de blocos JSON.

Edição de informações pessoais, experiência, educação e habilidades.

Visualização em tempo real.

Layouts customizáveis usando TailwindCSS.

Preparado para deploy como site estático.

🎨 Layout e Customização

Configuração de cores, fontes e espaçamentos em tailwind.config.js.

Estilos adicionais podem ser criados em src/styles/.

Novos templates de currículo podem ser adicionados alterando components.json.

Permite múltiplos layouts para diferentes estilos de currículo.

💡 Sugestões de Melhoria

Exportação direta para PDF.

Persistência de dados entre sessões com localStorage ou backend.

Suporte a múltiplos templates visuais.

Internacionalização para diferentes idiomas.

Melhorias de acessibilidade (contraste, navegação por teclado, ARIA labels).

Testes unitários e de integração.

📊 Fluxo do Aplicativo (Diagrama)
+---------------------+
|    Usuário Abre     |
|   a Aplicação       |
+---------------------+
          |
          v
+---------------------+
|  Preenchimento de   |
|  Campos do Currículo|
|  (inputs/forms)     |
+---------------------+
          |
          v
+---------------------+
|  Atualização do     |
|  Estado Local (JS)  |
|  / LocalStorage     |
+---------------------+
          |
          v
+---------------------+
|  Renderização do    |
|  Preview em Tempo   |
|  Real (Componentes) |
+---------------------+
          |
          v
+---------------------+
|  Aplicação de Layout|
|  e Estilos (Tailwind|
|  CSS / Templates)   |
+---------------------+
          |
          v
+---------------------+
|  Visualização Final |
|  do Currículo       |
+---------------------+
          |
          v
+---------------------+
|  Exportação (PDF)   |
|  / Download Futuro  |
+---------------------+

🗂 Exemplos de Blocos e Dados
Exemplo de components.json:
[
  {
    "type": "personal",
    "fields": ["name", "email", "phone", "linkedin"]
  },
  {
    "type": "experience",
    "fields": ["company", "role", "startDate", "endDate", "description"]
  },
  {
    "type": "education",
    "fields": ["institution", "degree", "startDate", "endDate", "description"]
  },
  {
    "type": "skills",
    "fields": ["skillName", "level"]
  }
]


Cada bloco é renderizado como um componente visual no preview.

Alterações nos inputs atualizam automaticamente o preview do currículo.