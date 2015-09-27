// slightly ahead of the deployment branches
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var jest = require('gulp-jest-iojs');
var streamify = require('gulp-streamify');
var ignore = require('gulp-ignore');

gulp.task('default', ['jshint', 'test', 'build'], function() {
  gulp.watch(['src/**/**.js'], ['jshint', 'test', 'build']);
});

gulp.task('build', function() {
  return browserify({
    entries: ['./src/ace.js'],
    debug: true
  })
    .bundle()
    .pipe(source('ace.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('test', function() {
  return gulp.src('test').pipe(jest({
    verbose: true,
    scriptPreprocessor: "../node_modules/babel-jest",
    testDirectoryName : 'test',
    unmockedModulePathPatterns: [
      ".*/node_modules/react-*."
    ]
  }));
});

gulp.task('release', function() {
  return browserify({
    entries: ['./src/ace.js']
  })
    .bundle()
    .pipe(source('react-ace.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('example', function() {
  return browserify({
    entries: ['./example/example.js'],
    debug: true
  })
    .bundle()
    .pipe(source('example.js'))
    .pipe(gulp.dest('build'));
});


gulp.task('jshint', function() {
  gulp.src('src/**/**.js')
    .pipe(babel())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
