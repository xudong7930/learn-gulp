var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

gulp.task('js', function () {
    return gulp.src('./js/main.js')
        .pipe(browserify({
            debug: false
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./js/'));
});

gulp.task('compress', function () {
    return gulp.src('./js/bundle.js')
        .pipe(uglify())
        .on('error', function (err) { 
            gutil.log(gutil.colors.red('[Error]'), err.toString()); 
        })
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('./js/'));
});

gulp.task('watch', function () {
    gulp.watch('./js/**/*.js', ['js']);
});
