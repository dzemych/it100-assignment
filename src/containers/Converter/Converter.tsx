import {ChangeEvent, FC, useEffect, useMemo, useState} from 'react'
import {Box, CircularProgress, Grid, SelectChangeEvent} from "@mui/material"
import TextSelect from "../../components/UI/TextSelect"
import useCurrencyApi from "../../hooks/useCurrencyApi"
import Input from "../../components/UI/Input"
import {HttpStatus} from "../../types/http.types"


const Converter: FC = () => {
   const {currencySymbols, fetchRates, status, loading} = useCurrencyApi()

   const [lastSelectedCurrency, setLastSelectedCurrency] = useState<null | number>(null)
   const [selectedCurrency, setSelectedCurrency] = useState<string[]>(['UAH', 'USD'])
   const [currencyValues, setCurrencyValues] = useState<string[]>(['', ''])

   const [currentRate, setCurrentRate] = useState(0)

   const selectList = useMemo(() => {
      const keysList = Object.keys(currencySymbols)

      if (keysList.length)
         return keysList.map(key => ({
            value: key,
            text: `${key} | ${currencySymbols[key]}`
         }))

      return []
   }, [currencySymbols])

   const changeCurrencyValues = (key: number, val: string, rate: number = currentRate) => {
      setCurrencyValues(prev => {
         const newValues = [...prev]

         newValues[key] = val.toString()

         if (key === 0 && rate)
            if (!val)
               newValues[1] = ''
            else
               newValues[1] = (parseFloat(val) * rate).toFixed(3).toString()

         if (key === 1 && rate)
            if (!val)
               newValues[0] = ''
            else
               newValues[0] = (parseFloat(val) / rate).toFixed(3).toString()

         return newValues
      })
   }

   const selectChangeHandler = (key: number) => async (e: SelectChangeEvent<string>) => {
      await setLastSelectedCurrency(key)

      setSelectedCurrency(prev => {
         const newVal = [...prev]
         newVal[key] = e.target.value

         return newVal
      })
   }

   const valueChangeHandler = (key: number) => (e: ChangeEvent<HTMLInputElement>) => {
      changeCurrencyValues(key, e.target.value)
   }

   // Get current currency rate (value 1 unit of currency number one to second currency)
   useEffect(() => {
      const fetchCurrentRate = async () => {
         const res = await fetchRates(selectedCurrency[0], selectedCurrency[1])
         const newRate = res[selectedCurrency[1]]

         setCurrentRate(newRate)

         // If currency has changed, convert again
         if (lastSelectedCurrency !== null) {
            if (lastSelectedCurrency === 0)
               changeCurrencyValues(1, currencyValues[1], newRate)

            if (lastSelectedCurrency === 1)
               changeCurrencyValues(0, currencyValues[0], newRate)
         }
      }

      fetchCurrentRate()
   }, [selectedCurrency])

   return (
      <Box m={'0 auto'} sx={{ maxWidth: '100%' }}>
         <h1>Currency converter</h1>

         { (status !== HttpStatus.INIT && loading) &&
            <Box sx={{ display: 'flex', margin: '0 auto 10px' }}>
               <CircularProgress />
            </Box>
         }

         <Grid container flexDirection='column' spacing={2} maxWidth={'100%'}>
            <Grid item width={'100%'}>
               <Grid container flexDirection='column'>
                  <TextSelect
                     list={selectList}
                     label={'Currency'}
                     onChange={selectChangeHandler(0)}
                     value={selectedCurrency[0]}
                     disable={loading}
                  />

                  <Input
                     label={'Amount'}
                     value={currencyValues[0]}
                     onChange={valueChangeHandler(0)}
                     type={'number'}
                     disable={loading}
                  />
               </Grid>
            </Grid>

            <Grid item width={'100%'}>
               <Grid container flexDirection='column'>
                  <TextSelect
                     list={selectList}
                     label={'Currency'}
                     onChange={selectChangeHandler(1)}
                     value={selectedCurrency[1]}
                     disable={loading}
                  />

                  <Input
                     label={'Amount'}
                     value={currencyValues[1]}
                     onChange={valueChangeHandler(1)}
                     type={'number'}
                     disable={loading}
                  />
               </Grid>
            </Grid>
         </Grid>
      </Box>
   )
}


export default Converter