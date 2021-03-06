module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            main: {
                src: [
                    'bower_components/jquery.easing/js/jquery.easing.js',
                    'js/plugins/*.js',
                    'js/<%= pkg.name %>.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js',
            }
        },
        uglify: {
            main: {
                src: 'dist/js/<%= pkg.name %>.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                src: ['*.html', 'mail/**', 'img/**', 'less/**'],
                dest: 'dist/',
            },
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: [
                        'jquery.js',
                        'jquery.min.js'
                    ],
                    dest: 'dist/js/'
                }, ]
            },
            i18next: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/i18next',
                    src: [
                        'i18next.min.js'
                    ],
                    dest: 'dist/js/'
                }, ]
            },
            i18nextxhrbackend: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/i18next-xhr-backend',
                    src: [
                        'i18nextXHRBackend.min.js'
                    ],
                    dest: 'dist/js/'
                }, ]
            },
            i18nextbrowserlanguagedetector: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/i18next-browser-languagedetector',
                    src: [
                        'i18nextBrowserLanguageDetector.min.js'
                    ],
                    dest: 'dist/js/'
                }, ]
            },
            bootstrap: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'css/bootstrap.css',
                        'css/bootstrap.min.css',
                        'js/bootstrap.js',
                        'js/bootstrap.min.js'
                    ],
                    dest: 'dist/'
                }, ]
            },
            glyphicons: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'fonts/glyphicons-halflings-regular.eot',
                        'fonts/glyphicons-halflings-regular.svg',
                        'fonts/glyphicons-halflings-regular.ttf',
                        'fonts/glyphicons-halflings-regular.woff',
                    ],
                    dest: 'dist/'
                }, ]
            },
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "dist/css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "dist/css/<%= pkg.name %>.min.css": "less/<%= pkg.name %>.less"
                }
            }
        },
        banner: '/*!\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> \n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['dist/css/<%= pkg.name %>.css', 'dist/css/<%= pkg.name %>.min.css', 'dist/js/<%= pkg.name %>.js', 'dist/js/<%= pkg.name %>.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/<%= pkg.name %>.js, js/plugins/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            copy: {
                files: ['*.html', 'mail/**', 'img/**', 'less/**'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                }
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'copy', 'less', 'usebanner']);

};
