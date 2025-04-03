
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost", // Restrict to localhost only
    port: 8080,
    // Add security settings to prevent external access
    hmr: {
      // Only allow connections from localhost
      host: "localhost",
    },
    // Restrict access to local connections only
    cors: false,
    // Add additional security headers
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
    },
    // Disable server.fs.deny bypass
    fs: {
      strict: true,
      allow: ['.']
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add build optimization settings
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
    // Add additional security measures for output
    rollupOptions: {
      output: {
        // Ensure proper content types
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  // Fix for server.fs.deny bypass
  optimizeDeps: {
    exclude: ['fsevents']
  }
}));
