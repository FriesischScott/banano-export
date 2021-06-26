<script lang="ts">
  import { history } from "../stores/history.store";
</script>

<div class="mt-8">
  <h3 class="text-4xl text-gray-300 mb-2">Transactions</h3>
  <hr class="mb-4" />
</div>
{#each $history as { local_timestamp, amount }}
  <div class="text-gray-200">
    <span>{local_timestamp}</span>
    <span>{amount}</span>
  </div>
{/each}
