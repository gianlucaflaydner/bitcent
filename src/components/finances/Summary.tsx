import { TransactionType } from '@/logic/core/finances/TransactionType'
import Transaction from '@/logic/core/finances/Transaction'
import Money from '@/logic/utils/Money'
import { IconArrowsDoubleSwNe, IconCash, IconCreditCard } from '@tabler/icons-react'
import SummaryItem from './SummaryItem'

interface SummaryProps {
    transactions: Transaction[]
    className?: string
}

export default function Summary(props: SummaryProps) {
    const totalizar = (total: number, r: Transaction) => total + r.valor

    const receitas = props.transactions
        .filter((r) => r.tipo === TransactionType.RECEITA)
        .reduce(totalizar, 0)

    const despesas = props.transactions
        .filter((r) => r.tipo === TransactionType.DESPESA)
        .reduce(totalizar, 0)

    const total = receitas - despesas

    return (
        <div className={`
            grid grid-cols-1 md:grid-cols-3 gap-4
        `}>
            <SummaryItem
                titulo='Receitas'
                valor={receitas}
                icone={<IconCash />}
                iconeClassName="text-green-500"
            />
            <SummaryItem
                titulo='Despesas'
                valor={despesas}
                icone={<IconCreditCard />}
                iconeClassName="text-red-500"
            />
            <SummaryItem
                titulo='Total'
                valor={total}
                icone={<IconArrowsDoubleSwNe />}
                iconeClassName="text-yellow-500"
                valorClassName={total > 0 ? 'text-green-500' : total < 0 ? 'text-red-500' : ''}
            />
        </div>
    )
}