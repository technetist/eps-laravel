let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .js('resources/assets/js/chartapp.js', 'public/js')
   .js('resources/assets/js/client.js', 'public/js')
   .js('resources/assets/js/vueclient.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
mix.copyDirectory('resources/images', 'public/images');
mix.copy('resources/assets/css/vue.css', 'public/css');
