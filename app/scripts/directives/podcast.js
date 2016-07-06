(function () {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name angularVideopodcastCnnApp.directive:podcast
	 * @description
	 * # podcast
	 */
	var app=angular.module('angularVideopodcastCnnApp');

	app.directive('podcast', ['dataService', podcast]);

	function podcast(dataService) {
	 	return {
	 		templateUrl: 'views/podcast.html',
	 		restrict: 'E',
	 		link: function postLink(scope) {
	 			scope.invalidSelectedClip=dataService.getInvalidSelectedClip();
				scope.emptyFeedSelectedClip=dataService.getEmptyFeedSelectedClip();
	 		}
	 	};
	}

})();
