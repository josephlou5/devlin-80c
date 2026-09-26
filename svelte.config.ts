import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // https://svelte.dev/docs/kit/adapter-static
    adapter: adapter({
      // Generate a fallback page during build.
      fallback: "404.html",
      strict: true,
    }),
    paths: {
      base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
    },
    alias: {
      $components: "src/lib/components",
      $lib: "src/lib",
    },
  },
};

export default config;
