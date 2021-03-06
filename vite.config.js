import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/vite-plugin-yext-sites-ssg";

export default defineConfig({
  plugins: [react(), yextSSG()],
});
