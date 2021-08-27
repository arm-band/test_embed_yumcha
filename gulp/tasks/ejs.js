const { src, dest, parallel } = require('gulp');
const plumber       = require('gulp-plumber');
const notify        = require('gulp-notify');
const rename        = require('gulp-rename');
const ejs           = require('gulp-ejs');
const data          = require('gulp-data');
const dir           = require('../dir');

//ejs
const ejsBuild = () => {
    return src(
        `${dir.src.ejs}/**/*.ejs`,
        {
            ignore: [
                `${dir.src.ejs}/**/_*.ejs`,
                `${dir.src.ejs}/embed/*.json.ejs`
            ]
        }
    )
    .pipe(plumber({
        errorHandler: notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'ejs'
        })
    }))
    .pipe(data((file) => {
        return { 'filename': file.path }
    }))
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest(dir.dist.html));
};

//json
const jsonBuild = () => {
    return src(
        `${dir.src.ejs}/embed/*.json.ejs`
    )
    .pipe(plumber({
        errorHandler: notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'json'
        })
    }))
    .pipe(data((file) => {
        return { 'filename': file.path }
    }))
    .pipe(ejs())
    .pipe(rename({ extname: '' }))
    .pipe(dest(`${dir.dist.html}/embed/`));
};

//上記をまとめておく
module.exports = parallel(ejsBuild, jsonBuild);
