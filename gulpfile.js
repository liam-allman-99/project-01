const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const connectPhp = require('gulp-connect-php');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// 
// FIX JS IN FILE
// 

// Task to minify and bundle JavaScript using Browserify
gulp.task('minify-js', function () {
  return browserify('./js/src/main.js') // Entry point for your JavaScript files
    .bundle()
    .pipe(source('bundle.js')) // Output filename after bundling
    .pipe(uglify()) // Minify the bundled JavaScript
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./js/dist/'));
});

// Task to compile SCSS to CSS and minify
gulp.task('minify-css', function () {
  return gulp.src('./scss/src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./scss/dist/'));
});

// Task to start PHP server and watch for changes
gulp.task('serve', function(done) {
  connectPhp.server({ base: './', port: 8100 }, function (){
    gulp.watch('./js/src/*.js', gulp.series('minify-js'));
    gulp.watch('./scss/src/*.scss', gulp.series('minify-css'));
    
    // Watch for changes in all files and trigger browser reload
    gulp.watch(['./**/*.php', './js/src/*.js', './scss/src/*.scss']).on('change', browserSync.reload);

    done();
  });
});

// Task to initialize BrowserSync and proxy it to PHP server
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: '127.0.0.1:8100', // Assuming your PHP server is running on localhost port 8100
    port: 3000, // BrowserSync port
  });
});

// Default task to start both the PHP server and BrowserSync
gulp.task('default', gulp.series('serve', 'browser-sync', 'minify-js', 'minify-css'));
