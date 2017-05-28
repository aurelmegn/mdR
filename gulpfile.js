/**
 * Created by aurel on 5/27/17.
 */

var gulp = require('gulp'),
    minJs = require('gulp-uglify'),
    spa = require('gulp-spa'),
    useref = require('gulp-useref'),
    filter = require('gulp-filter'),
    stripcomments = require('gulp-strip-comments');


gulp.task('dist',function () {

    const jsFilter = filter('assets/js/*.js', {restore: true});
    const sassFilter = filter('assets/sass/*.scss', {restore: true});

    return gulp.src('**/*.html')

        .pipe(useref())
        .pipe(stripcomments())

        .pipe(jsFilter)
        // .pipe(minJs())
        .pipe(jsFilter.restore)

        .pipe(gulp.dest('dist'));
});