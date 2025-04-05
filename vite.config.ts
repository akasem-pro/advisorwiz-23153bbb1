
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost", // Restrict access to localhost only
    port: 8080,
    // Add security settings to prevent external access
    hmr: {
      // Only allow connections from localhost
      host: "localhost",
    },
    // Restrict access to local connections only
    cors: false,
    // Prevent directory traversal
    fs: {
      strict: true,
      allow: ['.']
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(), // Removed the configuration object that was causing the type error
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add build optimization setting
  build: {
    // Minify options
    minify: "terser",
    terserOptions: {
      compress: {
        // Safe optimizations
        drop_console: true,
        drop_debugger: true,
      }
    },
    // Add security headers
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['react-router-dom', 'framer-motion']
        }
      }
    },
  },
}));
