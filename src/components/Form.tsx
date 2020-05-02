import React from 'react'
import { FormContext } from '../common/context'
import { IForm, IField, IFieldValidator } from '../common/interfaces'

export interface IFormProps {
    alwaysValidate?: boolean
    onSubmit: ({}: IForm) => void
}
export interface IFormState {
    [key: string]: IField
}

export class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
        super(props)
        this.state = {}
    }

    handleSubmit = (event: any) => {
        const { onSubmit } = this.props

        event.preventDefault()
        onSubmit({
            fields: {
                ...this.state
            },
            valid: this.validateForm()
        })
    }

    initField = (fieldId: string, validators: Array<IFieldValidator>, value: string) => {
        this.setState({
            [fieldId]: {
                ...this.state[fieldId],
                validators,
                value
            }
        })
    }

    updateFieldError = (fieldId: string, error: string | null) => {
        this.setState({
            [fieldId]: {
                ...this.state[fieldId],
                error
            }
        })
    }

    updateFieldValue = (fieldId: string, value: string) => {
        const { alwaysValidate } = this.props

        this.setState({
            [fieldId]: {
                ...this.state[fieldId],
                value
            }
        }, () => {
            if (alwaysValidate) this.validateField(fieldId)
        })
    }

    validateField = (fieldId: string) => {
        const validators = this.state[fieldId].validators
        const value = this.state[fieldId].value
        let error = ''

        if (validators) {
            for (let i = validators.length - 1; i >= 0; i--) {
                if (!validators[i].check(value)) error = validators[i].message
            }
        }

        if (error) {
            this.updateFieldError(fieldId, error)
            return false
        } else {
            this.updateFieldError(fieldId, null)
            return true
        }
    }

    validateForm = () => {
        let valid = true

        Object.keys(this.state).forEach(field => {
            if (!this.validateField(field)) valid = false
        })

        return valid
    }

    render() {
        const { children } = this.props

        return (
            <FormContext.Provider value={{ 
                fields: this.state,
                initField: this.initField,
                updateFieldValue: this.updateFieldValue,
                validateField: this.validateField
            }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    {children}
                </form>
            </FormContext.Provider>
        )
    }
}

export default Form