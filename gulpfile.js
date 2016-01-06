'use strict';

var gulp = require('gulp'),

	typescript = require('gulp-typescript'),

	sass = require('gulp-sass'),

	sourcemaps = require('gulp-sourcemaps'),

	autoprefixer = require('gulp-autoprefixer'),

	minifycss = require('gulp-minify-css'),

	jshint = require('gulp-jshint'),

	uglify = require('gulp-uglify'),

	rename = require('gulp-rename'),

	concat = require('gulp-concat'),

	notify = require('gulp-notify'),

	cache = require('gulp-cache'),

	livereload = require('gulp-livereload');

// Styles task
gulp.task('styles', function() {

	// Import file
	return gulp.src('./src/sass/sharify.scss')

	// .pipe(sourcemaps.init())

	// Compile sass
	.pipe(sass({
		outputStyle: 'expanded'
	}))

	// Add prefix
	.pipe(autoprefixer({
		browsers: ['last 6 versions'],
		cascade: false
	}))

	// Output sourcemaps file to the specified directory
	// .pipe(sourcemaps.write())

	// Output uncompressed file to the specified directory
	.pipe(gulp.dest('./dist/css'))
	.pipe(gulp.dest('./src/css'))

	// Add '.min' suffix to the file
	.pipe(rename({
		suffix: '.min'
	}))

	// Style file compress
	.pipe(minifycss())

	// Output the compressed file to the specified directory
	.pipe(gulp.dest('./dist/css'))
	.pipe(gulp.dest('./src/css'))

	// Task completed tips
	.pipe(notify({
		message: 'Styles task completed'
	}));
});

// TypeScript
gulp.task('tscripts', function () {
	return gulp.src('./src/ts/*.ts')

		.pipe(typescript({
			noImplicitAny: true,
			out: 'sharify.js'
		}))

		.pipe(gulp.dest('./src/js'))

		.pipe(notify({
			message: 'TypeScript task completed'
		}));
});

// Scripts
gulp.task('scripts', function() {

	return 	gulp.src('./src/js/*.js')

	.pipe(jshint())

	// .pipe(sourcemaps.init())

	.pipe(jshint.reporter('default'))

	.pipe(gulp.dest('./dist/js'))

	// Output sourcemaps file to the specified directory
	// .pipe(sourcemaps.write())

	.pipe(concat('sharify.js'))

	.pipe(rename({
		suffix: '.min'
	}))

	.pipe(uglify())

	.pipe(gulp.dest('./dist/js'))

	.pipe(notify({
		message: 'Scripts task completed'
	}));
});

// Default task
gulp.task('default', function() {
	gulp.start('styles', 'scripts', 'tscripts');
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('./src/sass/*.scss', ['styles']);

	// Watch .js files, webpack --watch
	gulp.watch('./src/js/*.js', ['scripts']);

	// Watch .ts files, webpack --watch
	gulp.watch('./src/ts/*.ts', ['tscripts']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in dist/, reload on change
	gulp.watch(['./dist/*']).on('change', livereload.changed);
});