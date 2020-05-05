const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function() {

  await gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!
=========================================================
* Get Tested COVID19 - V1.0.0
=========================================================

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Get Tested COVID19 - V1.0.0
=========================================================

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  await gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Get Tested COVID19 - V1.0.0
=========================================================

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
