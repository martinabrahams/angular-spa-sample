var Promise = require('es6-promise').Promise;

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('gulp-main-bower-files');

gulp.task('sass:base', function () {
    return gulp.src('./src/shared/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'ios >= 7'] }))
        .pipe(sourcemaps.write({ debug: true }))
        .pipe(gulp.dest('./build/shared/css'))
});

gulp.task('js', function () {
    return gulp.src([
        './src/app/js/app.js',
        './src/app/js/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/app/js'));
});

gulp.task('fonts', function() {
    return gulp.src('./src/**/*.{ttf, otf, svf, woff}')
        .pipe(gulp.dest('./build/'))
});

gulp.task('images', function() {
    return gulp.src('./src/**/*.{jpg,png}')
        .pipe(gulp.dest('./build/'))
});

gulp.task('assets', function() {
    return gulp.src('./src/**/*.{html,json}')
        .pipe(gulp.dest('./build/'))
});


gulp.task("bower-files", function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('./build/libs')).pipe(gulp.dest('./src/libs'));
});

gulp.task('watch', ['sass:base', 'js', 'fonts', 'images', 'bower-files', 'assets'], function () {
    gulp.watch('src/**/*{html,json}',{cwd:'./'}, ['assets']);
    gulp.watch('src/**/*.js',{cwd:'./'}, ['js']);
    gulp.watch('src/**/*.{ttf, otf, svf, woff}',{cwd:'./'}, ['fonts']);
    gulp.watch('src/**/*.{jpg,png}',{cwd:'./'}, ['images']);
    gulp.watch('bower_components/**/*',{cwd:'./'}, ['bower-files']);
});





gulp.task('dist-sass:base', function () {
    return gulp.src('./src/shared/sass/**/*.scss')
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'ios >= 7'] }))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/shared/css'))
});

gulp.task('dist-js', function () {
    return gulp.src([
        './src/app/js/app.js',
        './src/app/js/**/*.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./dist/app/js'));
});

gulp.task('dist-fonts', function() {
    return gulp.src('./src/**/*.{ttf, otf, svf, woff}')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('dist-images', function() {
    return gulp.src('./src/**/*.{jpg,png}')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('dist-assets', function() {
    return gulp.src('./src/**/*.{html,json}')
        .pipe(gulp.dest('./dist/'))
});

gulp.task("dist-bower-files", function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('./dist/libs')).pipe(gulp.dest('./src/libs'));
});

gulp.task('connect', function() {
    connect.server({
        port: 8888,
        root: 'build'
    });
});

gulp.task('dist', ['dist-sass:base', 'dist-js', 'dist-fonts', 'dist-images', 'dist-assets', 'dist-bower-files']);