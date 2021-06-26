<script lang="ts">
  import AddressSearchBar from "./components/AddressSearchBar.svelte";
  import History from "./components/History.svelte";
</script>

<main>
  <nav class="bg-banano-green h-10 mb-6">
    <div class="px-4">
      <div class="container mx-auto py-2">
        <div class="flex">
          <img
            src="./images/banano-icon.svg"
            alt="Banano Icon"
            class="h-6 mr-2"
          />
          <span class="text-2lg font-semibold">Banano History Export</span>
        </div>
      </div>
    </div>
  </nav>
  <div class="px-4">
    <div class="container mx-auto">
      <AddressSearchBar />
      <History />
    </div>
  </div>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
