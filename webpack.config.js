const path = require("path");
const webpack = require("webpack");
const jquery = require("jquery");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/env"],
          plugins: ["babel-plugin-root-import"],
        },
      },
    ],
  }
};
