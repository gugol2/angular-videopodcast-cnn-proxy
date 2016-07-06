'use strict';

describe('Filter: safeUrl', function () {

  // load the filter's module
  beforeEach(module('angularVideopodcastCnnApp'));

  // initialize a new instance of the filter before each test
  var safeUrl, $sce;
  beforeEach(inject(function ($filter, _$sce_) {
    safeUrl = $filter('safeUrl');
    $sce= _$sce_;
  })); 


  it('this dummy checks injecting of the filter', function () {
    expect(safeUrl).toBeDefined();
  });

  it('should return the url sanitized"', function () {
    //var
    var url='http://rss.cnn.com/services/podcasting/studentnews/rss';

    //call
    var result = safeUrl(url);

    //expects (both are the same)
    expect(result.$$unwrapTrustedValue()).toEqual(url); 
    expect($sce.getTrustedResourceUrl(result)).toEqual(url); 

  });

});
