export interface IMotoristaPageElementsInput {
  Email: string;
  Senha: string;
  Nome: string;
  Observacao: string,
  FotoMotorista: string
  FotoCartao: string
  Modal: string;
}

export interface IMotoristaPageElementsButton {
  "Entrar": string;
  "Cadastros": string;
  "Motoristas": string
  CadastrarMotorista: string
  Exportacao: string;
  FinalizarCadastro: string;
  

}

export interface IMotoristaPageElementsLink {


}

export const motoristaElementsInput: IMotoristaPageElementsInput = {
  Email: 'input[label="E-mail ou CPF"]',
  Senha: 'input[type="password"]',
  Nome: 'app-custom-input[label="Nome do motorista"]',
  Observacao:'app-custom-input[label="Observações"]',
  FotoMotorista: 'app-custom-file-input[ng-reflect-name="fotoMotorista"]',
  FotoCartao: 'app-custom-file-input input[ng-reflect-name="fotoCartao"]',
  Modal: 'app-modal-cadastro-motorista'
};

export const motoristaElementsButton: IMotoristaPageElementsButton = {
  "Entrar": "Entrar",
  Cadastros: "Cadastros",
  Motoristas: "Motoristas",
  CadastrarMotorista: "Cadastrar motorista",
  Exportacao: "Gerar planilha",
  FinalizarCadastro: "app-custom-button[class='save-button ng-star-inserted']",
};
