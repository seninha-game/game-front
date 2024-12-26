import { formatCurrency } from "./formatCurrency";

export function prizesCentsToReal(prizes: any) { //todo typagem
        let newObj: any = {
                sena: formatCurrency(prizes.sena / 100),
                quina: formatCurrency(prizes.quina / 100),
                quadra: formatCurrency(prizes.quadra / 100),
        };

        return newObj;
}
