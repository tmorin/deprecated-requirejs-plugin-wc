module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');

};