<script lang="ts">
  import LogContainer from "./lib/LogContainer.svelte"
  import type { Endpoint } from "./types"

  const routes = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/endpoints`)
    const data = (await res.json()) as Endpoint[]
    return data
  }
</script>

<main class="px-4">
  <div class="flex justify-center my-12">
    <h1 class="text-4xl font-bold">Jet-Black scrapper web logs</h1>
  </div>

  {#await routes() then endpoints}
    {#each endpoints as endpoint (endpoint.path)}
      <LogContainer {endpoint} />
    {/each}
  {/await}
</main>
