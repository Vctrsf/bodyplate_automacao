import { LeituraStep } from "../common/leitura.step";
import { LoginPage } from "../../pages/loginPage/login.page";
import { NavegacaoStep } from "../common/navegacao.step";
import { EscritaStep } from "../common/escrita.step";
import { EquipesPage } from "../../pages/equipesPage/equipes.page";


const equipesPage = new EquipesPage();
const loginPage = new LoginPage();
const navegacaoStep = new NavegacaoStep();
const leituraStep = new LeituraStep();
const escritaStep = new EscritaStep(equipesPage);

describe('Equipes', () => {
  beforeEach(() => {
      cy.loginUsuario('elias.gomes@modalgr.io', 'ModalGR@2024');
      escritaStep.expandirMenuLateral();
      escritaStep.selecionarMenu("Cadastros");
      escritaStep.selecionarSubmenu("Equipes");
  });

 it("Usuário realiza acesso a tela de equipes.", () => {
  navegacaoStep.verificarPaginaAtual("Equipes")
  cy.wait(5000)
 })

//it("Usuário realiza pesquisa")

//it("Usuário realiza alteração na ordem dos itens da tabela")

it("Usuário realiza cadastro preenchendo todos os campos.", () => {
  equipesPage.clicarBotao("Cadastrar Equipe")
  
})

});

