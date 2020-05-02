export interface IField {
    validators?: Array<IFieldValidator>,
    value: string,
    error?: string | null
}

export interface IFieldComponentProps {
    error: string
    value: string
    update: (value: string) => void
    validate: () => void
}

export interface IFieldValidator {
    check: Function
    message: string
}