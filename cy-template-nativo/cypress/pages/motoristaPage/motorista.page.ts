import { IPageModel } from "../../supports/models/pagesModel/Ipages.model";
import {
  motoristaElementsButton,
  motoristaElementsInput,
  IMotoristaPageElementsInput,
  IMotoristaPageElementsButton,
  IMotoristaPageElementsLink,
} from "./motorista.page.elements";

export class MotoristasPage
  implements
    IPageModel<
      IMotoristaPageElementsInput,
      IMotoristaPageElementsButton,
      IMotoristaPageElementsLink
    >
{
  public verificarValorPreenchido(
    campo: keyof IMotoristaPageElementsInput,
    valor: string
  ): void {
    cy.verificaCampoPreenchido(motoristaElementsInput[campo], valor);
  }

  public escreverCampo(
    campo: keyof IMotoristaPageElementsInput,
    valor: string,
    forcarEnter: boolean = false
  ) {
    cy.escreverValorNoCampo(
      motoristaElementsInput[campo],
      String(valor),
      forcarEnter
    );
  }

  public limparCampo(campo: keyof IMotoristaPageElementsInput) {
    cy.get(motoristaElementsInput[campo]).clear({
      force: true,
    });
  }

  public clicarBotao(nomeBotao: keyof IMotoristaPageElementsButton, index?: number) {
    cy.buscarBotaoPorTexto(motoristaElementsButton[nomeBotao], index).click({
      force: true,
    });
  }

  public clicarBotaoModal(modal: keyof IMotoristaPageElementsInput, nomeBotao: keyof IMotoristaPageElementsButton, index?: number) {
    cy.clicarBotaoModal(motoristaElementsInput[modal], motoristaElementsButton[nomeBotao], index)
  };

  public geraNome(genero?: 'masculino' | 'feminino' | 'aleatorio'){
    cy.get(motoristaElementsInput.Nome).type('aleatorio')
  }
}