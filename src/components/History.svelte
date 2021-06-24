<script lang="ts">
  import { history } from "../stores/history.store";
</script>

{#each $history as { local_timestamp, amount }}
  <div>
    <span>{local_timestamp}</span>
    <span>{amount}</span>
  </div>
{/each}
