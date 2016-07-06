(function () {
	
	'use strict';

	/**
	 * @ngdoc function
	 * @name angularVideopodcastCnnApp.controller:CliplistCtrl
	 * @description
	 * # CliplistCtrl
	 * Controller of the angularVideopodcastCnnApp
	 */
	var app = angular.module('angularVideopodcastCnnApp');

	app.controller('CliplistCtrl', ['$scope', 'setFocus', 'dataService', 'utilService' ,'keyEvents', 'hotkeysService', CliplistCtrl]);


	function CliplistCtrl($scope, setFocus, dataService, utilService, keyEvents, hotkeysService) {

		$scope.invalidSelectedClip=dataService.getInvalidSelectedClip();
		$scope.emptyFeedSelectedClip=dataService.getEmptyFeedSelectedClip();

	 	/*When the items feed passed to the cliplist directive changes
	 	the video is not shown until we select a feed item*/
	 	$scope.$watch('itemsFeed', function(itemsFeed) {
	 		if(itemsFeed) {
				//set currentFeedItem to null after a new load
				$scope.currentFeedItem=null;
				$scope.auto=false;
				$scope.noValidLink=false;
				//empty input search box
				$scope.search='';
			}
		});

	 	//select a 
		$scope.playClip=function (feedItem, index) {
	 		//set the feed selected in the cliplist as the current item feed
	 		$scope.currentFeedItem=feedItem;

	 		//parse and trim the description if any
			if($scope.currentFeedItem.description && $scope.currentFeedItem.description[0]){
				$scope.currentFeedItem.contentSnippet=utilService.parseDescription($scope.currentFeedItem.description[0]);
			}
			
	 		//get the extension of the feedItem link
	 		var fileExtension=utilService.getFileExtension(feedItem.link[0]);

	 		//Acepted video Formats
		    var videoFormats= dataService.getVideoFormats();

	 		//Check if the extension is suported
	 		if(utilService.supportVideoExtension(fileExtension,videoFormats) > -1 ){
	 			$scope.clipSelected=index;
	 			$scope.auto=true;
	 		}else{
	 			//if it is not supported set the flag to true
	 			$scope.noValidLink=true;
	 		}

	 	};


	 	//input search box ng-keyup logic
	 	$scope.moveTo=function (event) {
	 		//to avoid propagation of the event
	 		event.stopPropagation();

	 		var feedSelectorButton = angular.element('#feed--selector--button');
			var firstClip = angular.element('#clip--list--strict ul a').first();
	 		

	 		if(event.keyCode===keyEvents.KEY_CODES.ARROW_UP){
	 			//if arrow-up it focuses on the feed selector button
	 			setFocus.set(feedSelectorButton);
	 			
	 			//delete the old keys and add the ones from the feed selector
	 			hotkeysService.deleteHotkeys();
            	hotkeysService.bindFeedSelectorHotkeys($scope);
		      		
		    }else if(event.keyCode===keyEvents.KEY_CODES.ARROW_DOWN){
		    	//if arrow-down it focuses on the first element of the clip list
		    	setFocus.set(firstClip);

		    	//delete the old keys and add the ones from the clip list
		    	hotkeysService.deleteHotkeys();
		    	hotkeysService.bindClipListHotkeys($scope);
		    }
		};


	 	//If the clip selected is -1 or -2 remove the video element and show the no video message
	 	$scope.$watch('clipSelected', function(clipSelected) {
	 		if(clipSelected!==undefined) {

	 			var clipVideo=angular.element('#clip--video');

	 			if(clipSelected === $scope.invalidSelectedClip){
	 				clipVideo.remove();
	 				$scope.currentFeedItem=null;
	 				$scope.noValidLink=true;
	 			}

	 			else if(clipSelected === $scope.emptyFeedSelectedClip){
	 				clipVideo.remove();
	 				$scope.currentFeedItem=null;
	 				$scope.noValidLink=true;
	 			}

	 			else if(clipSelected >= 0){
	 				$scope.noValidLink=false;
	 			}
	 		}
	 	});
	}

})();
