'use strict';

describe('Service: feedService', function () {

  // load the service's module
  beforeEach(module('angularVideopodcastCnnApp'));

  // instantiate service
  var feedService, $rootScope, deferred, $q, validUrl, invalidUrl;

  beforeEach(inject(function (_feedService_, _$rootScope_, _$q_) {
    feedService = _feedService_;
    $rootScope = _$rootScope_;
    $q = _$q_;
    deferred = $q.defer();

    spyOn(feedService, 'parseFeed').and.returnValue(deferred.promise);

    validUrl='http://rss.cnn.com/services/podcasting/studentnews/rss';
    invalidUrl='http://rss.cnn.com/services/podcasting/studentnews/404/rss';
  }));


  it('should resolve the promise from the parseFeed function', function () {
    //var
    var success='success feed service response';
    var result;

    // This will call the .then function in the controller
    deferred.resolve(success); 

    feedService.parseFeed(validUrl).then(function(returnFromPromise) {
      result = returnFromPromise;
    }); 

    // promises are resolved/dispatched only on next $digest cycle
    $rootScope.$apply();

    expect(result).toBe(success);
  });


  it('should reject the promise from the parseFeed function', function () {
    //var
    var rejection='failed feed service response';
    var result;

    // This will call the .catch function in the controller
    deferred.reject(rejection);

    feedService.parseFeed(invalidUrl).catch(function(returnFromPromise) {
      result = returnFromPromise;
    });
    
    // promises are resolved/dispatched only on next $digest cycle
    $rootScope.$apply();

    expect(result).toBe(rejection);
  });


});

