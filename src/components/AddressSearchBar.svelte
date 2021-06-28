<script lang="ts">
  import { progress, search } from "../stores/history.store";

  let address_value: string = "";

  function click() {
    search(address_value);
  }
</script>

<div>
  <div class="text-gray-200 mb-2">
    Enter your Banano address to get started.
  </div>
  <div class="flex">
    <input
      type="text"
      placeholder="BAN Address..."
      bind:value={address_value}
      class="bg-white font-mono flex-grow rounded p-2 mr-4 focus:outline-none"
    />

    <button
      on:click={click}
      disabled={$progress}
      class="p-2 bg-banano-green rounded">Search</button
    >
  </div>
</div>
