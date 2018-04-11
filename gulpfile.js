const gulp = require('gulp');
const sass = require('gulp-sass');
const miniftCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');
const st = require('st');
const http = require('http');

gulp.task('server', function(done) {
    http.createServer(
      st({ path: __dirname + '/dist', index: 'views/index.html', cache: false })
    ).listen(8080, done);
  });  

gulp.task('html', () => {
    return gulp.src('./templates/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('./dist/views'))
      .pipe(livereload({start: true}));
  });

//compile css
gulp.task('css', () => {
    return gulp.src('./sass/*.sass')
    .pipe(sass())
    .on('error', function (err) {
        console.log(err.toString());

        this.emit('end');
    })
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload({start: true}))
});

gulp.task('js', () => {
    return gulp.src('./js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload({start: true}));
});

gulp.task('watch', () => {
    livereload.listen({ basePath: 'dist', start: true, debug: true });
    gulp.watch(['templates/*.pug'], ['html']);
    gulp.watch(['sass/*.sass'], ['css']);
    gulp.watch(['js/*.js'], ['js']);
});

gulp.task('default', [ 'html', 'css', 'js', 'watch', 'server' ]);