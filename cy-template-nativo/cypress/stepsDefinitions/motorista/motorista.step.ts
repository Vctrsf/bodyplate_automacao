import { LeituraStep } from "../common/leitura.step";
import { LoginPage } from "../../pages/loginPage/login.page";
import { NavegacaoStep } from "../common/navegacao.step";
import { EscritaStep } from "../common/escrita.step";
import { MotoristasPage } from "../../pages/motoristaPage/motorista.page"
import { motoristaElementsInput } from "../../pages/motoristaPage/motorista.page.elements";
import { faker, fakerPT_BR } from '@faker-js/faker';


const motoristaPage = new MotoristasPage()
const loginPage = new LoginPage();
const navegacaoStep = new NavegacaoStep();
const leituraStep = new LeituraStep();
const escritaStep = new EscritaStep(motoristaPage);

describe('Motorista', () => {
  beforeEach(() => {
    cy.intercept("http://10.200.17.6:5347/api/Login").as('endPointLogin')
      cy.loginUsuario('elias.gomes@modalgr.io', 'ModalGR@2024');
      cy.wait("@endPointLogin")
      escritaStep.expandirMenuLateral();
      escritaStep.selecionarMenu("Cadastros");
      escritaStep.selecionarSubmenu("Motorista");
  });

 it("Usuário realiza acesso a tela de motoristas.", () => {
  navegacaoStep.verificarPaginaAtual("Cadastro de Motorista")
  cy.wait(5000)
 })

it.only("Usuário realiza cadastro preenchendo todos os campos.", () => {
  motoristaPage.clicarBotao("CadastrarMotorista")
  cy.wait(3000)
      cy.preencherCampoCustom(motoristaElementsInput.Nome, fakerPT_BR.person.fullName());
  cy.preencherCampoCustom(motoristaElementsInput.Observacao, "Nova observação")
  cy.pause()
  cy.uploadDocumento("PNG", motoristaElementsInput.FotoMotorista, 0)
  // cy.uploadDocumento("PNG", motoristaElementsInput.FotoCartao, 1)
  
});

it("Usuário realiza cadastro preenchendo somente os campos obrigatórios.", () => {
  motoristaPage.clicarBotao("CadastrarMotorista")
  cy.wait(3000)
      cy.preencherCampoCustom(motoristaElementsInput.Nome, fakerPT_BR.person.fullName());
  motoristaPage.clicarBotaoModal("Modal", "CadastrarMotorista")
  leituraStep.visualizarMensagemModal('Motorista cadastrado com sucesso!')
  
});
 
it("Usuário tenta realizar cadastro com campos em branco", () => {
  motoristaPage.clicarBotao('CadastrarMotorista')
  cy.wait(5000)
  motoristaPage.clicarBotaoModal("Modal", "CadastrarMotorista")
  cy.verificaShielError(['Campo nome é obrigatório'])
})

it("Usuário realiza exportação com sucesso.", () => {
    motoristaPage.clicarBotao("Exportacao")
    // const colunasParaValidar = ['Motorista', 'Status'];
    //       escritaStep.exportarTabela();
    //       cy.wait(5000);
    //       escritaStep.validarDownloadArquivo('motoristas_export.xlsx');
  
    //       cy.task('fileExists', 'cypress/downloads/motoristas_export.xlsx').then((exists) => {
    //           if (exists) {
    //               leituraStep.validarEstruturarExcel(colunasParaValidar);
    //               leituraStep.validarQuantidadeMinimaExportados(10);
    //               leituraStep.validarArquivoBaixado('motoristas_export.xlsx');
    //           } else {
    //               throw new Error('Arquivo Excel não foi encontrado');
    //           }
    //       });
});

})



