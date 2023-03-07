import {FC, useEffect, useState} from 'react'
import classes from './Header.module.sass'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EuroIcon from '@mui/icons-material/Euro';
import useCurrencyApi from "../../hooks/useCurrencyApi"


const Header:FC = () => {

   const { fetchRates } = useCurrencyApi()
   const [rates, setRates] = useState({ USD: '..', EUR: '..' })

   useEffect(() => {
      const getUsdEurRates = async () => {
         const rates = await fetchRates('UAH', 'USD,EUR')

         setRates({
            USD: (1 / rates.USD).toFixed(2),
            EUR: (1 / rates.EUR).toFixed(2),
         })
      }

      getUsdEurRates()
   }, [])

   return(
      <header className={classes.container}>
         <div className={classes.rate_container}>
            <div className={classes.currency}>
               <AttachMoneyIcon/> {rates.USD}
            </div>

            <div className={classes.currency_divider}>
               /
            </div>

            <div className={classes.currency}>
               <EuroIcon/> {rates.EUR}
            </div>
         </div>
      </header>
   )
}


export default Header