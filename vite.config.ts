import { defineConfig, splitVendorChunk, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const getVendorChunk = splitVendorChunk();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    sourcemap: false,
    minify: "terser",
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id, options) {
          if (id.indexOf("echarts") !== -1) {
            return "echarts";
          }
          if(id.indexOf("element-plus") !== -1) {
            return "element-plus"
          }
          return getVendorChunk(id, options);
        },
      },
    },
  },
});
