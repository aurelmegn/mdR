/**
 * Created by aurel on 5/27/17.
 */

var gulp = require('gulp'),
    minJs = require('gulp-uglify'),
    spa = require('gulp-spa'),
    useref = require('gulp-useref'),
    filter = require('gulp-filter'),
    zip = require('gulp-zip'),
    stripcomments = require('gulp-strip-comments');


const htmlFilter = filter(['*.html','partials*/.*'], {restore: true});

gulp.task('dist',function () {

    return gulp.src(['index.html','p*/*'])

        .pipe(useref())

        .pipe(htmlFilter)

         .pipe(stripcomments())

        .pipe(htmlFilter.restore)

        .pipe(gulp.dest('dist'));
});

gulp.task('moveSvg',function () {

    return gulp.src(['assets*/svg*/*'])

        .pipe(gulp.dest('dist/'))
});

gulp.task('moveImg',function () {

    return gulp.src(['assets*/img*/*'])

        .pipe(gulp.dest('dist/'))
});

gulp.task('movePhp',function () {

    return gulp.src(['api*/*'])

        .pipe(gulp.dest('dist/'))
});

gulp.task('moveFonts',function () {

    return gulp.src(['assets*/fonts*/*'])

        .pipe(gulp.dest('dist/'))
});

gulp.task('minifyLocaleJs',function () {

    return gulp.src(['assets*/*/*.js'])

        .pipe(minJs())
        .pipe(gulp.dest('dist/'))
});
gulp.task('minifyAngularHighlightJs',function () {

    return gulp.src(['node_*/angular-*/*.js'])

        .pipe(minJs())
        .pipe(gulp.dest('dist/'))
});
gulp.task('minifyHighlightJs',function () {

    return gulp.src(['node_*/hig*/*.js'])

        .pipe(minJs())
        .pipe(gulp.dest('dist/'))
});

gulp.task('zipDist',['moveImg','moveSvg','moveFonts','movePhp','minifyLocaleJs','minifyAngularHighlightJs','minifyHighlightJs','dist'],function () {

    return gulp.src(['dist/**'])

        .pipe(zip('mdR.zip'))

        .pipe(gulp.dest('./'))
});



gulp.task('default',['zipDist'],function () {


 console.log('\n \n \n \n \t\t DIST DIRECTORY CREATE WITH SUCCESS :) \n\n \n \n \n ');


});