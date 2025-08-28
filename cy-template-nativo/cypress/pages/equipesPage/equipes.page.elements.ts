export interface IEquipePageElementsInput {
  Email: string;
  Senha: string;
}

export interface IEquipePageElementsButton {
  "Entrar": string;
  "Cadastros": string;
  "Equipes": string
  "Cadastrar Equipe": string
}

export interface IEquipePageElementsLink {}

export const equipeElementsInput: IEquipePageElementsInput = {
  Email: 'input[label="E-mail ou CPF"]',
  Senha: 'input[type="password"]',
};

export const equipeElementsButton: IEquipePageElementsButton = {
    "Entrar": "Entrar",
    Cadastros: "Cadastros",
    Equipes: "Equipes",
    "Cadastrar Equipe": "Cadastrar equipe",
};
