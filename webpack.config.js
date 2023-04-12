/* Copyright G. Hemingway, 2022 - All rights reserved */
"use strict";

import path from "node:path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default {
  context: path.join(__dirname, "/src/client"),
  entry: "./main.js",
  mode: "development",
  devtool: "source-map",
  watch: true,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(ogg|mp3|png|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
      },
    ]
  }
};
