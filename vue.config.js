// const GoogleFontsPlugin = require('google-fonts-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      // new GoogleFontsPlugin({
      //   fonts: [
      //     { family: 'Montserrat', variants: ['300', '400', '500', '700', '900'] },
      //     { family: 'Work Sans', variants: ['300', '400', '500', '700', '900'] },
      //   ],
      // }),
    ],
  },
  chainWebpack: (config) => {
    const splitWebfontCSS = config.module
      .rule('font.js')
      .test(/\.font\.js$/);

    const loaders = [
      { loader: 'style-loader', options: {} },
      { loader: 'css-loader', options: {} },
      { loader: 'postcss-loader', options: {} },
      { loader: 'webfonts-loader', options: {} },
    ];

    loaders.forEach(({ loader, options }) => {
      splitWebfontCSS
        .use(loader).loader(loader).options(options);
    });
  },
};
