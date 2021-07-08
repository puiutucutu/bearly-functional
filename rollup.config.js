import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const babelPlugin = [
  babel({
    babelHelpers: "bundled",
    exclude: "node_modules/**"
  })
];

module.exports = [
  {
    external: ["date-fns"],
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [...babelPlugin, nodeResolve(), commonjs(), json()]
  },
  {
    input: "src/index.js",
    output: {
      file: pkg.browser,
      format: "umd",
      name: "bf",
      sourcemap: true
    },
    plugins: [...babelPlugin, nodeResolve(), commonjs(), json(), terser()]
  }
];
