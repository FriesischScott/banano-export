<script lang="ts">
  import { address } from "../stores/address.store";

  let addressInput: string = "";

  function search() {
    address.set(addressInput);
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
      bind:value={addressInput}
      class="bg-white flex-grow rounded border p-2 mr-4"
    />

    <button on:click={search} class="p-2 bg-banano-green rounded">Search</button
    >
  </div>
</div>
