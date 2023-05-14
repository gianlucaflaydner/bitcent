import Collection from "@/logic/firebase/db/Collection";
import User from "../user/User";
import Transaction from "./Transaction";
import Data from "@/logic/utils/Data";

export default class TransactionServices {
  private _colecao = new Collection();

  async salvar(transacao: Transaction, usuario: User) {
    return this._colecao.save(
      `financas/${usuario.email}/transacoes`,
      transacao
    );
  }

  async get(usuario: User) {
    const caminho = `financas/${usuario.email}/transacoes`;
    return await this._colecao.consultar(caminho, "data", "asc");
  }

  async exclude(transacao: Transaction, usuario: User) {
    return this._colecao.exclude(
      `financas/${usuario.email}/transacoes`,
      transacao.id
    );
  }

  async getByMonth(usuario: User, data: Date) {
    const caminho = `financas/${usuario.email}/transacoes`;
    return await this._colecao.consultarComFiltros(caminho, [
      { atributo: "data", op: ">=", valor: Data.primeiroDia(data) },
      { atributo: "data", op: "<=", valor: Data.ultimoDia(data) },
    ]);
  }
}
