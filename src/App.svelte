<script lang="ts">
  import AddressSearchBar from "./components/AddressSearchBar.svelte";
  import History from "./components/History.svelte";
</script>

<main class="container mx-auto">
  <h1 class="text-6xl text-gray-800 mb-4">Banano History Export</h1>
  <AddressSearchBar />
  <hr class="bg-gray my-4" />
  <History />
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
