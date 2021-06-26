<script lang="ts">
  import { balance, deposits, withdrawals } from "../stores/history.store";
  import { monkey, address } from "../stores/address.store";

  let balance_value: number;
  let deposits_value: number;
  let withdrawals_value: number;

  balance.subscribe((value) => (balance_value = value));
  deposits.subscribe((value) => (deposits_value = value));
  withdrawals.subscribe((value) => (withdrawals_value = value));
</script>

{#if $address != ""}
  <div class="bg-white rounded p-2 my-4">
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

  <button class="bg-banano-yellow rounded p-2">Export CSV</button>
{/if}
