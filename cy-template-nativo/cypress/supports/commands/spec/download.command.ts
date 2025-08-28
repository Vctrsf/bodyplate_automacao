/// <reference types="cypress"/>

Cypress.Commands.add("validarDownloadExcel", (nomeEsperado: string, timeout: number = 10000) => {
    return cy.task('waitForFileDownload', { 
        fileName: nomeEsperado, 
        downloadsPath: 'cypress/downloads',
        timeout: timeout 
    }).then((fileName: any) => {
        expect(fileName).to.exist;
        cy.log(`Arquivo baixado com sucesso: ${fileName}`);
        Cypress.env('ultimoArquivoBaixado', fileName);
    });
});


Cypress.Commands.add("obterDadosExcel", (nomeArquivo?: string) => {
    const arquivo = nomeArquivo || Cypress.env('ultimoArquivoBaixado') || 'Gestores.xlsx';
    const caminhoArquivo = `cypress/downloads/${arquivo}`;
    
    return cy.task('fileExists', caminhoArquivo).then((exists) => {
        if (!exists) {
            throw new Error(`Arquivo ${arquivo} não encontrado em ${caminhoArquivo}`);
        }
        
        return cy.task('readExcelFile', { filePath: caminhoArquivo }).then((dados: any) => {
            if (!dados || !Array.isArray(dados)) {
                throw new Error(`Dados do Excel inválidos. Tipo: ${typeof dados}`);
            }
            cy.log(`Dados do Excel carregados: ${dados.length} registros`);
            return cy.wrap(dados as any[]);
        });
    });
});

// Cypress.Commands.add("obterDadosExcel", (colunasComparar: string[], nomeArquivo?: string) => {
//     return cy.obterDadosTabelaCompleta(colunasComparar).then((dadosTabela: any[]) => {
//         return cy.wrap(obterDadosExcel(nomeArquivo)).then((dadosExcel: any[]) => {
//             return cy.task('compararDados', {
//                 dadosTabela: dadosTabela,
//                 dadosExcel: dadosExcel,
//                 colunas: colunasComparar
//             }).then((resultado: { sucesso: boolean; diferencas: any[] }) => {
//                 expect(resultado.sucesso).to.be.true;
//                 cy.log('Dados da tabela e Excel coincidem');
                
//                 if (!resultado.sucesso) {
//                     cy.log('Diferenças encontradas:', resultado.diferencas);
//                     throw new Error(`Dados não coincidem: ${JSON.stringify(resultado.diferencas)}`);
//                 }
//                 return resultado;
//             });
//         });
//     });
// });

Cypress.Commands.add("obterDadosTabelaCompleta", (colunas: string[]) => {
    return cy.get('table tbody tr').should('have.length.at.least', 1).then(($linhas) => {
        return cy.get('table thead th').then(($cabecalhos) => {
            const mapeamentoColunas: { [key: string]: number } = {};
            const dadosTabela: any[] = [];
            
            $cabecalhos.each((index, cabecalho) => {
                const textoCabecalho = Cypress.$(cabecalho).text().trim();
                colunas.forEach(coluna => {
                    if (textoCabecalho === coluna || 
                        textoCabecalho.includes(coluna) ||
                        (coluna === 'E-mail' && textoCabecalho === 'Email') ||
                        (coluna === 'Email' && textoCabecalho === 'E-mail')) {
                        mapeamentoColunas[coluna] = index;
                    }
                });
            });
            
            $linhas.each((index, linha) => {
                const linhaDados: any = {};
                const $celulas = Cypress.$(linha).find('td');
                
                colunas.forEach(coluna => {
                    const indiceCelula = mapeamentoColunas[coluna];
                    if (indiceCelula !== undefined && indiceCelula < $celulas.length) {
                        linhaDados[coluna] = Cypress.$($celulas[indiceCelula]).text().trim();
                    }
                });
                
                dadosTabela.push(linhaDados);
            });
            
            cy.log(`Dados da tabela coletados: ${dadosTabela.length} registros`);
            return cy.wrap(dadosTabela as any[]);
        });
    });
});