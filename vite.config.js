import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: "/src",
            utils: "/src/utils",
            pages: "/src/pages",
            _components: "/src/_components",
        },
    },
});
