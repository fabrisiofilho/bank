import { Account } from "./account"

export interface Client {
    id: string
    name: string
    lastName: string
    cpf: string
    address: string
    account: Account[]
}