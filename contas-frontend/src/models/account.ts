import { Client } from "./client"
import { Transaction } from "./transaction"


export interface Account {
    id: string
    number: string
    balance: number
    owner: Client
    transactions: Transaction[]
}