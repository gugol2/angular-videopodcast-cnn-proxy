(function () {

	'use strict';

	/**
	 * @ngdoc function
	 * @name angularVideopodcastCnnApp.controller:MainCtrl
	 * @description
	 * # MainCtrl
	 * Controller of the angularVideopodcastCnnApp
	 */
	 var app=angular.module('angularVideopodcastCnnApp');

	 app.controller('MainCtrl', ['$scope', 'feedService','setFocus', '$window', 'dataService', 'traceService', 'hotkeys', '$location', 'hotkeysService', MainCtrl]);

	 function MainCtrl($scope, feedService, setFocus, $window, dataService, traceService, hotkeys, $location, hotkeysService) {

	 	//get initial data from the data service
	 	$scope.feedSources=dataService.getFeedSources();

	 	$scope.notValidUrlMessage=dataService.getNotValidUrlMessage();
	 	$scope.wrongFeedMessage=dataService.getWrongFeedMessage();

	 	$scope.loadButonText=$scope.feedSources[0].text;

	 	$scope.podTitle=dataService.getPodTitle();
		$scope.podDescrition=dataService.getPodDescrition();

		$scope.invalidSelectedClip=dataService.getInvalidSelectedClip();
		$scope.emptyFeedSelectedClip=dataService.getEmptyFeedSelectedClip();

	 	$scope.setFeed=function (feed) {
	 		$scope.feedSrc= feed;
	 	};

	 	$scope.setLoadButonText=function (feedText) {
	 		$scope.loadButonText= feedText;
	 	};

	 	//When the feed url is not valid
	 	$scope.invalidUrl=function () {
	 		$scope.feedItems=null;
		    $scope.podTitle=dataService.getPodTitleInvalidUrl();
		    $scope.podDescrition=$scope.notValidUrlMessage;
		    //-1 means warning
		    $scope.selectedClip=$scope.invalidSelectedClip;
		    //set the focus on the feed selector button again
		    setFocus.set('#feed--selector--button');
	 	};

	 	//When the feed url is valid but its result is not
	 	$scope.emptyFeed=function () {
	 		$scope.feedItems=null;
		    $scope.podTitle=dataService.getPodTitleEmptyFeed();
		    $scope.podDescrition=$scope.wrongFeedMessage;
		    //-2 means error
		    $scope.selectedClip=$scope.emptyFeedSelectedClip;
		    //set the focus on the feed selector button again
		    setFocus.set('#feed--selector--button');
	 	};

	 	//Load the feed result given a feed 
	 	$scope.loadFeed=function(feed){

	 		$scope.setFeed(feed);

	 		if(feed && feed.url){

	 			feedService.parseFeed(feed.url).then(function(feedResult){

	 				//disable input feed--selector--box

			        $scope.checked=true; 
		                   
		            $scope.feedItems=feedResult.item;

		            $scope.podTitle=feedResult.title[0];

		            //if the feed bring resutls set the button to the title of the feed results.
		            $scope.setLoadButonText($scope.podTitle);

		            $scope.podDescrition=feedResult.description[0];
		            
		            $scope.podLink=feedResult.link[0];

		            $scope.currentFeedItem=$scope.feedItems[0];
		            $scope.selectedClip=0;
		            
		            //set the focus on the first item of the clip list
			        setFocus.set('#clip--list--strict ul a:first');

			        hotkeysService.deleteHotkeys();
			        hotkeysService.bindClipListHotkeys($scope);
		            
		        }).catch(function(reason){

			        //if exceptions call the traceService catcher with a message and the exception object 
		          	traceService.catcher(reason.responseStatus)(reason.responseData);
			        $window.alert(reason.responseStatus+' '+reason.responseData);	
			        $scope.emptyFeed();
			    });
		    }else{
		    	//If the url feed passed is not valid or is empty
		    	$window.alert($scope.notValidUrlMessage);
		    	$scope.invalidUrl();
		    } 
		};


		$scope.loadNewFeed=function(feed){
			//enable input feed--selector--box
			$scope.checked=false;

			$scope.setLoadButonText(feed.text);
			
			//empty the feed--selector--box 
			$scope.setFeed({text:feed.text, url:''});
			
			//0 means no errors and no warnings
			$scope.selectedClip=0;
			
			//set the focus on the feed selector input box
			setFocus.set('#feed--selector--box');
		};

		//bind the feed selector keys
		hotkeysService.bindFeedSelectorHotkeys($scope);

      }

  })();
