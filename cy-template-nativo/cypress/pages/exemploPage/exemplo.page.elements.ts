export interface IExemploPageElementsInput {
  CampoTexto: string;
  CampoEmail: string;
  CampoSenha: string;
  Modal: string;
}

export interface IExemploPageElementsButton {
  "BotaoSalvar": string;
  "BotaoCancelar": string;
  "BotaoNovo": string;
}

export interface IExemploPageElementsLink {
  "LinkExemplo": string;
}

export const exemploElementsInput: IExemploPageElementsInput = {
  CampoTexto: 'input[id="campo-texto"]',
  CampoEmail: 'input[type="email"]',
  CampoSenha: 'input[type="password"]',
  Modal: '.modal-exemplo'
};

export const exemploElementsButton: IExemploPageElementsButton = {
  BotaoSalvar: "Salvar",
  BotaoCancelar: "Cancelar",
  BotaoNovo: "Novo Registro",
};

export const exemploElementsLink: IExemploPageElementsLink = {
  LinkExemplo: "Clique aqui"
};
