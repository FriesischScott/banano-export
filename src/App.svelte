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
          <span class="text-2lg">Banano History Export</span>
        </div>
      </div>
    </div>
  </nav>
  <div class="px-4">
    <div class="container mx-auto">
      <div class="text-white mb-6">
        This tool can be used to export the transaction history (deposits,
        withdrawals) of any Banano address as a CSV file in order to import it
        into portfolio trackers or crypto tax softwares which do not support
        Banano as of yet. The list of exportable formats will be constantly
        extended. To request a new format reach out to <a
          href="https://www.reddit.com/user/FriesischScott"
          target="_"
          class="text-blue-400 hover:underline">/u/FriesischScott</a
        >
        or open an issue on
        <a
          href="https://github.com/friesischscott/banano-export"
          class="text-blue-400 hover:underline"
          target="_">Github</a
        >.
      </div>
      <div class="text-white mb-6">Currently available formats: Koinly</div>
      <AddressSearchBar />
      <History />
    </div>
  </div>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap");
  body {
    font-family: "Roboto", sans-serif;
  }
</style>
