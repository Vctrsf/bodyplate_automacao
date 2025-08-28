/// <reference types="cypress" />

declare namespace Cypress {
  interface ServicesCommands {
    loginUsuario(
      emailUsuario?: string,
      senhaUsuario?: string
    ): Chainable<Element>;
    getToken(): Chainable<string>;
    cadastrarMassa(massa: FuncionalidadeType): Chainable<void>;
    excluirMassa(massa: FuncionalidadeType): Chainable<void>;
    pesquisarMassa(
      massa: FuncionalidadeType,
      body?: any,
      params?: any
    ): Chainable<any>;
    buscaTesteAtual(): Chainable<void>;
    uploadDocumento(
      tipoDocumento: TipoDocumentosType,
      seletor: string,
      index: number
    ): Chainable<void>;
    abrirOuFecharColapse(
      modulo: string,
      acaoColapse: AcaoColapseType
    ): Chainable<void>;
    mudarAba(nomeAba: string): Chainable<void>;
    geraCpf(): Chainable<string>;
    geraCnpj(): Chainable<string>;
    geraNome(genero?: 'masculino' | 'feminino' | 'aleatorio'): Chainable<string>;
    obterNomeGerado(): Chainable<string>;

  }

  interface DownloadCommands{
    validarDownloadExcel(nomeArquivo: string, timeout?: number): Chainable<any>;
    obterDadosExcel(nomeArquivo?: string): Chainable<any[]>;
    lerDadosExcel(colunasComparar: string[], nomeArquivo?: string): Chainable<string>
    obterDadosTabelaCompleta(colunas: string[]): Chainable<any[]>;
    compararTabelaComExcel(colunas: string[], nomeArquivo?: string): Chainable<void>;
    
  }

  interface InputCommands {
    escreverValorNoCampo(
      seletor: string,
      textoPreenchimento: string,
      forcarEnter?: boolean
    ): Chainable<JQuery<HTMLElement>>;
    selecionarValorNoCampo(
      seletor: string,
      textoPreenchimento: string
    ): Chainable<void>;
    verificarValorCampo(
      tipoCampo: InputType,
      seletor: string,
      valor: string
    ): Chainable<JQuery<HTMLElement>>;
    preencherCampoCustom(seletor: string, texto: string): Chainable<void>
    verificaShielError(mensagens: string[]): Chainable<void>;
    verificaRadioButtonSelecionado(seletor: string): Chainable<void>;
    verificaCampoPreenchido(seletor: string, valor: string): Chainable<void>;
    verificarCampoDesabilitado(seletor: string): Chainable<void>;
    verificarOpcaoSelecionada(seletor: string, valor: string): Chainable<void>;
  }

  interface ButtonCommands {
    buscarBotaoPorTexto(nomeBotao: string, index?: number): Chainable<JQuery<HTMLElement>>;
    clicarFiltroRefinado(): Chainable<void>;
    clicarBotaoModal(seletorPai: string, textoBotao: string, index?: number): Chainable<void>
  }

  interface ModalCommands {
    verificarMensagemModal(mensagem: string): Chainable<void>;
    verificaMensagemToast(mensagem: string): Chainable<void>;
    verificaModalExistente(nomeModal: string): Chainable<void>;
  }

  interface ListCommands {
    verificarValorLista(coluna: string, valor: string): Chainable<void>;
    acaoLista(acao: AcoesListaType): Chainable<void>;
    verificarColunasTabela(colunas: string[]): Chainable<void>;
    verificarDadosTabela(): Chainable<void>;
    verificarTabelaCompleta(colunas: string[]): Chainable<void>;
  }

  interface LinkCommands {
    obterLinkPorTexto(textoLink: string): Chainable<JQuery<HTMLAnchorElement>>;
  }

  interface MenuCommands {
    expandirMenu(): Chainable<void>;
    clicarMenu(menu: string): Chainable<void>;
    clicarSubMenu(subMenu: string): Chainable<void>;
  }

  interface SqlQueryCommand {
    sqlServer(query: string): Chainable<any>;
  }

  interface DbCommands {
    dbDelete(): Chainable<any>;
  }

  // Unificação no Chainable
  interface Chainable
    extends ServicesCommands,
      InputCommands,
      ButtonCommands,
      DownloadCommands,
      ModalCommands,
      ListCommands,
      LinkCommands,
      MenuCommands,
      SqlQueryCommand,
      DbCommands {}
}
