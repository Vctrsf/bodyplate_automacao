import { IPageModel } from "../../supports/models/pagesModel/Ipages.model";
import {
  exemploElementsButton,
  exemploElementsInput,
  IExemploPageElementsInput,
  IExemploPageElementsButton,
  IExemploPageElementsLink,
} from "./exemplo.page.elements";

export class ExemploPage
  implements
    IPageModel<
      IExemploPageElementsInput,
      IExemploPageElementsButton,
      IExemploPageElementsLink
    >
{
  public verificarValorPreenchido(
    campo: keyof IExemploPageElementsInput,
    valor: string
  ): void {
    cy.verificaCampoPreenchido(exemploElementsInput[campo], valor);
  }

  public escreverCampo(
    campo: keyof IExemploPageElementsInput,
    valor: string,
    forcarEnter: boolean = false
  ) {
    cy.escreverValorNoCampo(
      exemploElementsInput[campo],
      String(valor),
      forcarEnter
    );
  }

  public limparCampo(campo: keyof IExemploPageElementsInput) {
    cy.get(exemploElementsInput[campo]).clear({
      force: true,
    });
  }

  public clicarBotao(nomeBotao: keyof IExemploPageElementsButton, index?: number) {
    cy.buscarBotaoPorTexto(exemploElementsButton[nomeBotao], index).click({
      force: true,
    });
  }

  public clicarBotaoModal(modal: keyof IExemploPageElementsInput, nomeBotao: keyof IExemploPageElementsButton, index?: number) {
    cy.clicarBotaoModal(exemploElementsInput[modal], exemploElementsButton[nomeBotao], index)
  };
}
