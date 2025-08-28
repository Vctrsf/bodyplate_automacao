/// <reference types="cypress" />

export class LeituraStep {
  //Modal de mensagem.
  visualizarMensagemModal(mensagem: string) {
    cy.wait(500);
    cy.verificarMensagemModal(mensagem);
  }

  visualizarInformacaoToast(mensagem: string) {
    cy.wait(500);
    cy.verificaMensagemToast(mensagem);
  }

  visualizarMensagemValidacao(mensagem: string[]) {
    cy.wait(500);
    cy.verificaShielError(mensagem);
  }

  visualizarModal(nomeModal: string) {
    cy.wait(500);
    cy.verificaModalExistente(nomeModal);
  }

  verificarValorNaColuna(coluna: string, valor: string) {
    cy.verificarValorLista(coluna, valor);
  }

  //Validações de Download
  validarArquivoBaixado(nomeArquivo: string) {
    cy.wait(500);
    const ultimoArquivo = Cypress.env('ultimoArquivoBaixado');
    expect(ultimoArquivo).to.contain(nomeArquivo.replace('.xlsx', ''));
    cy.log(`Arquivo validado: ${ultimoArquivo}`);
  }

  validarDadosExportados(colunas: string[], nomeArquivo?: string) {
    cy.wait(1000);
    cy.compararTabelaComExcel(colunas, nomeArquivo);
  }

  validarEstruturarExcel(colunas: string[], nomeArquivo?: string) {
    cy.obterDadosExcel(nomeArquivo).then((dadosExcel) => {
      expect(dadosExcel).to.have.length.greaterThan(0);
      cy.log(`Excel contém ${dadosExcel.length} registros`);

      if (dadosExcel.length > 0) {
        const colunasExistentes = Object.keys(dadosExcel[0]);
        cy.log('Colunas encontradas no Excel:', colunasExistentes);

        colunas.forEach(coluna => {
          const colunaEncontrada = colunasExistentes.find(col => {
            const colLower = col.toLowerCase().replace(/[-_\s]/g, '');
            const colunaLower = coluna.toLowerCase().replace(/[-_\s]/g, '');
            return colLower === colunaLower;
          });

          expect(colunaEncontrada, `Coluna '${coluna}' não encontrada. Colunas disponíveis: ${colunasExistentes.join(', ')}`).to.exist;
          cy.log(`Coluna '${coluna}' encontrada como '${colunaEncontrada}' no Excel`);
        });
      }

      cy.log('Estrutura do Excel validada com sucesso');
    });
  }

  validarQuantidadeMinimaExportados(quantidadeMinima: number, nomeArquivo?: string) {
    cy.obterDadosExcel(nomeArquivo).then((dados) => {
      expect(dados).to.have.length.greaterThan(quantidadeMinima - 1);
      cy.log(`Excel contém ${dados.length} registros (mínimo esperado: ${quantidadeMinima})`);
    });
  }

  validarDadosExportadosCompletos(colunas: string[], nomeArquivo?: string) {
    cy.wait(1000);
    cy.compararTabelaComExcel(colunas, nomeArquivo);
  }

  obterDadosDoExcel(nomeArquivo?: string) {
    return cy.obterDadosExcel(nomeArquivo);
  }

  validarDadosExportadosFiltrados(dadosTabelaFiltrada: any[], filtroAplicado: string, colunaFiltro: string, nomeArquivo?: string) {
    cy.wait(1000);

    return cy.then(() => {

      if (!dadosTabelaFiltrada || !Array.isArray(dadosTabelaFiltrada)) {
        throw new Error(`Dados da tabela filtrada inválidos. Recebido: ${typeof dadosTabelaFiltrada}, Valor: ${JSON.stringify(dadosTabelaFiltrada)}`);
      }

      if (dadosTabelaFiltrada.length === 0) {
        throw new Error('Nenhum dado foi encontrado na tabela filtrada');
      }

      cy.log(`Validando dados filtrados: ${dadosTabelaFiltrada.length} registros da tabela`);

      return cy.obterDadosExcel(nomeArquivo).then((dadosExcel) => {
        if (!dadosExcel || !Array.isArray(dadosExcel)) {
          throw new Error('Dados do Excel não foram carregados corretamente');
        }

        expect(dadosExcel).to.have.length(dadosTabelaFiltrada.length);
        cy.log(`Quantidade de registros confere: ${dadosExcel.length} registros`);

        dadosExcel.forEach((linha, index) => {
          const valorColuna = linha[colunaFiltro] || linha['Nome'];

          if (valorColuna) {
            expect(valorColuna.toString().toLowerCase()).to.include(filtroAplicado.toLowerCase());
            cy.log(`Linha ${index + 1}: "${valorColuna}" contém "${filtroAplicado}"`);
          } else {
            cy.log(`Linha ${index + 1}: Coluna "${colunaFiltro}" não encontrada`);
          }
        });

        cy.log('Validação de dados filtrados concluída com sucesso');
      });
    });
  }
}
