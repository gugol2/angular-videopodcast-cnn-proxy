'use strict';

describe('Service: dataService', function () {

  // load the service's module
  beforeEach(module('angularVideopodcastCnnApp'));

  // instantiate service
  var dataService;
  beforeEach(inject(function (_dataService_) {
    dataService = _dataService_;
  }));

  it('should check the data service', function () {
    expect(dataService).not.toBe(null);
    expect(dataService).toBeDefined(); 
  });

  it('should check that dataService.feedSources is an array', function () {
    var feedSources = dataService.getFeedSources();
    expect(feedSources).toEqual(jasmine.any(Array));
  });

  it('should check that dataService.notValidUrlMessage is a String', function () {
    var notValidUrlMessage = dataService.getNotValidUrlMessage();
    expect(notValidUrlMessage).toEqual(jasmine.any(String));
  });

  it('should check that dataService.wrongFeedMessage is a String', function () {
    var wrongFeedMessage = dataService.getWrongFeedMessage();
    expect(wrongFeedMessage).toEqual(jasmine.any(String));
  });

  it('should check that dataService.podTitle is a String', function () {
    var podTitle = dataService.getPodTitle();
    expect(podTitle).toEqual(jasmine.any(String));
  });

  it('should check that dataService.podTitleInvalidUrl is a String', function () {
    var podTitleInvalidUrl = dataService.getPodTitleInvalidUrl();
    expect(podTitleInvalidUrl).toEqual(jasmine.any(String));
  });

  it('should check that dataService.podTitleEmptyFeed is a String', function () {
    var podTitleEmptyFeed = dataService.getPodTitleEmptyFeed();
    expect(podTitleEmptyFeed).toEqual(jasmine.any(String));
  });

  it('should check that dataService.podDescrition is a String', function () {
    var podDescrition = dataService.getPodDescrition();
    expect(podDescrition).toEqual(jasmine.any(String));
  });

  it('should check that dataService.videoFormatsvideoFormats is a String', function () {
    var videoFormatsvideoFormats = dataService.getVideoFormats();
    expect(videoFormatsvideoFormats).toEqual(jasmine.any(Array));
  });

  it('should check that dataService.invalidSelectedClip is a String', function () {
    var invalidSelectedClip = dataService.getInvalidSelectedClip();
    expect(invalidSelectedClip).toEqual(jasmine.any(Number));
  });

  it('should check that dataService.emptyFeedSelectedClip is a String', function () {
    var emptyFeedSelectedClip = dataService.getEmptyFeedSelectedClip();
    expect(emptyFeedSelectedClip).toEqual(jasmine.any(Number));
  });

  it('should check that dataService.token is a String', function () {
    var token = dataService.getToken();
    expect(token).toEqual(jasmine.any(String));
    //token has to be filled
    expect(token.length).toBeGreaterThan(0);
  });

  it('should check that dataService.apiUrl is a String', function () {
    var apiUrl = dataService.getApiUrl();
    expect(apiUrl).toEqual(jasmine.any(String));
    //token has to be filled
    expect(apiUrl.length).toBeGreaterThan(0);
  });

});
