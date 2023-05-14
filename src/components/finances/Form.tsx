import "dayjs/locale/pt-br";
import Transaction from "@/logic/core/finances/Transaction";
import Money from "@/logic/utils/Money";
import { Button, Group, Radio, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { TransactionType } from "@/logic/core/finances/TransactionType";
import useForm from "@/data/hooks/UseForm";

interface FormularioProps {
  transaction: Transaction;
  save?: (transaction: Transaction) => void;
  exclude?: (transaction: Transaction) => void;
  cancel?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const { data, changeAttribute } = useForm<Transaction>(props.transaction);

  return (
    <div
      className={`
            flex flex-col border border-zinc-700
            rounded-xl overflow-hidden
        `}
    >
      <div className="bg-black py-3 px-7 text-zinc-400">Formulário</div>
      <div className="flex flex-col gap-4 p-4 sm:p-7">
        <TextInput
          label="Descrição"
          value={data.descricao}
          onChange={changeAttribute("descricao")}
        />
        <TextInput
          label="Valor"
          value={Money.format(data.valor)}
          onChange={changeAttribute("valor", Money.unformat)}
        />
        <DatePickerInput
          label="Data"
          value={data.data}
          locale="pt-BR"
          valueFormat="DD/MM/YYYY"
          onChange={changeAttribute("data")}
        />
        <Radio.Group value={data.tipo} onChange={changeAttribute("tipo")}>
          <Group>
            <Radio value={TransactionType.RECEITA} label="Receita" />
            <Radio value={TransactionType.DESPESA} label="Despesa" />
          </Group>
        </Radio.Group>
      </div>
      <div className="flex px-4 sm:px-7 py-4 gap-3 bg-zinc-800">
        <Button
          className="bg-green-500"
          color="green"
          onClick={() => props.save?.(data)}
        >
          Salvar
        </Button>
        <Button className="bg-zinc-500" color="gray" onClick={props.cancel}>
          Voltar
        </Button>
        <div className="flex-1"></div>
        {props.transaction.id && (
          <Button
            className="bg-red-500"
            color="red"
            onClick={() => props.exclude?.(props.transaction)}
          >
            Excluir
          </Button>
        )}
      </div>
    </div>
  );
}
