const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        require('tailwindcss'),

        process.env.NODE_ENV === 'production' ? require('autoprefixer') : null,

        process.env.NODE_ENV === 'production'
            ? cssnano({ preset: 'default' })
            : null,
        purgecss({
            content: ['app.js', 'seeds.js'],
            css: ['./public/stylesheets/app.css', './public/stylesheets/tailwind.css'],
            defaultExtractor: content => content.match(/[A-z0-9-:\/]+/g) || []
            
        })
    ]
}