var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('gulp-browserify');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var injectPartials = require('gulp-inject-partials');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');


var SOURCEPATHS ={
    sassSource : 'src/scss/*.scss',
    sassApp : 'src/scss/app.scss',
    htmlSource : 'src/*.html',
    htmlPartialSource : 'src/partial/*.html',
    jsSource : 'src/js/**',
    imgSource : 'src/img/**'
}
var APPPATH ={
    root: 'app/',
    css : 'app/css',
    js : 'app/js',
    img: 'app/img'
}

gulp.task('clean-html', function(){
    return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
        .pipe(clean());
});

gulp.task('clean-scripts', function(){
    return gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
        .pipe(clean());
});

gulp.task('clean-images', function(){
    return gulp.src(APPPATH.img + '/**', {read: false, force: true})
    .pipe(clean());
});
gulp.task('sass', function(){ 
    var SassFiles;

    SassFiles = gulp.src(SOURCEPATHS.sassApp)
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))    
    return merge(SassFiles)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('images',['clean-images'], function(){
    return gulp.src(SOURCEPATHS.imgSource)
        .pipe(newer(APPPATH.img))
        .pipe(imagemin())
        .pipe(gulp.dest(APPPATH.img));
});

gulp.task('scripts', ['clean-scripts'], function(){
    gulp.src(SOURCEPATHS.jsSource)
        .pipe(concat('main.js'))
        .pipe(browserify())
        .pipe(gulp.dest(APPPATH.js))
});
/* zadania na koniec produkcji*/
/* zmniejsza plik z javascriptem,*/
gulp.task('compress', function(){
    gulp.src(SOURCEPATHS.jsSource)
        .pipe(concat('main.js'))
        .pipe(browserify())
        .pipe(minify())
        .pipe(gulp.dest(APPPATH.js))
});

gulp.task('compresscss', function(){ 
    var SassFiles;

    SassFiles = gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))    
    return merge(SassFiles)
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(APPPATH.css));
});
/*to sobie pierdolnij i zobacz :D, ale dodaj jakiegos diva najpierw */
gulp.task('minifyHtml', function(){
    return gulp.src(SOURCEPATHS.htmlSource)
        .pipe(injectPartials())
        .pipe(gulp.dest(APPPATH.root))
});

gulp.task('production', ['minifyHtml','compresscss', 'compress' ]);

/*koniec zadan produkcji*/

gulp.task('html', function(){
    return gulp.src(SOURCEPATHS.htmlSource)
        .pipe(injectPartials())
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest(APPPATH.root))
});

/*gulp.task('copy', ['clean-html'], function(){
    gulp.src(SOURCEPATHS.htmlSource)
    .pipe(gulp.dest(APPPATH.root))
});*/

gulp.task('serve', ['sass'], function(){
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }  
    })
});

gulp.task('watch', ['serve', 'sass', 'clean-html', 'clean-scripts',  'scripts', 'images', 'html'], function(){
    gulp.watch([SOURCEPATHS.sassSource], ['sass']);
    /* gulp.watch([SOURCEPATHS.htmlSource], ['copy']);*/
    gulp.watch([SOURCEPATHS.jsSource], ['scripts']);
    gulp.watch([SOURCEPATHS.imgSource], ['images']);
    gulp.watch([SOURCEPATHS.htmlPartialSource, SOURCEPATHS.htmlPartialSource], ['html']);
});

gulp.task('default',['watch']);