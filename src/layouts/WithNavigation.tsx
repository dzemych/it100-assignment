import {FC, ReactNode} from 'react'
import classes from './WithNavigation.module.sass'
import Header from "components/Header/Header"
import Footer from "../components/Footer/Footer"


interface IProps {
   children: ReactNode
}

const WithNavigation:FC<IProps> = ({ children }) => {
   return(
       <div className={classes.container}>
          <Header/>

          <main>
             {children}
          </main>

          <Footer/>
       </div>
   )
}


export default WithNavigation