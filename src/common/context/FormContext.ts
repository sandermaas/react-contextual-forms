import { createContext } from 'react'
import { IField, IForm } from '../interfaces'

interface IFormContext {
    form: IForm
    updateFieldContext: (fieldId: string, field: IField) => void
    updateFieldInteraction: (fieldId: string, value: string) => void
}

const initialState: IFormContext = {
    form: {
        fields: {},
        isValidated: false,
        valid: true
    },
    updateFieldContext: (fieldId, field) => {},
    updateFieldInteraction: (fieldId, value) => {}
}

export const FormContext = createContext<IFormContext>(initialState)