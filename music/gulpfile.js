var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlmin = require("gulp-htmlmin");
var htmlclean = require("gulp-htmlclean");
var uglify = require("gulp-uglify");
var strip = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");

var devMode = process.env.NODE_ENV == "development"
console.log(devMode);

var folder ={
	src: "./src/",
	build: "./build/"
}

gulp.task("images",function(){
	gulp.src(folder.src + "images/*")
	    .pipe(newer(folder.build + "images"))
	    .pipe(imagemin())
	    .pipe(gulp.dest(folder.build + "images/"))
})

gulp.task("html",function(){
	var page = gulp.src(folder.src + "html/*")
	    .pipe(connect.reload())
	if(!devMode){
	    page.pipe(htmlclean())
	    page.pipe(htmlmin())
	}
	    page.pipe(gulp.dest(folder.build + "html/"))
})

gulp.task("js",function(){
	var page = gulp.src(folder.src + "js/*")
	    .pipe(connect.reload())
	if(!devMode){
        page.pipe(strip())
	    page.pipe(uglify())
	}
	    page.pipe(gulp.dest(folder.build + "js/"))
})

gulp.task("css",function(){
	var options = [autoprefixer(),cssnano()];
	gulp.src(folder.src + "css/*")
	    .pipe(less())
	    .pipe(connect.reload())

	    .pipe(postcss(options))
	   
	    .pipe(gulp.dest(folder.build + "css/"))

})

gulp.task("watch",function(){
	gulp.watch(folder.src + "html/*",["html"])
	gulp.watch(folder.src + "js/*",["js"])
	gulp.watch(folder.src + "css/*",["css"])
	gulp.watch(folder.src + "images/*",["images"])
})

gulp.task("server",function(){
	connect.server({
		port:"8080",
		livereload:true
	});
})

gulp.task("default",["html","images","js","css","watch","server"],function(){
});