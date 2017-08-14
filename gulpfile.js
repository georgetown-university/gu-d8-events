var gulp   = require('gulp');
var sass   = require('gulp-sass');
var clean  = require('gulp-clean-css');
var rename = require('gulp-rename');
var watch  = require('gulp-watch');

gulp.task('default', ['watch', 'css']);

gulp.task('watch', function() {
	gulp.watch('assets/_sass/**/*.scss', ['css']);
});

gulp.task('css', function() {
	return gulp.src('assets/_sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
    .pipe(clean())
    .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('assets/css'));
});
