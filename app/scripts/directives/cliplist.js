(function () {

	'use strict';

	/**
	 * @ngdoc directive
	 * @name angularVideopodcastCnnApp.directive:clipList
	 * @description
	 * # clipList
	 */
	 var app=angular.module('angularVideopodcastCnnApp');

	 app.directive('clipList', [clipList]);

	 function clipList() {
	 	return {
	 		templateUrl: 'views/cliplist.html',
	 		restrict: 'E',
	 		scope:{
	 			itemsFeed: '=feedItems',
	 			clipSelected: '=selectedClip'
	 		},
	 		controller: 'CliplistCtrl'
	 	};
	 }	

})();


