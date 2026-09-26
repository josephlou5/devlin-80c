<script lang="ts">
  import "../app.css";

  const { children } = $props();
</script>

<main class="p-6">
  <div class="flex flex-col mx-auto" style="max-width: 1250px;">
    {@render children()}
  </div>
</main>
