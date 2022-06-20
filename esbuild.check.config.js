const { htmlPlugin } = require("@craftamap/esbuild-plugin-html");
const htmlTemplate = require("./html-template");

require("esbuild")
  .build({
    entryPoints: ["src-front/index.tsx"],
    bundle: true,
    tsconfig: "./src-front/tsconfig.check.json",
    metafile: true,
    minify: true,
    treeShaking: true,
    format: "esm",
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
            title: "Robot Race",
            htmlTemplate,
          },
        ],
      }),
    ],
  })
  .catch(() => process.exit(1));
