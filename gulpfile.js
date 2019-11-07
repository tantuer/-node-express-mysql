const nodemon = require('nodemon');
const gulp = require('gulp');
const watch = require('gulp-watch');
const less = require('gulp-less');
const frontend_less_path = 'public/frontend/less';
const frontend_css_path = 'public/frontend/css';

gulp.task('node', function() {
  watch(frontend_less_path + '/*.less', function(event) {
    gulp
      .src(frontend_less_path + '/*.less')
      .pipe(less())
      .pipe(gulp.dest(frontend_css_path));
    console.log('less compiler:', frontend_less_path + '/*.less');
  });
  console.log('gulp work');

  nodemon({
    script: './bin/www',
    env: {
      NODE_ENV: 'development'
    },
    watch: [
      'app.js',
      'src/routers/*.js',
      'src/routers/**/*.js',
      'src/routers/**/**/*.js',
      'src/utils/*.js',
      'src/schemas/*.js',
      'src/models/*.js',
      'src/controllers/**/*.js'
    ]
  }).on('start', function() {
    console.log('running');
  });
});
