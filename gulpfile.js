'use strict';  

// gulp
var gulp = require('gulp');

// gulp component
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
// var babel = require("gulp-babel");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var path = require('path');
var del = require('del');

let base = {src: 'src',public: 'public'};
let assets = base.public + '/assets';
let paths = {
    styles: {
        src: base.src + '/scss/**/*.scss',
        dest: assets + '/css'
    },
    scripts: {
        dir: base.src + '/js',
        src: base.src + '/js/**/*.js',
        dest: assets + '/js'
    },
    images: {
        dir: base.src + '/img',
        src: base.src + '/img/**/*',
        dest: assets + '/img',
        icon: base.src + '/img/meta/favicon-152.png'
    },
    static: {
        src: base.src + '/static/**/*',
        dest: assets + '/static'
    }
}


// clean
gulp.task('clean', function (cb) {
    return del(assets, cb);
})

// styles
gulp.task('styles', function() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}))
        .on('error', function (error) {
            console.info(error);
        })
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        )
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
});


// js sytax check
gulp.task('jslint', function () {
    return gulp.src(paths.scripts.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('scripts', function () {
    return gulp.src(paths.scripts.src)
        .pipe(browserify({
            debug: false
        }))
        .on('error', function (error) {
            console.info(error);
        })
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        // .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});


// html minify
gulp.task('html', function () {
    gulp.src(['./index.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});




// ./node_modules/.bin/gulp watch
gulp.task('watch', function () {
    // broser
    browserSync.init({

    });

    // watch
    // gulp.watch(, ['styles']);
    // gulp.watch(, ['scripts']);
    // gulp.watch(, ['images']);
    // gulp.watch(, ['static']);
});

// ./node_modules/.bin/gulp
gulp.task('default', function () {
    gulp.start(['clean', 'styles']); //'scripts', 'images', 'static'
});


