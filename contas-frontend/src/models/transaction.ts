import { Account } from "./account"

export interface Transaction {
    id: string
    type: string
    mount: number
    account: Account
    receiverAccount: Account
    data: Date
}