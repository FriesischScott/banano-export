import { derived, writable, Writable } from 'svelte/store';
import { address } from './address.store';

export const history: Writable<Transaction[]> = writable([]);

const minorDivisor : bigint = BigInt('1000000000000000000000000000');
const majorDivisor : bigint = BigInt('100000000000000000000000000000');

function rawToNumber(raw: string) {
    const amountRaw : bigint = BigInt(raw);

    const major = amountRaw / majorDivisor;
    const majorRawRemainder = amountRaw - (major * majorDivisor);

    const minor = majorRawRemainder / minorDivisor;

    return Number(major) + (Number(minor) / 100.0);
}

function pad(n: number) : string {
    return ("00" + n).slice(-2);
}
function format(date: Date) : string {
    const year : string = `${date.getFullYear()}`;
    const month : string = pad(date.getMonth() + 1);
    const day : string = pad(date.getDate());

    const hours : string = pad(date.getHours());
    const minutes : string = pad(date.getMinutes());
    const seconds : string = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
                    date: format(new Date(Number(t.local_timestamp) * 1000)),
                    amount: sign * rawToNumber(t.amount),
                    hash: t.hash,
                }
            });
            history.set(transactions);
        });
    }
});

export const balance = derived(
    history,
    $history => $history.map(t => t.amount).reduce((acc, curr) => acc + curr, 0)
);

export const deposits = derived(
    history,
    $history => $history.map(t => t.amount > 0 ? 1 : 0).reduce((acc, curr) => acc + curr, 0)
);

export const withdrawals = derived(
    history,
    $history => $history.map(t => t.amount < 0 ? 1 : 0).reduce((acc, curr) => acc + curr, 0)
);
