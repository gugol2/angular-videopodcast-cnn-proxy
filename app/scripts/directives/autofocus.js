(function () {

	'use strict';

	/**
	 * @ngdoc directive
	 * @name angularVideopodcastCnnApp.directive:autoFocus
	 * @description
	 * # autoFocus
	 */
	
	var app=angular.module('angularVideopodcastCnnApp');

	app.directive('autoFocus', ['$timeout', autoFocus]);

	function autoFocus($timeout) {
	    return {
	      restrict: 'A',
	      scope: {
	      	autoFocus: '='
	      },
	      link: function postLink(scope, element) {
	      	
	      	if(scope.autoFocus){
	        	// timeout makes sure that is invoked after any other event has been triggered.
		        $timeout(function () {
		            element.focus();
		        });
	      	}
	      			
	      }
	    };
	  }

})();


