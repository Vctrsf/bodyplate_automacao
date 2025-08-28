/// <reference types="cypress"/>

let imagemJpg: string = "cypress/fixtures/upload/*.jpg";
let imagemPng: string = "cypress/fixtures/foto.png";
let documentoJson: string = "cypress/fixtures/upload/*.json";
let documentoPdf: string = "cypress/fixtures/upload/*.pdf";

Cypress.Commands.add(
  "uploadDocumento",
  (tipoDocumento: TipoDocumentosType, seletor: string, index?: number) => {
    const tipoDocumentoMap: Record<TipoDocumentosType, string> = {
      JPG: imagemJpg,
      PNG: imagemPng,
      JSON: documentoJson,
      PDF: documentoPdf,
    };
  
    cy.get(seletor).should('exist').selectFile(tipoDocumentoMap[tipoDocumento], {
      force: true,
      
    });
  }

 
);
