const path = require('path')
module.exports = {
   entry: path.join(__dirname, 'js','reveal.js'), // Our frontend will be inside the src folder
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'build.js' // The final file will be created in dist/build.js
   },
   module: {
      loaders: [{
         test: /\.css$/, // To load the css in react
         use: ['style-loader', 'css-loader'],
         include: /src/
      }, {
         test: /\.json$/, // To load the json files
         loader: 'json-loader'
      }]
   }
}