module.exports = {
  pwa: {
    start_url: '/',
  },
  configureWebpack: {
    plugins: [

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
