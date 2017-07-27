require('babel-core/register')({
  presets: ['es2015', 'react'],
  ignore: /node_modules\/(?!ProjectB)/,
});
