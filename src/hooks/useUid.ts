import {useCallback, useMemo} from "react"


type IHook = () => { v1: string, getV1: () => string }

const useUid: IHook = () => {
   const getV1 = useCallback(
      () => `${Math.floor(Math.random() * 100000)}`,
      []
   )

   const v1 = useMemo(() => getV1(), [getV1])

   return { v1, getV1 }
}

export default useUid