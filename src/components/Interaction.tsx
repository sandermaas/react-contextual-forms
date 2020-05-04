import React, { useContext } from 'react'
import { FormContext } from '../common/context'
import { IInteractionComponentProps } from '../common/interfaces'

interface IInteractionProps {
    component: React.FunctionComponent<IInteractionComponentProps>
}

export const Interaction: React.FunctionComponent<IInteractionProps> = ({ component }) => {
    const { updateFieldInteraction } = useContext(FormContext)
 
    return component({
        update: (id: string, value: string) => updateFieldInteraction(id, value)
    })
}

export default Interaction