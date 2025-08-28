/// <reference types="cypress" />

import { ILoginService } from "../supports/services/httpServices/loginService/login.model";
import {
  ILoginServicePageElementsInput,
} from "../pages/loginPage/login.page.elements";
import { EscritaStep } from "./common/escrita.step";
import { LeituraStep } from "./common/leitura.step";
import { NavegacaoStep } from "./common/navegacao.step";
import { LoginPage } from "../pages/loginPage/login.page";

const loginPage = new LoginPage();
const escritaStep = new EscritaStep(loginPage);
const leituraStep = new LeituraStep();
const navegacaoStep = new NavegacaoStep();

interface campoValor {
  campo: keyof ILoginServicePageElementsInput;
  valor: string;
  mensagem: string;
}

let usuario: ILoginService;

describe("Esqueci a senha", () => {
  beforeEach(() => {
    navegacaoStep.visitarPortalConcais();

    cy.fixture("acessos/acesso").then((acessos) => {
      usuario = acessos;
    });
  });

  it("Login Dix Aeroportos.", () => {
    navegacaoStep.acessarPaginaPorNome("Login");
    loginPage.escreverCampo("Email", usuario.email);
    loginPage.escreverCampo("Senha", usuario.senha);
    loginPage.clicarBotao("Fazer login");
    navegacaoStep.verificarPaginaAtual("Inicial");
  });

  it("Tentativa de login.", () => {
    navegacaoStep.acessarPaginaPorNome("Login");
    loginPage.escreverCampo("Email", "usuario@usuario.com");
    loginPage.escreverCampo("Senha", "Teste@123");
    loginPage.clicarBotao("Fazer login");
    leituraStep.visualizarInformacaoToast(
      "Verifique os dados inseridos e tente novamente."
    );
  });

  it("E-mail e senha inválidos.", () => {
    const campoValor: campoValor[] = [
      {
        campo: "Email",
        valor: "teste",
        mensagem: "E-mail precisa estar em um formato válido",
      },
      {
        campo: "Senha",
        valor: "teste@teste.com",
        mensagem:
          "A senha deve conter pelo menos, uma letra maiúscula, uma letra minúscula, um número, um caractere especial, 8 caracteres ou mais",
      },
    ];

    campoValor.forEach((x) => {
      navegacaoStep.acessarPaginaPorNome("Login");
      loginPage.escreverCampo(x.campo, x.valor);
      loginPage.clicarBotao("Fazer login");
      leituraStep.visualizarInformacaoToast(x.mensagem);
    });
  });
});
