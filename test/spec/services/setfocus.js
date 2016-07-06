'use strict';

describe('Service: setFocus', function () {

  // load the service's module
  beforeEach(module('angularVideopodcastCnnApp'));

  // instantiate service
  var setFocus, buttonTest, $timeout;
  beforeEach(inject(function (_setFocus_, _$timeout_) {
    setFocus = _setFocus_;
    $timeout = _$timeout_;

    buttonTest = angular.element('<button>test</button>');

    spyOn(buttonTest[0],'focus');
  }));


  it('should set the focus on a DOM element', function () {
    //call
    setFocus.set(buttonTest);

    // flush timeout(s) for all code under test.
    $timeout.flush();

    // this will throw an exception if there are any pending timeouts.
    $timeout.verifyNoPendingTasks();

    //expects    
    expect(buttonTest[0].focus).toHaveBeenCalled();
  });

});
