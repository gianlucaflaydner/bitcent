import Id from "@/logic/core/common/Id";
import { TransactionType } from "@/logic/core/finances/TransactionType";
import Transaction from "@/logic/core/finances/Transaction";

const fakeTransactions: Transaction[] = [
  {
    id: Id.novo(),
    descricao: "Salário",
    data: new Date(2023, 4, 1),
    valor: 7123.34,
    tipo: TransactionType.RECEITA,
  },
  {
    id: Id.novo(),
    descricao: "Conta de Luz",
    valor: 320.0,
    data: new Date(2023, 4, 3),
    tipo: TransactionType.DESPESA,
  },
  {
    id: Id.novo(),
    descricao: "Aluguel + Cond.",
    valor: 1817.59,
    data: new Date(2023, 4, 3),
    tipo: TransactionType.DESPESA,
  },
  {
    id: Id.novo(),
    descricao: "Cartão de Crédito",
    valor: 2200.0,
    data: new Date(2023, 4, 10),
    tipo: TransactionType.DESPESA,
  },
  {
    id: Id.novo(),
    descricao: "Conta de Água",
    valor: 174.35,
    data: new Date(2023, 4, 8),
    tipo: TransactionType.DESPESA,
  },
  {
    id: Id.novo(),
    descricao: "Mensalidade MBA",
    valor: 750.0,
    data: new Date(2023, 4, 2),
    tipo: TransactionType.DESPESA,
  },

  {
    id: Id.novo(),
    descricao: "Investimentos",
    data: new Date(2023, 4, 1),
    valor: 2123.34,
    tipo: TransactionType.RECEITA,
  },
];

export default fakeTransactions;
