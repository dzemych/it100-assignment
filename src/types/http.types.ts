
export enum HttpStatus {
   SUCCESS = 'success',
   ERROR = 'error',
   LOADING = 'loading',
   INIT = 'init'
}

export enum HttpMethod {
   GET = 'get'
}

export type RequestFunc = (
   url: string,
   method?: HttpMethod,
   body?: FormData | string | null,
   headers?: any
) => any

export type HttpHook = () => {
   status: HttpStatus,
   request: RequestFunc,
   loading: boolean
}