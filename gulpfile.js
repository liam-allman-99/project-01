const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const paths = {
  styles: {
    src: 'scss/src/*.scss',
    dest: 'scss/dist/'
  },
  scripts: {
    src: 'js/src/*.js',
    dest: 'js/dist/'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'global',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest)); // Output to a new directory
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('global.min.js'))
    .pipe(gulp.dest(paths.scripts.dest)); // Output to a new directory
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

const build = gulp.parallel(styles, scripts); // No need for clean in build task

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;