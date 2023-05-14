import useTransaction, { ExhibitionType } from "@/data/hooks/UseTransaction";
import { emptyTransaction } from "@/logic/core/finances/Transaction";
import { Button, SegmentedControl } from "@mantine/core";
import { IconLayoutGrid, IconList, IconPlus } from "@tabler/icons-react";
import Header from "../template/Header";
import Content from "../template/Content";
import NotFound from "../template/NotFound";
import Page from "../template/Page";
import Form from "./Form";
import Grid from "./Grid";
import List from "./List";
import MonthYearField from "../template/MonthYearField";
import Summary from "./Summary";

export default function Finances() {
  const {
    date,
    setDate,
    setTipoExibicao,
    tipoExibicao,
    transactions,
    transaction,
    setTransaction,
    save,
    exclude,
  } = useTransaction();

  function renderControls() {
    return (
      <div className="flex justify-between sm:flex-row flex-col gap-2 sm:gap-0" >
        <MonthYearField data={date} dataMudou={setDate} />
        <div className="flex gap-5 sm:justify-normal justify-center items-center">
          <Button
            className="bg-blue-500 "
            leftIcon={<IconPlus />}
            onClick={() => setTransaction(emptyTransaction)}
          >
            Nova transação
          </Button>
          <SegmentedControl
            data={[
              { label: <IconList />, value: "lista" },
              { label: <IconLayoutGrid />, value: "grade" },
            ]}
            onChange={(tipo) => setTipoExibicao(tipo as ExhibitionType)}
          />
        </div>
      </div>
    );
  }

  function renderTransactions() {
    const props = { transactions, selectTransaction: setTransaction };
    return tipoExibicao === "lista" ? <List {...props} /> : <Grid {...props} />;
  }

  return (
    <Page>
      <Header />
      <Content className="gap-5">
        <Summary transactions={transactions} />
        {renderControls()}
        {transaction ? (
          <Form
            transaction={transaction}
            save={save}
            exclude={exclude}
            cancel={() => setTransaction(null)}
          />
        ) : transactions.length > 0 ? (
          renderTransactions()
        ) : (
          <NotFound>Nenhuma transação encontrada</NotFound>
        )}
      </Content>
    </Page>
  );
}
