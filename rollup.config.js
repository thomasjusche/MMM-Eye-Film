import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

const client = {
  input: "src/client/MMM-Eye-Film.ts",
  output: {
    file: "MMM-Eye-Film.js",
    globals: { moment: "moment" }
  },
  external: ["moment", "Module"],
  plugins: [typescript()]
};

const server = {
  input: "src/server/node_helper.ts",
  output: {
    file: "node_helper.js",
    format: "cjs",
    globals: { node_helper: "node_helper" }
  },
  external: ["node_helper"],
  plugins: [typescript(), commonjs()]
};

export default [client, server];
