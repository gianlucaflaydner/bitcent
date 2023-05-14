export default class Text {
    static entre(valor: string, min: number, max: number, trim: boolean = true): boolean {
        const valorFinal = (trim ? valor?.trim?.() : valor) ?? ''
        return valorFinal.length >= min && valorFinal.length <= max
    }
}