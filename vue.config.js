module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("gltf")
      .test(/\.(gltf)$/)
      .use("gltf-webpack-loader")
      .loader("gltf-webpack-loader")
      .end();

    config.module
      .rule("url-loader")
      .test(/\.(png|cur|woff|woff2|eot|ttf|svg)$/)
      .use("url-loader?limit=100000")
      .loader("url-loader?limit=100000")
      .end();

    config.module
      .rule("...")
      .test(/\...$/)
      .use("eslint-loader")
      .loader("eslint-loader")
      .end();
  },
};
// entry: '...',
// module: {
//   rules: [
//     {
//       test: /\.js$/,
//       exclude: /node_modules/,
//       loader: 'eslint-loader',
//       options: {
//         cache: true,
//       },
//     },
//   ],
// },
