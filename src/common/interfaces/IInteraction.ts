export interface IInteractionComponentProps {
    props?: { [key: string]: any }
    update: (id: string, value: string) => void
}