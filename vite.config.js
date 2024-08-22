/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            utils: path.resolve(__dirname, "src/utils"),
            pages: path.resolve(__dirname, "src/pages"),
            _components: path.resolve(__dirname, "src/_components"),
        },
    },
});
