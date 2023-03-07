import {HttpHook, HttpMethod, HttpStatus, RequestFunc} from "../types/http.types"
import {useCallback, useState} from "react"


const useHttp: HttpHook = () => {
   const [status, setStatus] = useState(HttpStatus.INIT)
   const [loading, setLoading] = useState(false)

   const request = useCallback<RequestFunc>(async (
      url,
      method= HttpMethod.GET,
      body = null,
      headers
   ) => {
      try {
         setLoading(true)
         setStatus(HttpStatus.LOADING)

         const res = await fetch(url, { method, body, headers })

         setStatus(HttpStatus.SUCCESS)
         return await res.json()
      } catch (e) {
         setStatus(HttpStatus.ERROR)
         return null
      } finally {
         setLoading(false)
      }
   }, [])

   return { request, status, loading }
}

export default useHttp