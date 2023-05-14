import Transaction from "@/logic/core/finances/Transaction";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";
import services from "@/logic/core";

export type ExhibitionType = "lista" | "grade";

export default function UseTransaction() {
  const { user } = useContext(AuthenticationContext);
  const [date, setDate] = useState<Date>(new Date());
  const [tipoExibicao, setTipoExibicao] = useState<ExhibitionType>("lista");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const getTransactions = useCallback(
    async function () {
      if (!user) return;
      const transactions = await services.transaction.getByMonth(user, date);
      setTransactions(transactions);
    },
    [user, date]
  );

  useEffect(() => {
    getTransactions();
  }, [getTransactions, date]);

  async function save(transaction: Transaction) {
    if (user != null) {
      services.transaction.salvar(transaction, user);
    }
    setTransaction(null);
    await getTransactions();
  }

  async function exclude(transaction: Transaction) {
    if (!user) return;
    const otherTransactions = transactions.filter(
      (t) => t.id !== transaction.id
    );
    setTransactions(otherTransactions);
    await services.transaction.exclude(transaction, user);
    setTransaction(null);
    await getTransactions();
  }

  return {
    transactions,
    date,
    setDate,
    transaction,
    save,
    exclude,
    setTransaction,
    tipoExibicao,
    setTipoExibicao,
  };
}
