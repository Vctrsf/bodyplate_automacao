/// <reference types="cypress" />

let usuario: any;
const URL: string = Cypress.env("BASE_URL");

beforeEach(() => {
  cy.fixture("acessos/acesso").then((acessos) => {
    usuario = acessos;
  });
});

export class NavegacaoStep {
  // Métodos associados a URL ou Navegação.
  visitarPortalConcais() {
    cy.wait(500);
    cy.visit(URL);
  }

  acessarPaginaPorNome(tela: PaginasType) {
    cy.wait(500);

    const urlByTela: Partial<Record<PaginasType, string>> = {
      Login: URL + "/login",
      "Esqueci a senha": URL + "/recovery-password",
    };

    cy.url().should("eq", urlByTela[tela]);
  }

  verificarPaginaAtual(tela: PaginasType) {
    cy.wait(500);

    const urlByTela: Partial<Record<PaginasType, string>> = {
      Inicial: "/home",
      "Esqueci a senha": "/recovery-password",
      Equipes: "/cadastro-equipes",
      "Cadastro de Motorista": "/cadastro-motorista"
    };

    cy.url().should("eq", URL + urlByTela[tela]);
  }

  autenticarUsuario() {
    cy.wait(500);
    cy.loginUsuario(usuario.email, usuario.senha);
  }

  mudarAba(nomeAba: string) {
    cy.wait(500);
    cy.mudarAba(nomeAba);
  }
}
