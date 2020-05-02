import { IField } from './IField'

export interface IForm {
    fields: { [key: string]: IField }
    valid: boolean
}