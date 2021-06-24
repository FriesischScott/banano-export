<script lang="ts">
  import { address } from "../stores/address.store";

  let addressInput: string = "";

  function search() {
    address.set(addressInput);
  }
</script>

<div class="flex">
  <input
    type="text"
    placeholder="BAN Address..."
    bind:value={addressInput}
    class="bg-white flex-grow rounded border p-2 mr-4"
  />

  <button on:click={search} class="p-2 bg-green-200 rounded">Search</button>
</div>
