const { src, dest, parallel, series, watch } = require("gulp");
const del = require("del");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const cache = require("gulp-cache");
const replace = require("gulp-replace");

const webpackStream = require("webpack-stream");
const concat = require("gulp-concat");
const webpack = require("webpack");

const sass = require("gulp-sass");
const group_media = require("gulp-group-css-media-queries");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const cleanCSS = require("gulp-clean-css");

const imagemin = require("gulp-imagemin");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const webp = require("gulp-webp");
const svgSprite = require("gulp-svg-sprite");
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");

const webpackConfig = require("./webpack.config.js");

const clean = () => del(["./dist/*"]);

const styles = () => {
  return src(["./src/scss/styles.scss"])
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: "./node_modules/",
      }).on("error", notify.onError())
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version", "> 1%", "IE 7"],
        cascade: true,
        grid: true,
      })
    )
    .pipe(group_media())
    .pipe(
      cssbeautify({
        indent: "    ",
        openbrace: "end-of-line",
        autosemicolon: true,
      })
    )
    .pipe(dest("./dist/css/"))
    .pipe(
      cleanCSS(
        {
          debug: true,
          compatibility: "ie7",
        },
        (details) => {
          notify(`${details.name}: ${details.stats.originalSize}`);
          notify(`${details.name}: ${details.stats.minifiedSize}`);
        }
      )
    )
    .pipe(
      rename({
        suffix: ".min",
        extname: ".css",
      })
    )
    .pipe(dest("./dist/css/"));
};

const images = () => {
  return src([
    "./src/images/**/*.{jpg,jpeg,png,gif}",
    "!./src/images/svg/**",
    "!./src/images/webp/**",
  ])
    .pipe(
      cache(
        imagemin(
          [
            imagemin.gifsicle({ interlaced: true }),
            // imagemin.mozjpeg(),
            imageminJpegRecompress({
              loops: 5,
              min: 70,
              max: 75,
              quality: "hight",
            }),
            imagemin.optipng({ optimizationLevel: 3 }),
            pngquant({ quality: [0.65, 0.7], speed: 5 }),
          ],
          {
            verbose: true,
          }
        )
      )
    )
    .pipe(dest("./dist/images"));
};

const scripts = () => {
    src(["./src/js/vendor/**.js"])
    .pipe(concat("vendor.js"))
    .pipe(dest("./dist/js/"));

    return src(["./src/js/scripts.js"])
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(rename("scripts.min.js"))
    .pipe(dest('./dist/js/'));
};

const imagesWebp = () => {
  return src([
    "./src/images/**/*.{jpg,jpeg,png}",
    "!./src/images/svg/**",
    "!./src/images/webp/**",
  ])
    .pipe(webp())
    .pipe(dest("./dist/images/webp"));
};

const imagesSvg = () => {
  return src(["./src/images/svg/**/*.svg"])
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(dest("./dist/images/svg"))
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "sprite.svg",
          },
        },
      })
    )
    .pipe(dest("./dist/images/svg"));
};

const fonts = () => {
  return src("./src/fonts/**").pipe(dest("./dist/fonts"));
};

const resources = () => {
  return src("./src/resources/**/**").pipe(dest("./dist/resources"));
};

const clearCache = () => cache.clearAll();

const watchFiles = () => {
  watch(["./src/scss/**/*.scss"], styles);
  watch(["./src/js/**/*.js"], scripts);
  watch(
    [
      "./src/images/**/*.{jpg,jpeg,png,gif}",
      "!./src/images/svg/**",
      "!./src/images/webp/**",
    ],
    images
  );
  watch(
    [
      "./src/images/**/*.{jpg,jpeg,png}",
      "!./src/images/svg/**",
      "!./src/images/webp/**",
    ],
    imagesWebp
  );
  watch(["./src/images/svg/**/*.svg"], imagesSvg);
  watch(["./src/resources/**"], resources);
  watch(["./src/fonts/**.woff2"], fonts);
};

exports.default = series(
  clean,
  clearCache,
  styles,
  scripts,
  images,
  imagesWebp,
  imagesSvg,
  fonts,
  resources,
  watchFiles
);
exports.clean = clean;
exports.clearCache = clearCache;
