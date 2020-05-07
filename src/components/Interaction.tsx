import React, { useContext } from 'react'
import { FormContext } from '../common/context'
import { IInteractionComponentProps } from '../common/interfaces'

interface IInteractionProps {
    component: React.FunctionComponent<IInteractionComponentProps>
    props?: { [key: string]: any }
}

export const Interaction: React.FunctionComponent<IInteractionProps> = ({ component, props }) => {
    const { updateFieldInteraction } = useContext(FormContext)
 
    return component({
        props,
        update: (id: string, value: string) => updateFieldInteraction(id, value)
    })
}

export default Interaction