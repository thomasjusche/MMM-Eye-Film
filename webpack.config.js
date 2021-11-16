const nodeExternals = require("webpack-node-externals");
const path = require("path");

const clientConfig = {
  mode: "production",
  entry: "./src/client/MMM-Eye-Film.ts",
  output: {
    path: __dirname,
    filename: "MMM-Eye-Film.js"
  },

  resolve: {
    extensions: [".ts"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, "src/client"),
          path.resolve(__dirname, "src/types")
        ],
        loader: "awesome-typescript-loader"
      }
    ]
  }
};
const serverConfig = {
  target: "node",
  mode: "production",
  externals: [nodeExternals(), "node_helper"],
  entry: "./src/server/node_helper.ts",
  output: {
    path: __dirname,
    filename: "node_helper.js",
    libraryTarget: "commonjs2"
    // library: "yourLibName",
  },
  node: {
    __dirname: false
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, "src/server"),
          path.resolve(__dirname, "src/types")
        ],
        loader: "awesome-typescript-loader"
      }
    ]
  }
};

module.exports = [serverConfig, clientConfig];
