<script lang="ts">
  import {
    address,
    monkey,
    balance,
    deposits,
    history,
    progress,
    error,
    withdrawals,
  } from "../stores/history.store";
  import Spinner from "./Spinner.svelte";

  function downloadCSV() {
    let csv: string = "Koinly Date,Amount,Currency,Label,TxHash\n";

    $history.forEach((t) => {
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

{#if $error}
  <div class="text-white bg-red-500 my-4 rounded p-4">
    {$error}
  </div>
{/if}

<div class="mt-4 mb-2 text-gray-200">Account Info</div>

<div class="flex items-center">
  <div class="flex">
    <div class="bg-white rounded p-4 flex-shrink">
      <div class="flex flex-col items-center">
        {#if $monkey}
          <div class="mb-4">
            <img src={$monkey} alt="Monkey" class="h-20" />
          </div>
        {/if}
        <div class="flex justify-between gap-4 text-sm">
          <p class="flex flex-col">
            BAN
            <span>{$balance.toFixed(2)}</span>
          </p>
          <p class="flex flex-col">
            Deposits
            <span class="text-banano-green">{$deposits}</span>
          </p>
          <p class="flex flex-col">
            Withdrawals
            <span class="text-red-600">{$withdrawals}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  {#if $progress}
    <Spinner />
  {/if}
</div>

{#if $history && !$progress}
  <button on:click={downloadCSV} class="bg-banano-yellow rounded p-2 my-4"
    >Export Koinly CSV</button
  >
{/if}
