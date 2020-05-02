import { createContext } from 'react'

interface IFormContext {
    fields: { [key: string]: any }
    initField: (fieldId: string, validators: Array<{ check: Function, message: string }>, value: string) => void
    updateFieldValue: (fieldId: string, value: string) => void
    validateField: (fieldId: string) => void
}

const initialState: IFormContext = {
    fields: {},
    initField: (fieldId, validators, value) => {},
    updateFieldValue: (fieldId, value) => {},
    validateField: (fieldId) => {}
}

export const FormContext = createContext<IFormContext>(initialState)