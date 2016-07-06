'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angularVideopodcastCnnApp'));

  var MainCtrl,
    scope, feedService, setFocus, dataService, traceService;

  var $q ,deferred;
    
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _feedService_, _setFocus_, _dataService_, _traceService_, _$q_) {
    scope = $rootScope.$new();
    feedService= _feedService_;
    setFocus= _setFocus_;
    dataService= _dataService_;
    traceService = _traceService_;

    $q = _$q_;
    // We use the $q service to create a mock instance of defer
    deferred = $q.defer();

    // Use a Jasmine Spy to return the deferred promise
    spyOn(feedService, 'parseFeed').and.returnValue(deferred.promise);
        
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      // place here mocked dependencies
      feedService: feedService,
      setFocus: setFocus,
      dataService: dataService,
      traceService: traceService
    });
  }));

  //$scope variables
  it('this dummy checks injecting of settings controller', function () {
    expect(MainCtrl).toBeDefined();
  });

  it('should get the feedSources of the scope', function () {
    expect(scope.feedSources).toEqual(dataService.getFeedSources());
  });

  it('should get the notValidUrlMessage of the scope', function () {
    expect(scope.notValidUrlMessage).toEqual(dataService.getNotValidUrlMessage());
  });

  it('should get the wrongFeedMessage of the scope', function () {
    expect(scope.wrongFeedMessage).toEqual(dataService.getWrongFeedMessage());
  });

  it('should get the loadButonText of the scope', function () {
    expect(scope.loadButonText).toEqual(scope.feedSources[0].text);
  });

  it('should get the podTitle of the scope', function () {
    expect(scope.podTitle).toEqual(dataService.getPodTitle());
  });

  it('should get the podDescrition of the scope', function () {
    expect(scope.podDescrition).toEqual(dataService.getPodDescrition());
  });

  it('should get the invalidSelectedClip of the scope', function () {
    expect(scope.invalidSelectedClip).toEqual(dataService.getInvalidSelectedClip());
  });

  it('should get the emptyFeedSelectedClip of the scope', function () {
    expect(scope.emptyFeedSelectedClip).toEqual(dataService.getEmptyFeedSelectedClip());
  });

  //$scope functions
  it('should set the loadButonText of the scope', function () {
    //vars
    var testButtonText= 'text for button';

    //call
    scope.setLoadButonText(testButtonText);

    //expects
    expect(scope.loadButonText).toEqual(testButtonText);
  });


  it('should set a few variables of the scope when the url of the feed is invalid', function () {
    //spies
    spyOn(setFocus,'set'); 

    //call
    scope.invalidUrl();

    //expects
    expect(scope.feedItems).toBe(null);
    expect(scope.podTitle).toEqual(dataService.getPodTitleInvalidUrl());
    expect(scope.podDescrition).toEqual(scope.notValidUrlMessage);
    expect(scope.selectedClip).toEqual(scope.invalidSelectedClip);

    expect(setFocus.set).toHaveBeenCalled();
    expect(setFocus.set).toHaveBeenCalledWith('#feed--selector--button');
  
  });


  it('should set a few variables of the scope when the url of the feed has an empty response', function () {
    //spies
    spyOn(setFocus,'set');

    //call
    scope.emptyFeed();

    //expects
    expect(scope.feedItems).toBe(null);
    expect(scope.podTitle).toEqual(dataService.getPodTitleEmptyFeed());
    expect(scope.podDescrition).toEqual(scope.wrongFeedMessage);
    expect(scope.selectedClip).toEqual(scope.emptyFeedSelectedClip);

    expect(setFocus.set).toHaveBeenCalled();
    expect(setFocus.set).toHaveBeenCalledWith('#feed--selector--button');
  
  });


  it('should set a few variables of the scope when the url of the feed is valid and the response is not empty', function () {
    //vars
    var validFeed=dataService.getFeedSources()[2];
    var feedResult={ item: ['entries0', 'entries1', 'entries2' ] , title: ['title'] ,  description: ['description'], link: ['link']};

    //spies
    spyOn(scope,'setFeed');
    spyOn(scope,'setLoadButonText'); 
    spyOn(setFocus,'set'); 

    //call
    scope.loadFeed(validFeed);
    
    //expects
    expect(scope.setFeed).toHaveBeenCalled();
    expect(scope.setFeed).toHaveBeenCalledWith(validFeed);

    expect(feedService.parseFeed).toHaveBeenCalled();
    expect(feedService.parseFeed).toHaveBeenCalledWith(validFeed.url);

    // Setup the data we wish to return for the .then function in the controller
    deferred.resolve(feedResult);

    // We have to call apply for this to work
    scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(scope.feedItems).toEqual(feedResult.item);
    expect(scope.podTitle).toEqual(feedResult.title[0]);
    expect(scope.podDescrition).toEqual(feedResult.description[0]);

    expect(scope.setLoadButonText).toHaveBeenCalled();
    expect(scope.setLoadButonText).toHaveBeenCalledWith(feedResult.title[0]);

    expect(scope.podLink).toEqual(feedResult.link[0]);
    expect(scope.currentFeedItem).toEqual(feedResult.item[0]);
    expect(scope.selectedClip).toEqual(0);
    
    expect(setFocus.set).toHaveBeenCalled();
    expect(setFocus.set).toHaveBeenCalledWith('#clip--list--strict ul a:first');
  
  });

  it('should alert a message if the url feed passed is not valid or is empty', inject(function ($window) {
    //vars
    var invalidFeed={text: 'The url feed is not valid or is empty', url: ''};

    //spies
    spyOn(scope,'setFeed');
    spyOn(scope,'invalidUrl');
    spyOn($window, 'alert'); 
    
    //call
    scope.loadFeed(invalidFeed);
    
    //expects
    expect(scope.setFeed).toHaveBeenCalled();
    expect(scope.setFeed).toHaveBeenCalledWith(invalidFeed);

    expect(feedService.parseFeed).not.toHaveBeenCalled();


    // Since we called apply, not we can perform our assertions
    expect(scope.feedItems).toBeUndefined();
    expect(scope.podLink).toBeUndefined();
    expect(scope.currentFeedItem).toBeUndefined();
    expect(scope.selectedClip).toBeUndefined();

    expect(scope.invalidUrl).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(scope.notValidUrlMessage);

  }));


  it('should call the traceService catcher with a message and the exception object when there is an error in the feed response', inject(function ($window){
    //vars
    var errorRequestFeed={text: 'There is an error in the feed response', url: 'http://rss.cnn.com/services/podcasting/studentnews/404/rss'};
    var errorReponseFeed={responseStatus: 404, responseData: 'There is an error in the feed response'};

    //spies
    spyOn(scope,'setFeed');
    spyOn(traceService,'catcher').and.callThrough();
    spyOn($window, 'alert'); 
    spyOn(scope,'emptyFeed');

    //call
    scope.loadFeed(errorRequestFeed);
    
    //expects
    expect(scope.setFeed).toHaveBeenCalled();
    expect(scope.setFeed).toHaveBeenCalledWith(errorRequestFeed);

    expect(feedService.parseFeed).toHaveBeenCalled();
    expect(feedService.parseFeed).toHaveBeenCalledWith(errorRequestFeed.url);

    // This will call the .catch function in the controller
    deferred.reject(errorReponseFeed);

    // We have to call apply for this to work
    scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(scope.feedItems).toBeUndefined();
    expect(scope.podLink).toBeUndefined();
    expect(scope.currentFeedItem).toBeUndefined();
    expect(scope.selectedClip).toBeUndefined();

    expect(traceService.catcher).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(errorReponseFeed.responseStatus+' '+errorReponseFeed.responseData);
    expect(scope.emptyFeed).toHaveBeenCalled();
  
  }));


  it('should set a few variables of the scope when loading a new feed url', function () {
    //vars
    var newFeed=dataService.getFeedSources()[1];

    //spies
    spyOn(scope,'setFeed');
    spyOn(scope,'setLoadButonText'); 
    spyOn(setFocus,'set');

    //call
    scope.loadNewFeed(newFeed);

    //expects
    expect(scope.selectedClip).toEqual(0);

    expect(scope.setFeed).toHaveBeenCalled();
    expect(scope.setFeed).toHaveBeenCalledWith({text:newFeed.text, url:''});

    expect(scope.setLoadButonText).toHaveBeenCalled();
    expect(scope.setLoadButonText).toHaveBeenCalledWith(newFeed.text);

    expect(setFocus.set).toHaveBeenCalled();
    expect(setFocus.set).toHaveBeenCalledWith('#feed--selector--box');
  
  });

});
