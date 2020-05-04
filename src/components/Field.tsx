import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from '../common/context'
import { IFieldComponentProps, IFieldValidator } from '../common/interfaces'

interface IFieldProps {
    component: React.FunctionComponent<IFieldComponentProps>
    defaultValue?: string
    id: string
    validators?: Array<IFieldValidator>
}

export const Field: React.FunctionComponent<IFieldProps> = ({ component, defaultValue, id, validators }) => {
    const { form, updateFieldContext } = useContext(FormContext)
    const [error, setError] = useState<string | null>(null)
    const [isTouched, setIsTouched] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        if (defaultValue) setValue(defaultValue)
    }, [defaultValue])

    useEffect(() => {
        updateFieldContext(id, { error, value })
    }, [error])

    useEffect(() => {
        console.log('EFFECT VALUE', id)
        console.log(defaultValue)
        console.log(value)

        updateFieldContext(id, { error, value })
        validate()
        if (!isTouched) {
            setIsTouched(true)
        }
    }, [value])

    useEffect(() => {
        if (form.fields[id] && form.fields[id].value !== value) {
            setValue(form.fields[id].value)
        }
    }, [form])

    const validate = () => {
        let error = null

        if (validators) {
            for (let i = validators.length - 1; i >= 0; i--) {
                if (!validators[i].check(value)) error = validators[i].message
            }
        }

        setError(error)
    }

    return component({
        error,
        isTouched,
        value,
        update: (value: string) => setValue(value)
    })
}

export default Field