import React from 'react'
import { FormContext } from '../common/context'
import { IForm, IField } from '../common/interfaces'

interface IFormProps {
    onChange?: ({}: IForm) => void
    onSubmit: ({}: IForm) => void
}

export class Form extends React.Component<IFormProps> {
    private _fields: {[key: string]: IField} = {}

    constructor(props: IFormProps) {
        super(props)
        this.state = {}
    }

    handleSubmit = (event: React.FormEvent) => {
        const { onSubmit } = this.props
        const validForm = this.validateForm()

        event.preventDefault()
        if (!validForm) {
            this._fields = {
                ...this._fields
            }
            this.forceUpdate()
        }
        onSubmit({
            fields: this._fields,
            valid: validForm
        })
    }

    updateFieldContext = (fieldId: string, field: IField) => {
        const { onChange } = this.props

        this._fields = {
            ...this._fields,
            [fieldId]: {
                error: field.error,
                value: field.value
            }
        }
        if (onChange) onChange({
            fields: this._fields,
            valid: this.validateForm()
        })
    }

    updateFieldInteraction = (fieldId: string, value: string) => {
        const { onChange } = this.props

        if (this._fields[fieldId]) {
            this._fields = {
                ...this._fields,
                [fieldId]: {
                    error: null,
                    value
                }
            }
            if (onChange) onChange({
                fields: this._fields,
                valid: this.validateForm()
            })
            this.forceUpdate()   
        } else {
            console.error(`There is no field with id ${fieldId} to update`)
        }
    }

    validateForm = () => {
        let isValid = true

        Object.keys(this._fields).forEach(key => {
            if (this._fields[key].error) isValid = false
        })
        
        return isValid
    }

    render() {
        const { children } = this.props

        return (
            <FormContext.Provider value={{ 
                form: {
                    fields: this._fields,
                    valid: this.validateForm()
                },
                updateFieldContext: this.updateFieldContext,
                updateFieldInteraction: this.updateFieldInteraction
            }}>
                <form noValidate onSubmit={this.handleSubmit}>
                    {children}
                </form>
            </FormContext.Provider>
        )
    }
}

export default Form