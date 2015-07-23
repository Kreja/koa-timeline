module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
        src: 'public',
        dist: 'build',
    },
    cssmin: {
        target: {
            files: {
                '<%= config.dist %>/main.min.css': ['<%= config.src %>/{,*/}*.css']
            }
        }
    },
    concat: {
        dist: {
            src: ['<%= config.src %>/{,*/}*.js'],
            dest: '<%= config.dist %>/main.js',
        }
    },
    uglify: {
        dist: {
            src: ['<%= config.dist %>/main.js'],
            dest: '<%= config.dist %>/main.min.js'
        }
    },
    watch: {
        scripts: {
            files: ['<%= config.src %>/{,*/}*.js'],
            tasks: ['concat','uglify']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('compresscss',['cssmin']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('compressjs',['concat','uglify']);
  grunt.registerTask('watching',['cssmin','concat','uglify','watch']);

};
