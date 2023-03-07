import {HttpStatus} from "./http.types"
import {ObjWithStrKeys} from "./global.types"


export interface CurrencyRates { [key: string]: number }

export type FetchCurrencyRates = (base: string, symbol: string) => Promise<CurrencyRates>

export type CurrencyHook = () => {
   currencySymbols: ObjWithStrKeys,
   status: HttpStatus,
   fetchRates: FetchCurrencyRates
   loading: boolean
}