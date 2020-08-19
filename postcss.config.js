const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    cssnano({
      preset: 'default'
    }),
    purgecss({
        content: [
            './views/**/*.ejs',
            './views/comments/**/*.ejs',
            './views/partials/**/*.ejs',
            './views/products/**/*.ejs',
        ], 
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
}

