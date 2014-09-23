module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.initConfig({
		uglify:{
			my_target: {
				files: {
					'js/script.js' : ['_source/js/*.js']
				} // files
			} // my_target
		}, // uglify
		compass:{
			dev:{
				options:{
					config: 'config.rb'
				} //options
			} //dev
		}, //compass
		watch:{
			options: { livereload : true },
			scripts: {
				files:['_source/js/*.js'],
				tasks:['uglify']
			}, //scripts
			html: {
				files:['*.shtml']
			}, // html
			sass:{
				files:['_source/scss/*.scss'],
				tasks: ['compass:dev']
			} //sass
		} //watch
	}); // initCOnfig
	grunt.registerTask('default','watch');
}; // exports