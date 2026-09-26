<script lang="ts">
  import { onMount } from "svelte";
  import { X } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  let spreadsheetId = $state("");
  let isSpreadsheetIdValid = $state(false);

  function updateSpreadsheetIdQueryParam() {
    if (!spreadsheetId) {
      if (!page.url.searchParams.has("spreadsheetId")) {
        // No spreadsheet ID and no existing param.
        return;
      }
    } else if (page.url.searchParams.get("spreadsheetId") === spreadsheetId) {
      // Param is already the correct value.
      return;
    }
    const newUrl = new URL(page.url);
    if (!spreadsheetId) {
      newUrl.searchParams.delete("spreadsheetId");
    } else {
      newUrl.searchParams.set("spreadsheetId", spreadsheetId);
    }
    goto(newUrl, { noScroll: true, keepFocus: true });
  }

  function setSpreadsheetId(input: string) {
    input = input.trim();
    if (!input) {
      spreadsheetId = "";
      updateSpreadsheetIdQueryParam();
      return;
    }
    const match = input
      .trim()
      .match(
        /^(?:https:\/\/docs\.google\.com\/spreadsheets\/d\/)?([a-zA-Z0-9_-]{44})(?:\/|$)/
      );
    if (!match) {
      // It's invalid, so leave the invalid value and don't update an existing
      // query param.
      spreadsheetId = input;
      isSpreadsheetIdValid = false;
      return;
    }
    spreadsheetId = match[1];
    isSpreadsheetIdValid = true;
    updateSpreadsheetIdQueryParam();
  }

  onMount(() => {
    // Needs to be inside `onMount` due to prerendering.
    setSpreadsheetId(page.url.searchParams.get("spreadsheetId") ?? "");
  });
</script>

<svelte:head>
  <title>Devlin Lab -80ºC Freezers</title>
</svelte:head>

<div
  class={[
    "flex flex-col gap-3",
    "xl:flex-row xl:items-center xl:justify-between mb-5",
  ]}
>
  <div class="text-5xl font-bold">Devlin Lab -80ºC Freezers</div>
  <div
    class={[
      "flex flex-row flex-wrap items-center gap-x-2",
      "xl:flex-col xl:items-end",
    ]}
  >
    <label for="spreadsheet-id" class="font-bold">Spreadsheet ID:</label>
    <div class="relative" style="width: 50ch;">
      <input
        id="spreadsheet-id"
        class={[
          "border-2 rounded-sm px-2 py-0.5 font-mono w-full",
          // If there's a valid and it's invalid, make the border red.
          !spreadsheetId || isSpreadsheetIdValid || "border-red-300",
          // Give padding to the clear button when it's shown.
          spreadsheetId && "pr-5",
        ]}
        placeholder="Paste spreadsheet ID or link here"
        value={spreadsheetId}
        onblur={(event) => void setSpreadsheetId(event.currentTarget.value)}
        onkeydown={(event) => {
          if (event.key == "Enter") {
            event.currentTarget.blur();
          }
        }}
      />
      {#if spreadsheetId}
        <div class="absolute inset-y-0 right-1 flex items-center">
          <X
            color={isSpreadsheetIdValid ? undefined : "red"}
            class="cursor-pointer"
            onclick={() => void setSpreadsheetId("")}
          />
        </div>
      {/if}
    </div>
  </div>
</div>
