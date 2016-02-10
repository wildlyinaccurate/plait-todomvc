import gulp from 'gulp'
import gutil from 'gulp-util'
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import jsxTransform from 'jsx-transform'
import eslint from 'gulp-eslint'

gulp.task('default', ['build', 'lint'])

gulp.task('build', () => {
  const jsxify = jsxTransform.browserifyTransform.configure({
    factory: 'h'
  })

  const b = browserify('src/Main.js', {
    transform: [jsxify, 'babelify'],
    paths: ['./src']
  })

  return b.bundle()
    .on('error', (error) => gutil.log('Browserify Error:', error.toString()))
    .pipe(source('app.js'))
    .pipe(gulp.dest('js'))
})

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
