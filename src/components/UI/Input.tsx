import {ChangeEvent, FC} from 'react'
import {FormControl, InputLabel, Input as MuiInput} from "@mui/material"
import useUid from "../../hooks/useUid"


interface IProps {
   label: string
   value: any
   onChange: (e: ChangeEvent<HTMLInputElement>) => void
   type: string
   disable?: boolean
}

const Input:FC<IProps> = ({ label, value, onChange, type, disable }) => {
   const { v1 } = useUid()

   let inputVal = value

   if (type === 'number')
      if (value === '')
         inputVal = ''
      else
         inputVal = parseFloat(value)

   return(
      <FormControl fullWidth sx={{ m: 1, width: '100%' }} variant="standard">
         <InputLabel htmlFor={v1}>{label}</InputLabel>
         <MuiInput
            id={v1}
            value={inputVal}
            onChange={onChange}
            type={type}
            disabled={disable}
         />
      </FormControl>
   )
}


export default Input