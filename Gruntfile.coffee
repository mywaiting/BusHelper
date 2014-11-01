module.exports = (grunt)->

    grunt.initConfig
        concurrent: 
            dev: 
                tasks: ["nodemon", "watch"]
                options: 
                    logConcurrentOutput: true

        simplemocha: 
            options: 
                compilers: "coffee:coffee-script"
            all: {src: ["test/**/*.coffee"]}

        watch: 
            dev:
                files: ["**/*.coffee"]
                #tasks: ["simplemocha"]

        nodemon:
            dev: 
                script: "index.coffee"
                options:
                    ext: "js,coffee"
                    debug: true
                    env:
                        DEBUG: "Bus-Helper"


    grunt.loadNpmTasks 'grunt-simple-mocha'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-nodemon'
    grunt.loadNpmTasks 'grunt-concurrent'

    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('test', 'simplemocha');
    grunt.registerTask('dev', ['simplemocha', 'watch']);
