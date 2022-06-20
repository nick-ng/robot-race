const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const htmlTemplate = require("./html-template");

require("esbuild")
  .build({
    entryPoints: ["src-front/index.tsx"],
    bundle: true,
    tsconfig: "./src-front/tsconfig.json",
    metafile: true,
    format: "esm",
    sourcemap: true,
    outdir: "dist-front/",
    define: {
      API_ORIGIN: `"${process.env.API_ORIGIN || ""}"`,
    },
    plugins: [
      htmlPlugin({
        files: [
          {
            filename: "index.html",
            entryPoints: ["src-front/index.tsx"],
            title: "Robot Race - Dev",
            htmlTemplate,
          },
        ],
      }),
    ],
  })
  .catch(() => process.exit(1));
