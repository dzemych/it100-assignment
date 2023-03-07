import {FC} from 'react'
import classes from './Footer.module.sass'


const Footer:FC = () => {
   return(
       <footer className={classes.container}>
          Copyright © {new Date().getFullYear()}
       </footer>
   )
}


export default Footer