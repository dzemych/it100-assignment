import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material'
import {FC} from 'react'
import useUid from "../../hooks/useUid"


interface IProps {
   list: {
      value: string,
      text: string
   }[],
   label: string
   onChange: (e: SelectChangeEvent<string>) => void
   value: string
   disable?: boolean
}

const TextSelect:FC<IProps> = ({ value, onChange, list, label, disable }) => {
   const { v1 } = useUid()

   return(
      <FormControl variant="filled" sx={{ m: 1, width: '100%', maxWidth: '100%' }}>
         <InputLabel id={`label-${v1}`}>{label}</InputLabel>
         <Select
            labelId={`label-${v1}`}
            id={v1}
            value={value}
            onChange={onChange}
            disabled={disable}
         >
            { list.map(el => (
               <MenuItem key={el.value} value={el.value}>
                  {el.text}
               </MenuItem>
            )) }
         </Select>
      </FormControl>
   )
}


export default TextSelect