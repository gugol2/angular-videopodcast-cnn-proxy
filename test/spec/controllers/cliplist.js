'use strict';

describe('Controller: CliplistCtrl', function () {

  // load the controller's module
  beforeEach(module('angularVideopodcastCnnApp'));

  var CliplistCtrl,
    scope, dataService, utilService, $timeout, keyEvents, setFocus;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _dataService_, _utilService_, _$timeout_, _keyEvents_, _setFocus_) {
    scope = $rootScope.$new();
    dataService= _dataService_;
    utilService= _utilService_;
    $timeout= _$timeout_;
    keyEvents= _keyEvents_;
    setFocus= _setFocus_;

    CliplistCtrl = $controller('CliplistCtrl', {
      $scope: scope,
      // place here mocked dependencies
      dataService:dataService,
      utilService: utilService,
      setFocus: setFocus
    });
  }));

  //$scope variables
  it('this dummy checks injecting of settings controller', function () {
    expect(CliplistCtrl).toBeDefined();
  });

  it('should get the invalidSelectedClip of the scope', function () {
    expect(scope.invalidSelectedClip).toEqual(dataService.getInvalidSelectedClip());
  });

  it('should get the emptyFeedSelectedClip of the scope', function () {
    expect(scope.emptyFeedSelectedClip).toEqual(dataService.getEmptyFeedSelectedClip());
  });


  //$scope functions
  it('should set a few variables of the scope and call some functions when selecting a valid podcast', function () {
    //vars
    var validFeedItem= {link: ['video.mp4']};
    var index= 1;
    var validFileExtension = utilService.getFileExtension(validFeedItem.link[0]);
    var videoFormats = dataService.getVideoFormats();


    //spies
    spyOn(utilService,'getFileExtension').and.callThrough();
    spyOn(dataService,'getVideoFormats').and.callThrough();
    spyOn(utilService,'supportVideoExtension').and.callThrough();

    //call
    scope.playClip(validFeedItem, index);
    
    //expects
    expect(scope.currentFeedItem).toEqual(validFeedItem);

    expect(utilService.getFileExtension).toHaveBeenCalled();
    expect(utilService.getFileExtension).toHaveBeenCalledWith(validFeedItem.link[0]);

    expect(dataService.getVideoFormats).toHaveBeenCalled();

    expect(utilService.supportVideoExtension).toHaveBeenCalled();
    expect(utilService.supportVideoExtension).toHaveBeenCalledWith(validFileExtension, videoFormats);

    expect(scope.clipSelected).toEqual(index);
    expect(scope.auto).toBe(true);

  });

  it('should set a few variables of the scope and call some functions when selecting an invalid podcast', function () {
    //vars
    var invalidFeedItem= {link: ['video.html']};
    var index= 1;
    var invalidFileExtension = utilService.getFileExtension(invalidFeedItem.link[0]);
    var videoFormats = dataService.getVideoFormats();


    //spies
    spyOn(utilService,'getFileExtension').and.callThrough();
    spyOn(dataService,'getVideoFormats').and.callThrough();
    spyOn(utilService,'supportVideoExtension').and.callThrough();

    //call
    scope.playClip(invalidFeedItem, index);
    
    //expects
    expect(scope.currentFeedItem).toEqual(invalidFeedItem);

    expect(utilService.getFileExtension).toHaveBeenCalled();
    expect(utilService.getFileExtension).toHaveBeenCalledWith(invalidFeedItem.link[0]);

    expect(dataService.getVideoFormats).toHaveBeenCalled();

    expect(utilService.supportVideoExtension).toHaveBeenCalled();
    expect(utilService.supportVideoExtension).toHaveBeenCalledWith(invalidFileExtension, videoFormats);

    expect(scope.clipSelected).toBeUndefined();
    expect(scope.auto).toBeUndefined();
    expect(scope.noValidLink).toBe(true);

  });


  it('should set the focus on a DOM element when pressing ARROW_UP', function () {
    //vars
    var event= new Event('keyup');
    event.keyCode=keyEvents.KEY_CODES.ARROW_UP;

    var feedSelectorButton = angular.element('#feed--selector--button');
    
    //spies
    spyOn(event, 'stopPropagation');
    spyOn(setFocus,'set');

    //call
    scope.moveTo(event);
    
    //expects
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setFocus.set).toHaveBeenCalled();
    expect(setFocus.set).toHaveBeenCalledWith(feedSelectorButton);

  });

  it('should set the focus on a DOM element when pressing ARROW_DOWN', function () {
    //vars
    var event= new Event('keyup');
    event.keyCode=keyEvents.KEY_CODES.ARROW_DOWN;

    var firstClip = angular.element('#clip--list--strict ul a').first();
    
    //spies
    spyOn(event, 'stopPropagation');
    spyOn(setFocus,'set');

    //call
    scope.moveTo(event);
    
    //expects
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setFocus.set).toHaveBeenCalled();
    expect(setFocus.set).toHaveBeenCalledWith(firstClip);

  });

  it('test $watch(clipSelected) using $digest', function() {
  
    scope.clipSelected = undefined;

    //to trigger a "digest cycle" which invokes the $watch expression defined
    scope.$digest();

    expect(scope.currentFeedItem).toBeUndefined();
    expect(scope.noValidLink).toBeUndefined();
  });

  it('test $watch(clipSelected) using $digest with clipSelected = undefined', function() {
    
    scope.clipSelected = undefined;

    //to trigger a "digest cycle" which invokes the $watch expression defined
    scope.$digest();

    expect(scope.currentFeedItem).toBeUndefined();
    expect(scope.noValidLink).toBeUndefined();
  });

  it('test $watch(clipSelected) using $digest with clipSelected = scope.invalidSelectedClip', function() {
    
    scope.clipSelected = scope.invalidSelectedClip;

    //to trigger a "digest cycle" which invokes the $watch expression defined
    scope.$digest();

    expect(scope.currentFeedItem).toBe(null);
    expect(scope.noValidLink).toBe(true);
  });

  it('test $watch(clipSelected) using $digest with clipSelected = scope.emptyFeedSelectedClip', function() {
    
    scope.clipSelected = scope.emptyFeedSelectedClip;

    //to trigger a "digest cycle" which invokes the $watch expression defined
    scope.$digest();

    expect(scope.currentFeedItem).toBe(null);
    expect(scope.noValidLink).toBe(true);

  });

  it('test $watch(clipSelected) using $digest with clipSelected >=0', function() {
    
    scope.clipSelected = 0;

    //to trigger a "digest cycle" which invokes the $watch expression defined
    scope.$digest();

    expect(scope.currentFeedItem).toBeUndefined();
    expect(scope.noValidLink).toBe(false);
  });

  
});
