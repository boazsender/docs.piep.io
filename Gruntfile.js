module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    clean: {
      public: ['public']
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'assets',
        src: '**/*',
        dest: 'public/assets'
      }
    },

    jade: {
      develop: {
        src: '*',
        dest: 'public/',
        ext: '.html',
        expand: true,
        cwd: 'views/',
        options: { data: { develop: true } }
      },
      production: {
        src: '*',
        dest: 'public/',
        expand: true,
        cwd: 'views/',
        options: { data: { develop: false } }
      }
    },

    stylus: {
      css: {
        src: 'styles/styles.styl',
        dest: 'public/styles/styles.css'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      jade: {
        files: ['views/*'],
        tasks: ['jade:develop']
      },
      stylus: {
        files: ['styles/*'],
        tasks: ['stylus']
      }, 
    }

  });

  grunt.registerTask('work', [
    'clean',
    'copy',
    'jade:develop',
    'stylus',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean',
    'copy',
    'jade:production',
    'stylus'
  ]);

  grunt.registerTask('default', 'work');

};
