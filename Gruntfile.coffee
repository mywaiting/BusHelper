module.exports = (grunt)->

    grunt.initConfig
        concurrent: 
            dev: 
                tasks: ["nodemon", "watch"]
                options: 
                    logConcurrentOutput: true

        simplemocha:
            all: {src: ["test/**/*.js"]}

        watch: 
            dev:
                files: ["**/*.js"]
                tasks: ["simplemocha"]

        nodemon:
            dev: 
                script: "index.js"


    grunt.loadNpmTasks 'grunt-simple-mocha'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-nodemon'
    grunt.loadNpmTasks 'grunt-concurrent'

    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('test', 'simplemocha');
    grunt.registerTask('dev', ['simplemocha', 'watch']);
