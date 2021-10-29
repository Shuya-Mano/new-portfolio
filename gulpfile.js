//----------------------------------------------------------------------
//  モード
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");

const plumber = require("gulp-plumber");
const sassGlob = require("gulp-sass-glob");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const imageMin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

const purgecss = require("gulp-purgecss");
const cleancss = require("gulp-clean-css");

const uglify = require("gulp-uglify");
const bs = require("browser-sync");

//----------------------------------------------------------------------
//  関数定義
//----------------------------------------------------------------------
function compile(done) {
  src("./scss/style.scss")
    .pipe(plumber()) // watch中にエラーが発生してもwatchが止まらないようにする
    .pipe(sassGlob()) // glob機能を使って@import文を省略する
    .pipe(sass()) // sassのコンパイルをする
    .pipe(autoprefixer()) // ベンダープレフィックスを自動付与する
    .pipe(dest("./css"));

  bs({
    server: {
      baseDir: "./",
    },
    startPath: "./index.html", // 開きたいパスを指定する
    files: "./**", // 指定した値が変更されるとブラウザをリロードする
    port: 3000, // browsersyncサーバが使うポート番号を変更できる
    notify: false, // ブラウザ更新時に出てくる通知を非表示にする
    open: "external", // ローカルIPアドレスでサーバを立ち上げる
  });

  done();
}

function sass_watch() {
  return watch("./scss/**/*.scss", compile);

  done();
}

function imagemin(done) {
  src("./sample-image/**")
    .pipe(changed("./image")) // 追加
    .pipe(
      imageMin([
        pngquant({
          // quality: [0.6, 0.7],
          quality: [0.3, 0.4],
          speed: 1,
        }),
        // mozjpeg({ quality: 65 }),
        mozjpeg({ quality: 30 }),
        imageMin.svgo(),
        imageMin.optipng(),
        imageMin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(dest("./image"));

  done();
}

function minify(done) {
  src("./css/*.css")
    .pipe(plumber()) // watch中にエラーが発生してもwatchが止まらないようにする
    .pipe(
      purgecss({
        content: ["./*.html", "./js/*.js", "./css/*.css"], // src()のファイルで使用される可能性のあるファイルを全て指定
      })
    )
    .pipe(cleancss()) // コード内の不要な改行やインデントを削除
    .pipe(dest("./css"));

  src("./js/main.js")
    .pipe(plumber()) // watch中にエラーが発生してもwatchが止まらないようにする
    .pipe(uglify()) // コード内の不要な改行やインデントを削除
    .pipe(dest("./js"));

  done();
}
//----------------------------------------------------------------------
//  タスク定義
//----------------------------------------------------------------------
exports.default = series(compile, sass_watch);
exports.imagemin = series(imagemin);
exports.minify = series(minify);

/************************************************************************/
/*  END OF FILE                                                         */
/************************************************************************/