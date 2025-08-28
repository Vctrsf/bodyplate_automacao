/// <reference types="cypress"/>

Cypress.Commands.add("buscarBotaoPorTexto", (textoBotao: string, index?: number) => {
  if(index != undefined){
    return cy.contains("app-custom-button, button", textoBotao).eq(index);
  } else {
    return cy.contains("app-custom-button, button", textoBotao)
  }
});

Cypress.Commands.add("clicarFiltroRefinado", () => {
  cy.get(
    "app-filter-dropdown,".concat(
      "app-filter-dropdown-area-map button,",
      "app-filter-dropdown-user button,",
      "app-filter-dropdown-user-control button"
    )
  ).click();
});

Cypress.Commands.add(
  "clicarBotaoModal",
  (seletorModal: string, textoBotao: string, index?: number) => {
    if(index != undefined) {
      cy.get(seletorModal)
            .contains('button', textoBotao)
            .eq(index)
            .should('be.visible')
            .click();
    } else {
        cy.get(seletorModal)
            .contains('button', textoBotao)
            .should('be.visible')
            .click();
    }
  }
);



