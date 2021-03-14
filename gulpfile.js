const {src, dest, series, parallel, watch} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const  uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const {existsSync} = require('fs')
const path = './dist'

function cleanDist(cb){
    if(existsSync(path)){
        console.log('true')
        return src('./dist', {read: false}).pipe(clean())
    }else{
        cb();
    }
}

function copyHtml(){
    return src('./src/index.html',).pipe(dest('./dist'));
}
function copyCss(){
    return src('./src/style/styles.css',)
    .pipe((cleanCSS()))
    .pipe(dest('./dist'));
}
function copyJs() {
    return src('./src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('./dist'));
}
function watchFiles(){
    watch('./src/scripts/*.js', {events: 'all'}, () => copyJs());
    watch('./src/style/styles.css', {events: 'all'}, () => copyCss());
}


module.exports = {
    build: series(cleanDist, parallel(copyHtml,copyJs,copyCss)),
    serve: series(cleanDist, parallel(copyHtml,copyJs,copyCss),watchFiles),
}