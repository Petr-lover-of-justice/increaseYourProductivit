const {src, dest, watch}= require("gulp");
const gulp = require("gulp")
const sass = require('gulp-sass');
const browerSyns = require('browser-sync').create();
const gulpStylelint = require("gulp-stylelint");

function style() {
    return src('./css/**/*.scss')
    .pipe(gulpStylelint({
        reporters:[{
            formatter:"string",
            console: true
        }
    ]
    }))
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browerSyns.stream())
}

function watcher () {
    browerSyns.init({
        server:{
            baseDir:'./'
        }
    })
    watch('./css/**/*.scss', style);
    watch('./*.html').on("change", browerSyns.reload);
    watch("./js/**/*.js").on("change", browerSyns.reload);
}

exports.style = style;
exports.watch = watcher;

// gulp.task('lint-css', function lintCssTask() {
//     const gulpStylelint = require('gulp-stylelint');
  
//     return gulp
//       .src('src/**/*.css')
//       .pipe(gulpStylelint({
//         reporters: [
//           {formatter: 'string', console: true}
//         ]
//       }));
//   });