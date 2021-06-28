<script lang="ts">
  import {
    balance,
    deposits,
    history,
    withdrawals,
  } from "../stores/history.store";
  import { monkey, address } from "../stores/address.store";

  let balance_value: number;
  let deposits_value: number;
  let withdrawals_value: number;
  let history_value: Transaction[];

  balance.subscribe((value) => (balance_value = value));
  deposits.subscribe((value) => (deposits_value = value));
  withdrawals.subscribe((value) => (withdrawals_value = value));
  history.subscribe((value) => (history_value = value));

  function downloadCSV() {
    let csv: string = "Koinly Date,Amount,Currency,Label,TxHash\n";

    history_value.forEach((t) => {
      csv += `${t.date},${t.amount},BAN,,${t.hash}\n`;
    });

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(csv)
    );
    element.setAttribute("download", "banano-history.csv");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
</script>

{#if $address != ""}
  <div class="flex">
    <div class="bg-white rounded p-4 my-4 flex-shrink">
      <div class="flex">
        <img src={$monkey} alt="Monkey" class="h-20" />
        <div>
          <div>{balance_value.toFixed(2)} BAN</div>
          <div>
            <span class="text-banano-green">{deposits_value}</span> Deposits
          </div>
          <div>
            <span class="text-red-600">{withdrawals_value}</span> Withdrawals
          </div>
        </div>
      </div>
    </div>
  </div>

  <button on:click={downloadCSV} class="bg-banano-yellow rounded p-2"
    >Export CSV</button
  >
{/if}
