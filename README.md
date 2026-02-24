# 🤖 Automation Boilerplate

> Boilerplate de automação de testes baseado no padrão **Page Object Model (POM)**, construído com **JavaScript** e **TypeScript**.
>⚠️ Esse boilerplate ainda está sendo estruturado para ser usado como "modelo base" para futuras arquiteturas 🚧
---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Convenções](#-convenções)
- [Contribuindo](#-contribuindo)

---

## 💡 Sobre o Projeto

Este boilerplate foi criado para servir como base estrutural para projetos de automação de testes. Ele segue o padrão **Page Object Model (POM)**, promovendo separação de responsabilidades, reutilização de código e fácil manutenção.

O projeto não contém lógica de negócio ou casos de teste pré-definidos — **apenas a arquitetura pronta para uso**.

---

## 🏗️ Arquitetura

O projeto adota o padrão **Page Object Model (POM)**, onde cada página ou componente da aplicação é representado por uma classe dedicada, encapsulando seus seletores e ações.

```
Test (spec)
    └── Page Object
            └── Base Page
                    └── Driver / Framework Core
```

**Princípios seguidos:**

- **Separação de responsabilidades** — testes não conhecem seletores; Page Objects não contêm asserções.
- **Reusabilidade** — ações comuns centralizadas em `BasePage`.
- **Manutenibilidade** — mudança de seletor impacta apenas o Page Object correspondente.
- **Tipagem forte** — uso de TypeScript para maior segurança e autocompletion.

---

## 📁 Estrutura de Pastas

```
📦 automation-boilerplate
├── 📂 src
│   ├── 📂 pages                  # Page Objects
│   │   ├── BasePage.ts           # Classe base com ações genéricas
│   │   └── ...                   # Demais Page Objects
│   │
│   ├── 📂 components             # Componentes reutilizáveis (ex: Header, Modal)
│   │
│   ├── 📂 tests                  # Casos de teste (specs)
│   │   └── ...
│   │
│   ├── 📂 fixtures               # Dados de teste / mocks
│   │
│   ├── 📂 utils                  # Funções utilitárias e helpers
│   │
│   └── 📂 config                 # Configurações de ambiente
│
├── 📂 types                      # Tipagens TypeScript customizadas
│
├── .env.example                  # Variáveis de ambiente (modelo)
├── tsconfig.json                 # Configuração do TypeScript
├── package.json
└── README.md
```

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/automation-boilerplate.git

# Acesse a pasta do projeto
cd automation-boilerplate

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.example .env
```

---

## ▶️ Como Usar

```bash
# Executar todos os testes
npm test

# Executar em modo watch
npm run test:watch

# Executar com relatório
npm run test:report

# Compilar TypeScript
npm run build
```

---

## 📐 Convenções

### Nomenclatura

| Tipo            | Convenção              | Exemplo                  |
|-----------------|------------------------|--------------------------|
| Page Object     | `PascalCase` + `Page`  | `LoginPage.ts`           |
| Component       | `PascalCase`           | `HeaderComponent.ts`     |
| Spec / Test     | `kebab-case.spec.ts`   | `login-flow.spec.ts`     |
| Fixture / Mock  | `kebab-case.json`      | `user-data.json`         |
| Helper / Util   | `camelCase`            | `dateHelper.ts`          |

### Page Object

```typescript
// src/pages/ExamplePage.ts
import { BasePage } from './BasePage';

export class ExamplePage extends BasePage {
  // Seletores
  private readonly selectors = {
    title: '[data-testid="page-title"]',
    submitButton: '[data-testid="submit-btn"]',
  };

  // Ações
  async clickSubmit(): Promise<void> {
    await this.click(this.selectors.submitButton);
  }

  async getTitle(): Promise<string> {
    return this.getText(this.selectors.title);
  }
}
```

### Spec / Teste

```typescript
// src/tests/example.spec.ts
import { ExamplePage } from '../pages/ExamplePage';

describe('Example Flow', () => {
  let page: ExamplePage;

  beforeEach(() => {
    page = new ExamplePage();
  });

  it('should display the page title', async () => {
    const title = await page.getTitle();
    expect(title).toBe('Expected Title');
  });
});
```

# BOILERPLATE CYPRESS:

Apenas um bodyplate para apenas clonar e adaptar conforme o projeto demandar.


# Pré requisitos:

- Interface para linha de comando (Windows Terminal, Cmder, etc.)
    https://cmder.app

- Java 8 ou superior.
    https://www.java.com/pt-BR/download/
    
- Git for Windows -  Versão: 2.33.1 ou superior
    https://gitforwindows.org
    
- Interface para escrita de código (Visual Studio Code)
    https://code.visualstudio.com
    
- Node.js - Versão: 19.6.1 ou versão LTS
    https://nodejs.org/pt-br/download


# Execução da Cypess:

Após clonar o repositório na sua máquina local, basta acessar a pasta em que o arquivo tenha sido clonado e executar o seguinte comando:
```
npm install
```

Ao final, para executar o cypress visualmente, basta executar o comando:
```
npm run test:local
```

Para execução CLI no ambiente de desenvolvimento, basta executar o comando:
```
npm run test:FULL:dev
```

Para geração do relatório HTML cucumber:
```
npm run report-cucumber
```

# Relatório:

Para reporte dos testes que foram executados, será utilizado o cucumber-report para elaboração visual, onde será gerado o documento index.html através do comando:
```
node cucumber-html-report.js
	ou
npm run report-cucumber
```
E para o reporte dos testes CI, será utilizado as tasks “PublishCucumberReport@1” e “PublishTestResults@2”. 
A task PublishCucumberReport@1 criará um reporte simples, porém com a mesma base do Cucumber-report.
A task PublishTestResults@2 criará um reporte mais detalhado, contendo alguma informações para métrica dos teste em conjunto com Azure TestPlan.# bodyplate-cypress

# Documentação:

Cypress Test Automation Project

## Visão :

Este projeto utiliza Cypress como ferramenta principal para automação de testes, implementando padrões arquiteturais baseados no conceito de Page Objects (PO) e Behavior Driven Development (BDD). Ele é projetado para proporcionar reaproveitamento, manutenção facilitada e padronização na escrita e execução de testes automatizados.

## Estrutura do Projeto:
1. Step Definitions
- Cada página é necessário adicionar ao stepDefinitions para execução.
- Dividido em três categorias (common):
    - Escrita: Cadastro, edição ou exclusão.
    - Leitura: Consulta e mensagens de resposta.
    - Navegação: Mudanças de página.

2. Pages
- Implementação de ações e elementos de cada página.
- Dividido em:
    - Ações das Páginas: Escrever em campos, clicar em botões, etc.
    - Elementos das Páginas: Tipagem e seleção de elementos DOM.

3. Fixtures
- Armazena payloads e dados sensíveis para utilização nos testes.
- Organizado por telas/pages.

4. Supports
a) Commands
- Cria comandos personalizados usando Cypress.Commands.
- Exemplo:
``` 
cy.buscarBotaoPorTexto('Enviar').
```

b) Models
- Responsável pela tipagem e mapeamento das páginas.
- Exemplo: 
```
PageModel.getPage('Login').
```

c) Services
- Realiza chamadas REST APIs para testes de contratos ou geração de massas de dados.

# Passo-a-Passo para Criar Testes:

- Criar arquivo .feature:
    - Escreva os cenários utilizando Gherkin.
- Adicionar classe Page:
    - Crie a classe .page.ts e implemente a interface IPageModel.
    - Inclua os elementos em .page.elements.ts.
- Atualizar FuncionalidadeType:
    - Adicione o nome da funcionalidade no arquivo FuncionalidadeType.model.ts.
- Criar Step Definitions:
    - Implemente os passos correspondentes aos cenários da feature.
    - Verifique se o passo já existe antes de criar.

