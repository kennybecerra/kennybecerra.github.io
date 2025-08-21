import path from "path";
import { defineConfig } from "vite";

const video = /.*\.mp4$|.*\.ogv$|.*\.webm$/;
const images = /.*\.jpg$|.*\.jpeg$|.*\.png$|.*\.gif$|.*\.svg$|.*\.webp$/;

export default defineConfig(async ({ command, mode }) => {
  return {
    root: path.resolve(__dirname, "./src"),
    publicDir: path.resolve(__dirname, "./public"),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        // Add more aliases as needed
      },
    },
    build: {
      outDir: path.resolve(__dirname, "./dist"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            if (images.test(assetInfo.name)) {
              return "assets/images/[name]-[hash].[ext]";
            }

            if (video.test(assetInfo.name)) {
              return "assets/videos/[name]-[hash].[ext]";
            }

            if (assetInfo.name.endsWith(".pdf")) {
              return "assets/documents/[name].[ext]"; // Other document files
            }

            if (assetInfo.name.endsWith(".ttf")) {
              return "assets/fonts/[name]-[hash].[ext]"; // Other font files
            }

            if (assetInfo.name.endsWith(".js")) {
              return "assets/js/[name]-[hash].[ext]"; // Other JS files
            }

            if (assetInfo.name.endsWith(".css")) {
              return "assets/css/[name]-[hash].[ext]"; // Other CSS files
            }

            return "[name]-[hash].[ext]"; // Default for other assets
          },
        },
      },
    },
    server: {
      open: true,
    },
    assetsInclude: ["**/*.pdf"],
  };
});
