import { IPageModel } from "../../supports/models/pagesModel/Ipages.model";
import {
  equipeElementsButton,
  equipeElementsInput,
  IEquipePageElementsInput,
  IEquipePageElementsButton,
  IEquipePageElementsLink,
} from "./equipes.page.elements";

export class EquipesPage
  implements
    IPageModel<
      IEquipePageElementsInput,
      IEquipePageElementsButton,
      IEquipePageElementsLink
    >
{
  public verificarValorPreenchido(
    campo: keyof IEquipePageElementsInput,
    valor: string
  ): void {
    cy.verificaCampoPreenchido(equipeElementsInput[campo], valor);
  }

  public escreverCampo(
    campo: keyof IEquipePageElementsInput,
    valor: string,
    forcarEnter: boolean = false
  ) {
    cy.escreverValorNoCampo(
      equipeElementsInput[campo],
      String(valor),
      forcarEnter
    );
  }

  public limparCampo(campo: keyof IEquipePageElementsInput) {
    cy.get(equipeElementsInput[campo]).clear({
      force: true,
    });
  }

  public clicarBotao(nomeBotao: keyof IEquipePageElementsButton) {
    cy.buscarBotaoPorTexto(equipeElementsButton[nomeBotao],).click({
      force: true,
    });
  }
}