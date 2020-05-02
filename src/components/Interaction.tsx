import React, { useContext } from 'react'
import { FormContext } from '../common/context'
import { IInteractionComponentProps } from '../common/interfaces'

interface IInteractionProps {
    component: React.FunctionComponent<IInteractionComponentProps>
}

export const Interaction: React.FunctionComponent<IInteractionProps> = ({ component }) => {
    const { updateFieldValue, validateField } = useContext(FormContext)
 
    return component({
        update: (id: string, value: string) => updateFieldValue(id, value),
        validate: (id: string) => validateField(id)
    })
}

export default Interaction