/// <reference types="cypress"/>

Cypress.Commands.add("geraCpf", () => {
  const gerarDigito = (cpfParcial: number[]): number => {
    const soma = cpfParcial.reduce((acc, num, index) => {
      const peso = cpfParcial.length + 1 - index;
      return acc + num * peso;
    }, 0);

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const cpfList = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  );

  cpfList.push(gerarDigito(cpfList));
  cpfList.push(gerarDigito(cpfList));

  const formartarCpf = (numeros: Array<Number>): string => {
    const cpf: string = numeros.join("");

    localStorage.setItem("cpfGeradoCypress", cpf);
    Cypress.env("cpf", cpf);

    return cpf;
  };

  return cy.wrap(formartarCpf(cpfList));
});
