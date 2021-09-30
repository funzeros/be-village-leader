import { ConfigEnv, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import viteESLint from "@ehutch79/vite-eslint";
import html from "vite-plugin-html";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import type { Alias } from "vite";

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}

function createAlias(alias: [string, string][]): Alias[] {
  return alias.map(item => {
    const [alia, src] = item;
    return {
      find: new RegExp(alia),
      replacement: pathResolve(src) + "/"
    };
  });
}
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log(env);
  const fontIconUUID = env.VITE_FONTICONUUID;
  const commonCss = ["/css/index.css", `//at.alicdn.com/t/${fontIconUUID}.css`];
  const commonJs = ["/js/load.js", `//at.alicdn.com/t/${fontIconUUID}.js`];
  return {
    base: "/",
    root,
    resolve: {
      alias: createAlias([
        // /@/xxxx => src/xxxx
        ["/@/", "src"],
        ["~", "node_modules"]
      ]),
      extensions: [".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
    },
    build: {
      target: "esnext",
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @import "./src/styles/var.scss";
        `
        }
      }
    },
    server: {
      port: +env.VITE_PORT,
      // Load proxy configuration from .env
      // proxy: {
      //   "/api": {
      //     target: env.VITE_BASEURL,
      //     changeOrigin: true,
      //     ws: true
      //   }
      // },
      hmr: {
        overlay: true
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      viteESLint(),
      VitePWA({
        registerType: "autoUpdate"
      }),
      html({
        inject: {
          injectData: {
            title: "我要当村长",
            css: [...commonCss],
            js: [...commonJs]
          }
        },
        minify: true
      })
    ],
    optimizeDeps: {
      include: ["dayjs/plugin/advancedFormat"],
      exclude: ["vue-demi"]
    }
  };
};
