import { IField } from './IField'

export interface IForm {
    fields: { [key: string]: IField }
    isValidated: boolean
    valid: boolean
}