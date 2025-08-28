/// <reference types="cypress"/>

Cypress.Commands.add("geraCnpj", () => {
  const gerarDigito = (cnpjParcial: number[]): number => {
    const pesos =
      cnpjParcial.length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const soma = cnpjParcial.reduce((acc, num, i) => acc + num * pesos[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const cnpjList = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).concat([0, 0, 0, 1]);

  cnpjList.push(gerarDigito(cnpjList));
  cnpjList.push(gerarDigito(cnpjList));

  const formartarCnpj = (numeros: Array<Number>): string => {
    const cnpj: string = numeros.join("");

    Cypress.env("cnpj", cnpj);

    return cnpj;
  };

  return cy.wrap(formartarCnpj(cnpjList));
});
