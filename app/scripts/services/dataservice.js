(function () {
  'use strict';

/**
 * @ngdoc service
 * @name angularVideopodcastCnnApp.dataService
 * @description
 * # dataService
 * Factory in the angularVideopodcastCnnApp.
 */
 var app= angular.module('angularVideopodcastCnnApp');
 
 app.factory('dataService', [dataService]);

 function dataService() {
    // Service logic
    
    var serviceData={
      getFeedSources: getFeedSources,
      getNotValidUrlMessage: getNotValidUrlMessage,
      getWrongFeedMessage: getWrongFeedMessage,
      getPodTitle: getPodTitle,
      getPodTitleInvalidUrl: getPodTitleInvalidUrl,
      getPodTitleEmptyFeed: getPodTitleEmptyFeed,
      getPodDescrition: getPodDescrition,
      getVideoFormats: getVideoFormats,
      getInvalidSelectedClip: getInvalidSelectedClip, 
      getEmptyFeedSelectedClip: getEmptyFeedSelectedClip,
      getToken: getToken,
      getApiUrl: getApiUrl
    };
    
    var feedSources=[
      {text: 'Load rss feed', url: ''},
      {text: 'Load Another CNN rss', url: ''},
      {text:'Student News (Video)', url:'http://rss.cnn.com/services/podcasting/studentnews/rss'},
      {text:'State of the Union (Video)', url:'http://edition.cnn.com/services/podcasting/stateoftheunion/rss.xml'},
      {text: 'Fareed Zakaria GPS (Video)', url: 'http://edition.cnn.com/services/podcasting/fareedzakaria/rss.xml'},
      {text: 'CNN.com - RSS Channel', url: 'http://rss.cnn.com/rss/cnn_freevideo.rss'}
    ];

    var notValidUrlMessage='The feed url introduced is not valid!';
    var wrongFeedMessage='This feed seems to be down...';

    var podTitle='Podcast Title';
    var podDescrition='Podcast description';

    var podTitleInvalidUrl='Invalid Url';
    var podTitleEmptyFeed='Empty Feed';

    var videoFormats= ['ogv', 'ogg', 'webm', 'mp4', 'm4v', 'mov'];

    var invalidSelectedClip= -1;

    var emptyFeedSelectedClip= -2;

    var token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImFudmlkZW9wb2RjYXN0Y25uMDAxIiwiaWF0IjoxNDY3Mzc0NjAxfQ.n5hMbVeclEjldhmLf4_4Y2V_HldzVQjr4a6-0nLP_yE';

    var apiHost='127.0.0.1'; //IP or DNS of the machine where the node proxy is running

    var apiPort=3001;  //Default port of the node proxy, unless you want to change it

    var apiPath='/rss/feed?url=';
    
    var apiUrl='//'+apiHost+':'+apiPort+apiPath;

    function getFeedSources(){
      return feedSources;
    }

    function getNotValidUrlMessage(){
      return notValidUrlMessage;
    }

    function getWrongFeedMessage(){
      return wrongFeedMessage;
    }

    function getPodTitle(){
      return podTitle;
    }

    function getPodTitleInvalidUrl(){
      return podTitleInvalidUrl;
    }

    function getPodTitleEmptyFeed(){
      return podTitleEmptyFeed;
    }

    function getPodDescrition(){
      return podDescrition;
    }

    function getVideoFormats(){
      return videoFormats;
    }

    function getInvalidSelectedClip(){
      return invalidSelectedClip;
    }

    function getEmptyFeedSelectedClip(){
      return emptyFeedSelectedClip;
    }

    function getToken(){
      return token;
    }

    function getApiUrl(){
      return apiUrl;
    }

    // Public API here
    return serviceData;
  }

})();

