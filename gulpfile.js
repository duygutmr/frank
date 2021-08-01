const { src, dest, watch, series, parallel, task } = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    compileSass = require('gulp-dart-sass'),
    minifyCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    include = require('gulp-html-tag-include'),
    nunjucksRender = require("gulp-nunjucks-render"),
    gls = require("gulp-live-server")
    image=require("gulp-image")
;

const processors = [
    autoprefixer({
        overrideBrowserslist: [
            '>= 1%',
            'last 1 major version',
            'Chrome >= 45',
            'Firefox >= 38',
            'Edge >= 12',
            'Explorer >= 10',
            'iOS >= 9',
            'Safari >= 9',
            'Android >= 4.4',
            'Opera >= 30'
        ],
        map: false
    })
];

function sass() {
    return src("src/assets/sass/*.scss")
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(postcss(processors))
        .pipe(dest("dist/assets/css/"))
        .pipe(minifyCss({
            level: { 1: { specialComments: 0 } }
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(dest("dist/assets/css/"));
}

function css(){
    return src("src/assets/css/**/*.*")
        .pipe(dest("dist/assets/css/"))

        ;
}

function fonts() {
    return src("src/assets/fonts/**/*.*")
        .pipe(dest("dist/assets/fonts/"));
}

function images() {
    return src("src/assets/img/**/*.*")
        .pipe(image())
        .pipe(dest("dist/assets/img/"))
        ;
}

function svg() {
    return src("src/assets/svg/**/*.*")
        .pipe(image())
        .pipe(dest("dist/assets/svg/"))
        ;
}

function js() {
    return src("src/assets/js/**/*.js")
        .pipe(include())
        .pipe(uglify())
        .pipe(dest('dist/assets/js'));
}

function html() {
    return src("src/*.html")
        .pipe(include())
        .pipe(nunjucksRender({
            path: [
                'src/',
                'src/templates/',
                'src/templates/components',
            ] // String or Array
        }))
        .pipe(dest('dist'));
}

function htmlPages(){
   return src("src/*.html")
       .pipe(include())
       .pipe(nunjucksRender({
           path: [
               'src/',
               'src/templates/',
               'src/templates/components',
           ] // String or Array
       }))
       .pipe(dest('dist'))
       ;
}

function watchSaaS(){
    return watch("src/assets/sass/**/*.scss", series(sass))
}

function watchCSS(){
    return watch("src/assets/css/*.*", series(css))
}

function watchHTML(){
    return watch("src/**/*.html", series(html,htmlPages))
}

function watchImages(){
    return watch("src/assets/img/**/*.*", series(images))
}

function watchSVG(){
    return watch("src/assets/svg/**/*.*", series(svg))
}

function watchJS(){
    return watch("src/assets/js/**/*.*", series(js))
}


function serve(){
    var server = gls.static("dist",4545);
    server.start();
    watchSaaS();
    watchCSS();
    watchHTML();
    watchImages();
    watchSVG();
    watchJS();
}


exports.default = series(sass, fonts, js, html,htmlPages, images, svg, css);
exports.lite = series(sass, fonts, js, html,htmlPages, css);
exports.serve = series(serve);