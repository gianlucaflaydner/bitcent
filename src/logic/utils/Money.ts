export default class Money{
    private static _lingua = "pt-BR"
    private static _moeda = "BRL"


    static format(num: number): string {
        return (num ?? 0).toLocaleString(Money._lingua, {
            style: "currency", currency: Money._moeda
        })
    }

    static unformat(valor: string): number {
        const nums = valor.replace(/[^0-9]+/g, "")
        const i = nums.length - 2
        return Number(`${nums.substring(0, i)}.${nums.substring(i)}`)
    }
}