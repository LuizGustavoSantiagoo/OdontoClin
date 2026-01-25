import { format } from "path";

const CURRENCY_FORMATER = new Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 0
})

export function convertRealToCents(amount: string) {
    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    const priceInCents = Math.round(numericPrice * 100);

    return priceInCents;
}

export function formatCurrency(n: number) {
    return CURRENCY_FORMATER.format(n)
}