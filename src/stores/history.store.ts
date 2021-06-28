import { derived, writable, Writable } from "svelte/store";
import isValid from "nano-address-validator";

export const address = writable("");

export const monkey = derived(address, ($address) =>
  $address != "" ? `https://monkey.banano.cc/api/v1/monkey/${$address}` : ""
);

export const history: Writable<Transaction[]> = writable(null);
export const progress: Writable<boolean> = writable(false);
export const error: Writable<string> = writable("");

const minorDivisor: bigint = BigInt("1000000000000000000000000000");
const majorDivisor: bigint = BigInt("100000000000000000000000000000");

function rawToNumber(raw: string) {
  const amountRaw: bigint = BigInt(raw);

  const major = amountRaw / majorDivisor;
  const majorRawRemainder = amountRaw - major * majorDivisor;

  const minor = majorRawRemainder / minorDivisor;

  return Number(major) + Number(minor) / 100.0;
}

function pad(n: number): string {
  return ("00" + n).slice(-2);
}
function format(date: Date): string {
  const year: string = `${date.getFullYear()}`;
  const month: string = pad(date.getMonth() + 1);
  const day: string = pad(date.getDate());

  const hours: string = pad(date.getHours());
  const minutes: string = pad(date.getMinutes());
  const seconds: string = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function parseHistory(history) {
  return history.map((t) => {
    const sign: number = t.type == "receive" ? 1.0 : -1.0;
    return {
      date: format(new Date(Number(t.local_timestamp) * 1000)),
      amount: sign * rawToNumber(t.amount),
      hash: t.hash,
    };
  });
}

const BANANO_API_URL: string = "https://banano-api-proxy.herokuapp.com/banano";

export const search = async (addr: string) => {
  error.set("");
  history.set(null);

  if (addr != "") {
    if (!isValid(addr, "ban")) {
      error.set("Invalid Banano address.");
      return;
    }

    address.set(addr);
    progress.set(true);

    try {
      let res = await fetch(BANANO_API_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "account_history",
          account: addr,
          count: 50,
        }),
      });

      if (res.status != 200) {
        throw Error(res.statusText);
      }

      let json = await res.json();

      if (json.history.length > 0) {
        let transactions = parseHistory(json.history);
        history.set(transactions);

        while (json.previous) {
          res = await fetch(BANANO_API_URL, {
            method: "POST",
            body: JSON.stringify({
              action: "account_history",
              account: addr,
              count: 50,
              head: json.previous,
            }),
          });
          if (res.status != 200) {
            throw Error(res.statusText);
          }
          json = await res.json();
          transactions = [...transactions, ...parseHistory(json.history)];

          console.log(transactions);
          history.set(transactions);
        }
      } else {
        history.set([]);
      }
    } catch (err) {
      error.set(err.message);
    }
  }

  progress.set(false);
};

export const balance = derived(history, ($history) =>
  $history
    ? $history.map((t) => t.amount).reduce((acc, curr) => acc + curr, 0)
    : 0
);

export const deposits = derived(history, ($history) =>
  $history
    ? $history
        .map((t) => (t.amount > 0 ? 1 : 0))
        .reduce((acc, curr) => acc + curr, 0)
    : 0
);

export const withdrawals = derived(history, ($history) =>
  $history
    ? $history
        .map((t) => (t.amount < 0 ? 1 : 0))
        .reduce((acc, curr) => acc + curr, 0)
    : 0
);
