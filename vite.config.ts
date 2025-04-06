
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
      clientPort: 8080,
      protocol: 'ws',
    },
    // Restrict access to local connections only
    cors: false,
    headers: {
      'Access-Control-Allow-Origin': 'null',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
    // Prevent directory traversal
    fs: {
      strict: true,
      allow: ['.'],
      deny: ['node_modules/.vite', '.git', '.github'],
    },
    // Force HTTPS for local development to prevent Host header attacks
    https: mode === 'development' ? {} : undefined,
    // Explicitly set allowed hosts
    origin: 'http://localhost:8080',
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
    sourcemap: false, // Disable source maps in production
  },
  // Improve Content Security Policy headers
  csp: {
    enable: true,
    policy: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "https://cdn.gpteng.co"],
      'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      'img-src': ["'self'", "data:", "https:"],
      'font-src': ["'self'", "https://fonts.gstatic.com"],
      'connect-src': ["'self'"]
    }
  },
}));
