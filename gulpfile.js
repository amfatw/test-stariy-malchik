import gulp from 'gulp'
import fileInclude from 'gulp-file-include'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import server from 'gulp-server-livereload'
import {deleteSync} from 'del'
import babel from 'gulp-babel'
import htmlmin  from 'gulp-htmlmin'
import autoprefixer  from 'gulp-autoprefixer'
import gcmq from 'gulp-group-css-media-queries'
import csso from 'gulp-csso'

const pathsToClean = {
  all: './dist',
  html: './dist/*.html',
  css: './dist/*.css',
  js: './dist/*.js',
  images: './dist/images',
  fonts: './dist/fonts',
}

const clean = (filesToDelete, done) => {
  deleteSync(pathsToClean[filesToDelete])
  done()
}

const fileIncludeSettings = {prefix: '@@', basepath: '@file'}
const htmlDev = () => (
  gulp.src('./src/html/*.html')
  .pipe(fileInclude(fileIncludeSettings))
  .pipe(gulp.dest('./dist/'))
)
const htmlProd = () => (
  gulp.src('./src/html/*.html')
  .pipe(fileInclude(fileIncludeSettings))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./dist/'))
)

const scss = gulpSass(sass)
const cssDev = () => (
  gulp.src('./src/styles/main.scss')
  .pipe(scss())
  .pipe(autoprefixer())
  .pipe(gcmq())
  .pipe(gulp.dest('./dist'))
)
const cssProd = () => (
  gulp.src('./src/styles/main.scss')
  .pipe(scss())
  .pipe(autoprefixer())
  .pipe(gcmq())
  .pipe(csso())
  .pipe(gulp.dest('./dist'))
)

const images = () => (
  gulp.src('./src/images/**/*')
  .pipe(gulp.dest('./dist/images'))
)

const fonts = () => (
  gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'))
)

const js = () => (
  gulp.src('./src/js/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('./dist'))
)

const serverSettings = {livereload: true, open: true}
const serve = () => (
  gulp.src('./dist/')
  .pipe(server(serverSettings))
)

const watch = () => {
  gulp.watch(
    './src/styles/**/*',
    gulp.series(
      (done) => clean('css', done),
      cssDev
    )
  )
  gulp.watch(
    './src/html/**/*.html',
    gulp.series(
      (done) => clean('html', done),
      htmlDev
    )
  )
  gulp.watch(
    './src/js/**/*.js',
    gulp.series(
      (done) => clean('js', done),
      js
    )
  )
  gulp.watch(
    './src/images/**/*',
    gulp.series(
      (done) => clean('images', done),
      images
    )
  )
  gulp.watch(
    './src/fonts/**/*',
    gulp.series(
      (done) => clean('fonts', done),
      fonts
    )
  )
}

const dev = gulp.series(
  (done) => clean('all', done),
  gulp.parallel(htmlDev, cssDev, js, images, fonts),
  gulp.parallel(watch, serve)
)

const build = gulp.series(
  (done) => clean('all', done),
  gulp.parallel(htmlProd, cssProd, js, images, fonts)
)


export { dev, build }