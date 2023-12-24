export interface Fatura {
    id: number,
    numero_cliente: string,
    mes_referencia: string,
    energia_eletrica_quantidade: number,
    energia_eletrica_valor: number,
    energia_scee_quantidade: number,
    energia_scee_valor: number,
    energia_compensada_quantidade: number,
    energia_compensada_valor: number,
    contrib_ilum_publica: number
}