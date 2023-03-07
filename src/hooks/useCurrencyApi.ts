import useHttp from "./useHttp"
import {useEffect, useState} from "react"
import {CurrencyHook, FetchCurrencyRates} from "../types/currency.types"
import {ObjWithStrKeys} from "../types/global.types"
import {HttpMethod} from "../types/http.types"


const useCurrencyApi: CurrencyHook = () => {
   const apiBase = 'https://api.apilayer.com/exchangerates_data'
   // In real app move it to config.env,
   // it's here now to make app work in every environment
   const apiKey = 'oz4HzD4Q1G8sg3zwvK1BC7WD3facSPm8'

   const { request, status, loading } = useHttp()

   const [currencySymbols, setCurrencySymbols] = useState<ObjWithStrKeys>({})

   const fetchRates: FetchCurrencyRates = async (base, symbol) => {
      const res = await request(
         `${apiBase}/latest?base=${base}&symbols=${symbol}`,
         HttpMethod.GET,
         null,
         { "apikey": apiKey }
      )

      if (!res?.rates)
         return {}

      return res.rates
   }

   useEffect(() => {
      const fetchAllCurrencies = async () => {
         const res = await request(
            `${apiBase}/symbols`,
            HttpMethod.GET,
            null,
            { "apikey": apiKey }
            )

         if (res?.symbols)
            setCurrencySymbols(res.symbols)
      }

      fetchAllCurrencies()
   }, [request])

   return { status, currencySymbols, fetchRates, loading }
}

export default useCurrencyApi