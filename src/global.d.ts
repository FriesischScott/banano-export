/// <reference types="svelte" />

interface Transaction {
    type: string,
    account: 'string',
    amount: 'string',
    local_timestamp: 'string',
    height: 'string',
    hash: 'string'
}