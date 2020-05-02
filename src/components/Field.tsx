import React, { useContext, useEffect } from 'react'
import { FormContext } from '../common/context'
import { IFieldComponentProps, IFieldValidator } from '../common/interfaces'

interface IFieldProps {
    component: React.FunctionComponent<IFieldComponentProps>
    defaultValue?: string
    id: string
    validators?: Array<IFieldValidator>
}

export const Field: React.FunctionComponent<IFieldProps> = ({ component, defaultValue, id, validators }) => {
    const { fields, initField, updateFieldValue, validateField } = useContext(FormContext)

    useEffect(() => {
        initField(id, validators || [], defaultValue || '')
    }, [defaultValue])

    return component({
        error: fields[id] ? fields[id].error : null,
        value: fields[id] ? fields[id].value : '',
        update: (value: string) => updateFieldValue(id, value),
        validate: () => validateField(id)
    })
}

export default Field