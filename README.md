# 🤖 Automation Boilerplate

> Boilerplate de automação de testes baseado no padrão **Page Object Model (POM)**, construído com **JavaScript** e **TypeScript**.
⚠️ Esse boilerplate ainda está sendo estruturado para ser usado como "modelo base" para futuras arquiteturas 🚧
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
