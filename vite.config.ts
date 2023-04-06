import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    build: {
        sourcemap: false,
        minify: 'terser',
        chunkSizeWarningLimit: 1500,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    echarts_charts: ['echarts/charts'],
                    echarts_core: ['echarts/core'],
                    echarts_components: ['echarts/components'],
                    vueuse: ['@vueuse/core'],
                    axios: ['axios']
                }
            }
        }
    }
})
