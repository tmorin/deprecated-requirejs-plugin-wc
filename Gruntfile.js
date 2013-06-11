module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: "./",
                    name: "wc",
                    out: "wc.min.js"
                }
            }
        },

        jslint: { // configure the task
            files: [ // some example files
                'Gruntfile.js',
                'wc.js'
            ],
            directives: {
                ass: false,
                bitwise: false,
                browser: true,
                closure: false,
                'continue': false,
                couch: false,
                debug: false,
                devel: true,
                eqeq: false,
                es5: true,
                evil: false,
                forin: false,
                indent: 4,
                maxerr: 100,
                maxlen: 100,
                newcap: false,
                node: true,
                nomen: false,
                passfail: false,
                plusplus: false,
                regexp: true,
                rhino: false,
                sloppy: false,
                stupid: false,
                sub: false,
                todo: true,
                unparam: false,
                vars: false,
                white: false,

                predef: ['require', 'define']
            },
            options: {
                failOnError: false, // defaults to true
                shebang: true // ignore shebang lines
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-jslint');

};