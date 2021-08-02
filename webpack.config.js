const path = require('path');
const GoogleFontsPlugin = require('google-fonts-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new GoogleFontsPlugin({
        fonts: [
            { family: "Source Sans Pro" },
            { family: "Roboto", variants: [ "400", "700italic" ] }
        ]
        /* ...options */
    })
]
};