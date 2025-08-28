/// <reference types="cypress"/>

Cypress.Commands.add("expandirMenu", () => {
  cy.contains('span.material-symbols-outlined', 'home').click();
});

Cypress.Commands.add("clicarMenu", (nomeMenu: string) => {
cy.get('[class="menu-link"]').contains(nomeMenu).click();
});

Cypress.Commands.add("clicarSubMenu", (nomeSubMenu: string) => {
  cy.get('[class="submenu-text"]')
    .contains(nomeSubMenu)
    .click();
});
