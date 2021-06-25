import { writable, Writable } from 'svelte/store';
import { address } from './address.store';

export const history: Writable<Transaction[]> = writable([]);

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
            history.set(json.history)
        });
    }
});
