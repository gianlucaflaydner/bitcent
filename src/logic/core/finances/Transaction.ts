import { TransactionType } from "./TransactionType";

export default interface Transaction {
  id?: string;
  descricao: string;
  valor: number;
  data: Date;
  tipo: TransactionType;
}

export const emptyTransaction: Transaction = {
  descricao: "",
  valor: 0,
  data: new Date(),
  tipo: TransactionType.DESPESA,
};
