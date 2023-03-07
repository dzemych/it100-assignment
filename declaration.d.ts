declare module "*.module.css"
declare module "*.module.scss"
declare module "*.module.sass"

declare module '*.module.sass' {
   export const content: {[className: string]: string}
}