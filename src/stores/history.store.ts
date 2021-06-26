import { writable, Writable } from 'svelte/store';
import { address } from './address.store';

export const history: Writable<Transaction[]> = writable([]);

const minorDivisor : bigint = BigInt('1000000000000000000000000000');
const majorDivisor : bigint = BigInt('100000000000000000000000000000');

function rawToNumber(raw: string) {
    const amountRaw : bigint = BigInt(raw);

    const major = amountRaw / majorDivisor;
    const majorRawRemainder = amountRaw - (major * majorDivisor);

    const minor = majorRawRemainder / minorDivisor;
    const amountRawRemainder = majorRawRemainder - (minor * minorDivisor);

    return Number(major) + (Number(minor) / 100.0);
}


address.subscribe(value => {
    if (value != "") {
        fetch("https://banano-api-proxy.herokuapp.com/banano", {
            method: "POST",
            body: JSON.stringify({
                action: "account_history",
                account: value,
                count: -1
            })
        }).then((res) => res.json()).then(json => {
            const transactions = json.history.map(t => {
                const sign : number = t.type == "receive" ? 1.0 : -1.0;
                return {
                    ...t,
                    amount: sign * rawToNumber(t.amount)
                }
            });
            history.set(transactions);
        });
    }
});
