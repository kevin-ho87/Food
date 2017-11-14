const gulp         = require('gulp');
const gutil        = require('gulp-util');
const runSequence  = require('run-sequence');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');
const browserSync  = require('browser-sync').create();
const reload       = browserSync.reload;

gulp.task('clean', () => {
  return del([__dirname + '/dist']);
});

gulp.task('styles', () => {
    return gulp.src(__dirname + '/src/scss/main.scss')
        .pipe(gutil.env.type === 'production' ? gutil.noop() : sourcemaps.init())
        .pipe(sass({
            outputStyle: gutil.env.type === 'production' ? 'compressed' : '',
            includePaths: [
                __dirname + '/node_modules/bulma/',
                __dirname + '/node_modules/slick-carousel/slick/'
            ]
        }).on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gutil.env.type === 'production' ? gutil.noop() : sourcemaps.write(''))
        .pipe(gulp.dest(__dirname + '/dist/css'));
});

gulp.task('images', () => {
    return gulp.src(__dirname + '/src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(__dirname + '/dist/img'));
});

gulp.task('html', function(){
    return gulp.src([__dirname + '/src/**/*.html'])
        .pipe(gulp.dest(__dirname + '/dist/'));
});

gulp.task("js-plugins", () => {
    return gulp.src([
            __dirname + '/node_modules/jquery/dist/jquery.min.js',
            __dirname + '/node_modules/slick-carousel/slick/slick.min.js'
        ])
        .pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(gulp.dest(__dirname + '/dist/js'));
});

gulp.task("js", () => {
    return gulp.src([
            __dirname + '/src/js/main.js'
        ])
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(gulp.dest(__dirname + '/dist/js'));
});

gulp.task('watch', () => {
    if (gutil.env.type !== 'production') {
        browserSync.init({
            server: {
                baseDir: __dirname + '/dist/'
            },
            port: 8080
        });

        gulp.watch('src/scss/**/*.scss', {cwd: __dirname},['styles',reload]);
        gulp.watch('src/js/**/*.js', {cwd: __dirname},['js',reload]);
        gulp.watch('src/img/**/*', {cwd: __dirname},['images',reload]);
        gulp.watch('src/**/*.html', {cwd: __dirname},['html',reload]);
    }
});

gulp.task('default', callback => {
    runSequence('clean',
        ['styles', 'js-plugins', 'js', 'images', 'html'],
        'watch',
        callback)
});

// command
// npm run dev
// npm run prod
