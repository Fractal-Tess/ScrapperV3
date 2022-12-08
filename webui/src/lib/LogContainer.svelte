<script lang="ts">
  import type { Endpoint } from "../types"
  export let endpoint: Endpoint

  let ul: HTMLUListElement

  const source = new EventSource(
    `${import.meta.env.VITE_SERVER_URL}/${endpoint.path}`
  )

  let logs: string[] = []
  source.onmessage = event => {
    logs = [...logs, event.data as string]

    if (ul.scrollHeight - ul.scrollTop < 400)
      ul.scrollTo({ top: ul.scrollHeight + 2000 })
  }
</script>

<dir class="container">
  <h3 class="text-2xl font-bold">
    {endpoint.identifier.type}-{endpoint.identifier.kind}
  </h3>
  <div class="border-2 rounded-md h-96 p-8 bottom-0">
    <ul class="overflow-y-scroll h-full" bind:this={ul}>
      {#each logs as log (log)}
        <li>
          {log}
        </li>
      {/each}
    </ul>
  </div>
</dir>
