'use strict';

describe('Service: hotkeysService', function () {

  // load the service's module
  beforeEach(module('angularVideopodcastCnnApp'));

  // instantiate service
  var hotkeysService;
  beforeEach(inject(function (_hotkeysService_) {
    hotkeysService = _hotkeysService_;
  }));

  it('should check the data service', function () {
    expect(hotkeysService).not.toBe(null);
    expect(hotkeysService).toBeDefined(); 
  });

});
