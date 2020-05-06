export interface IField {
    error: string | null
    value: string
}

export interface IFieldComponentProps {
    error: string | null
    isTouched: boolean
    props?: {[key: string]: any}
    value: string
    update: (value: string) => void
}

export interface IFieldValidator {
    check: (value: string) => boolean
    message: string
}