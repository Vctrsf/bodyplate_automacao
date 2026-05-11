import { LeituraStep } from "../common/leitura.step";
import { LoginPage } from "../../pages/loginPage/login.page";
import { NavegacaoStep } from "../common/navegacao.step";
import { EscritaStep } from "../common/escrita.step";
import { ExemploPage } from "../../pages/exemploPage/exemplo.page"
import { exemploElementsInput } from "../../pages/exemploPage/exemplo.page.elements";

const exemploPage = new ExemploPage()
const loginPage = new LoginPage();
const navegacaoStep = new NavegacaoStep();
const leituraStep = new LeituraStep();
const escritaStep = new EscritaStep(exemploPage);

describe('Fluxo de Exemplo', () => {
  beforeEach(() => {
      // Exemplo de login e navegação inicial
      cy.loginUsuario('usuario@exemplo.com', 'Senha@123');
      escritaStep.expandirMenuLateral();
      escritaStep.selecionarMenu("Menu Exemplo");
  });

  it("Usuário realiza acesso a tela de exemplo.", () => {
    navegacaoStep.verificarPaginaAtual("Página de Exemplo")
  })

  it("Usuário realiza um cadastro genérico de exemplo.", () => {
    exemploPage.clicarBotao("BotaoNovo")
    exemploPage.escreverCampo("CampoTexto", "Texto de exemplo")
    exemploPage.escreverCampo("CampoEmail", "email@exemplo.com")
    exemploPage.clicarBotao("BotaoSalvar")
    
    leituraStep.visualizarMensagemModal('Cadastro realizado com sucesso!')
  });

  it("Usuário tenta realizar cadastro com campos obrigatórios vazios.", () => {
    exemploPage.clicarBotao("BotaoNovo")
    exemploPage.clicarBotaoModal("Modal", "BotaoSalvar")
    cy.verificaShielError(['Campo obrigatório'])
  })
})
