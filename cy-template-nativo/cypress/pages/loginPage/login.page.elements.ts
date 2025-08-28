export interface ILoginServicePageElementsInput {
  Email: string;
  Senha: string;
}

export interface ILoginServicePageElementsBotao {
  "Entrar": string;
}

export interface ILoginServicePageElementsLink {}

export const loginElementInput: ILoginServicePageElementsInput = {
  Email: 'input[type="text"]',
  Senha: 'input[type="password"]',
};

export const loginElementBotao: ILoginServicePageElementsBotao = {
  "Entrar": "Entrar",
};
