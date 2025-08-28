/// <reference types="cypress" />

import { EsqueciSenhaPage } from "../pages/esqueciSenhaPage/esqueciSenha.page";
import { EscritaStep } from "./common/escrita.step";
import { LeituraStep } from "./common/leitura.step";
import { NavegacaoStep } from "./common/navegacao.step";

const esqueciSenhaPage = new EsqueciSenhaPage();
const escritaStep = new EscritaStep(esqueciSenhaPage);
const leituraStep = new LeituraStep();
const navegacaoStep = new NavegacaoStep();
let cpf: string;
let cnpj: string;

describe("Esqueci a senha", () => {
  beforeEach(() => {
    cy.geraCnpj();
    cy.geraCpf();

    cpf = Cypress.env("cpf");
    cnpj = Cypress.env("cnpj");
    navegacaoStep.visitarPortalConcais();
  });

  it("Acesso a tela esqueci a senha.", () => {
    //  Dado que estou na página de "Login"
    navegacaoStep.acessarPaginaPorNome("Login");

    // Quando clico no link "Esqueci minha senha"
    esqueciSenhaPage.clicarLink("Esqueci minha senha");

    // Então devo visualizar o modal "Esqueceu sua senha?"
    leituraStep.visualizarModal("Esqueceu sua senha?");
  });

  it("Recupero a senha.", () => {
    navegacaoStep.acessarPaginaPorNome("Login");
    esqueciSenhaPage.clicarLink("Esqueci minha senha");
    esqueciSenhaPage.escreverCampo("Email", "usuario@usuario.com");
    esqueciSenhaPage.clicarBotao("Enviar");
    leituraStep.visualizarMensagemModal(
      "Pronto. Caso exista uma conta vinculada a esse e-mail nós enviaremos um link de redefinição de senha. Verifique suas caixas de entrada e spam."
    );
  });

  it("Tenta realizar a recuperação de senha.", () => {
    navegacaoStep.acessarPaginaPorNome("Login");
    esqueciSenhaPage.clicarLink("Esqueci minha senha");
    esqueciSenhaPage.escreverCampo("Email", "teste@teste.com");
    esqueciSenhaPage.clicarBotao("Enviar");
    leituraStep.visualizarMensagemModal(
      "Não foi possivel requisitar a recuperação de senha!"
    );
  });
});
