const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const Base_ = "./src/client/js/";
module.exports = {
  entry: {
    main: Base_ + "main.js",
    videoPlayer: Base_ + "videoPlayer.js",
    recorder: Base_ + "recorder.js",
    commentSection: Base_ + "commentSection.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  watch: true,

  mode: "development",
  output: {
    filename: "js/[name].js",
    clean: true,
    path: path.resolve(__dirname, "assets"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
