import { babel } from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import { ECMA_EXTENSIONS } from "@esxl/constants";
import { createRequire } from "module";
import { dirname, isAbsolute, parse, resolve } from "path";
import type { IsExternal } from "rollup";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const extensions = ECMA_EXTENSIONS.map((extension) => `.${extension}`);
const require$ = createRequire(import.meta.url);

export default () => {
  const pkg = require$("./package.json");
  const { main } = pkg;

  const isExternal: IsExternal = (source, importer) => {
    if (isAbsolute(source)) {
      return !source.startsWith(__dirname);
    } else {
      const { dir } = parse(source);
      return dir.startsWith(".")
        ? !resolve(dirname(importer || "."), source).startsWith(__dirname)
        : true;
    }
  };

  return {
    external: isExternal,
    input: "./src/index.ts",
    output: {
      file: main,
      format: "cjs",
    },
    plugins: [
      nodeResolve({ extensions }),
      babel({ babelHelpers: "runtime", exclude: /node_modules/, extensions }),
    ],
  };
};
