export interface IInteractionComponentProps {
    update: (id: string, value: string) => void
    validate: (id: string) => void
}