import { writable, Writable } from 'svelte/store';
import { address } from './address.store';

const api: string = "https://api-beta.banano.cc";

export const history: Writable<Transaction[]> = writable([]);

address.subscribe(value => {
    if (value != "") {
        fetch(api, {
            method: "POST",
            body: JSON.stringify({
                action: "account_history",
                account: value,
                count: -1
            })
        }).then((res) => res.json()).then(json => history.set(json));
    }
});
