const gulp = require('gulp')
const mocha = require('gulp-mocha')
const plumber = require('gulp-plumber')
const watch = require('gulp-watch')

gulp.task('default', ['test'])

gulp.task('test', () => {
  return gulp.src('test/test-*.js', {read: false})
    .pipe(mocha())
})

gulp.task('watch', () => {
  return gulp.src(['lib/**/*.js', 'test/test-*.js'])
    .pipe(watch(['lib/**/*.js', 'test/test-*.js']))
    .pipe(plumber())
    .pipe(mocha())
})
