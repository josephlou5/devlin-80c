<script lang="ts">
  import "../app.css";

  const { children } = $props();
</script>

<main class="flex p-6">
  {@render children()}
</main>
