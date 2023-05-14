export default class Cellphone {
  private static _padrao = "(??) ?????-????";

  static formatar(valor: string): string {
    const nums = Cellphone.desformatar(valor).split("");
    return nums
      .reduce((formatado: string, num: string) => {
        return formatado.replace("?", num);
      }, Cellphone._padrao)
      .split("?")[0]
      .trim()
      .replace(/[()-]$/, "");
  }

  static desformatar(valor: string): string {
    return valor.replace(/[^0-9]+/g, "");
  }
}
