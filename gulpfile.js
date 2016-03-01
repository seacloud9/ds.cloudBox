/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var path = require("path");
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var derequire = require('gulp-derequire');
var shell = require('gulp-shell');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var destination = 'src/app/es6/'; 
var _paths = {
    es6: ["src/app/es6/**.jsx"]
};



gulp.task("es6Build", function () {
    return gulp.src(_paths.es6)
            .pipe(sourcemaps.init())
            .pipe(babel({modules: 'common'}))
            .pipe(derequire())
            .pipe(browserify({
              insertGlobals : false
            }))
            .pipe(sourcemaps.write())
            .pipe(uglify())
            .pipe(gulp.dest(destination));
});



/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
