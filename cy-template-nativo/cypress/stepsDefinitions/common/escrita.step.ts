/// <reference types="cypress" />
import { IPageModel } from "../../supports/models/pagesModel/Ipages.model";

let funcionalidadeAtual: FuncionalidadeType;

beforeEach(() => {
  funcionalidadeAtual = Cypress.spec.name.split(".")[0] as FuncionalidadeType;
});

export class EscritaStep {
  constructor(private page: IPageModel<any, any, any>) {}

  // Métodos associados a inputs.
  preencheCampoValor<T>(campo: keyof T, valor: string) {
    if (valor === "") return;
    cy.wait(500);
    if (this.page.escreverCampo) this.page.escreverCampo(campo, valor);
  }

  selecionaOpcaoValor<T>(campo: keyof T, valor: string) {
    if (valor === "") return;
    cy.wait(500);
    if (this.page.selecionarValor) this.page.selecionarValor(campo, valor);
  }

  limparCampos<T>(campo: keyof T) {
    cy.wait(500);
    if (campo === "") return;
    if (this.page.limparCampo) this.page.limparCampo(campo);
  }

  clicarRadioButton<T>(nomeRadio: keyof T) {
    cy.wait(500);
    if (this.page.clicarRadioButton) this.page.clicarRadioButton(nomeRadio);
  }

  clicarCheckBox<T>(nomeCheckBox: keyof T) {
    cy.wait(500);
    if (this.page.clicarCheckBox) this.page.clicarCheckBox(nomeCheckBox);
  }

  aguardarSegundos(periodo: number) {
    cy.wait(periodo * 1000);
  }

  verificarRadioSelecionado<T>(nomeRadio: keyof T) {
    if (this.page.verificarRadioSelecionado)
      this.page.verificarRadioSelecionado(nomeRadio);
  }

  verificarOpcaoSelecionada<T>(campo: keyof T, valor: string) {
    if (this.page.verificarOpcaoSelecionada)
      this.page.verificarOpcaoSelecionada(campo, valor);
  }

  verificarValorPreenchido<T>(campo: keyof T, valor: string) {
    if (this.page.verificarValorPreenchido)
      this.page.verificarValorPreenchido(campo, valor);
  }

  verificarCampoDesabilitado<T>(campo: keyof T) {
    if (this.page.verificarCampoDesabilitado)
      this.page.verificarCampoDesabilitado(campo);
  }

  // Botões
  clicarBotao<T>(nomeBotao: keyof T) {
    cy.wait(500);
    if (this.page.clicarBotao) this.page.clicarBotao(nomeBotao);
  }

  clicarDropdownFiltro() {
    cy.wait(500);
    cy.clicarFiltroRefinado();
  }

  // Links
  clicarLink<T>(nomeLink: keyof T) {
    cy.wait(500);
    if (this.page.clicarLink) this.page.clicarLink(nomeLink);
  }

  // Menu
  expandirMenuLateral() {
    cy.wait(500);
    cy.expandirMenu();
  }

  selecionarMenu(nomeMenu: string) {
    cy.wait(500);
    cy.clicarMenu(nomeMenu);
  }

  selecionarSubmenu(nomeSubMenu: string) {
    cy.wait(500);
    cy.clicarSubMenu(nomeSubMenu);
  }

  // Ações de ícone
  clicarIcone(acao: AcoesListaType) {
    cy.acaoLista(acao);
  }

  // Upload de documento
  realizaruploadDocumento(tipoDocumento: TipoDocumentosType, campo: string) {
    if (this.page.uploadDocumento)
      this.page.uploadDocumento(campo, tipoDocumento);
  }

  // Massa REST API
  cadastrarMassaAtual() {
    cy.cadastrarMassa(funcionalidadeAtual);
  }

  excluirMassaAtual() {
    cy.excluirMassa(funcionalidadeAtual);
  }

  // Colapses
  selecionarOpcoesColapseModulo(modulo: string, dataTable: any) {
    const opcoes = dataTable.hashes();

    cy.abrirOuFecharColapse(modulo, "abro");

    opcoes.forEach((nomeCheckBox: any) => {
      if (this.page.clicarCheckBox)
        this.page.clicarCheckBox(nomeCheckBox.OPCAO);
    });

    cy.abrirOuFecharColapse(modulo, "fecho");
  }

   // Download e exportação
  exportarTabela() {
    cy.wait(500);
    if (this.page.clicarBotao) {
      this.page.clicarBotao('Gerar planilha');
    } else {
      cy.contains('button', 'Gerar planilha').click();
    }
  }

  validarDownloadArquivo(nomeArquivo: string, timeout: number = 10000) {
    return cy.validarDownloadExcel(nomeArquivo, timeout);
  }
}
