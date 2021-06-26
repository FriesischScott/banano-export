import { derived, writable } from 'svelte/store';

export const address = writable("");

export const monkey = derived(
    address,
    $address => `https://monkey.banano.cc/api/v1/monkey/${$address}`
);