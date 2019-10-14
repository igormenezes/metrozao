const gulp = require('gulp')
const sass = require('gulp-sass')
const ejs = require("gulp-ejs")
const sourcemaps = require('gulp-sourcemaps')
const livereload = require('gulp-livereload')
const del = require('del')

path = {
	src:'/www-src',
	dist:'/www'
}

// compile tasks ///////////////////////////////////////////////////////////////
gulp.task('sass', ()=>{
  return gulp.src('.'+path.src+'/scss/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'+path.dist+'/css'))
		.pipe(livereload())
})
gulp.task('ejs', ()=>{
  return gulp.src(['.'+path.src+'/*.ejs', '!.'+path.src+'/_*'])
    .pipe(ejs({}, {ext:'.html'}))
    .pipe(gulp.dest('.'+path.dist))
		.pipe(livereload())
})

// watch ///////////////////////////////////////////////////////////////////////
gulp.task('watch', ()=>{
	livereload.listen()
	gulp.watch(['.'+path.src+'/*.ejs', '.'+path.src+'/*.html'], ['ejs'])
	gulp.watch('.'+path.src+'/scss/**', ['sass'])
})

// development server //////////////////////////////////////////////////////////
gulp.task('serve', ()=>{
    const chalk = require('chalk')
    const express = require('express')
    const devServer = express()
    const port = 80
    const paths = [
        {url:'/', path:path.dist}
    ]
    devServer.use((req, res, next)=>{
      console.log(chalk.inverse(' 127.0.0.1'+(port===80?'':':'+port)+' '), chalk.green(req.path))
      next()
    })
    paths.forEach((item,i)=>{
        devServer.use(item.url, express.static(__dirname+item.path))
        console.log('serving', chalk.gray(__dirname)+chalk.cyan(item.path), '@'+chalk.cyan(item.url))
    })
    devServer.listen(port)
    console.log(chalk.inverse(' 127.0.0.1'+(port===80?'':':'+port)+' '), chalk.green('online'))
})

// task groups /////////////////////////////////////////////////////////////////
gulp.task('default', ['sass', 'ejs', 'serve', 'watch'])
