'use strict';

describe('Directive: autoFocus', function () {

  // load the directive's module
  beforeEach(module('angularVideopodcastCnnApp'));

  var element,
    scope, $timeout;

  beforeEach(inject(function ($rootScope, $compile, _$timeout_) {
    scope = $rootScope.$new();

    $timeout=_$timeout_;

    element = angular.element('<button id="test" auto-focus="true"></button>');

    //asign the scope to the element to make angularJS understand that auto-focus is a directive
    $compile(element)(scope);
    scope.$digest();
  }));


  it('should set the focus on the element that has the attribute directive', function () {
    //vars
    var button = element;

    //spies
    spyOn(button[0],'focus');
    
    // flush timeout(s) for all code under test.
    $timeout.flush();

    // this will throw an exception if there are any pending timeouts.
    $timeout.verifyNoPendingTasks();

    //expects
    expect(button[0].focus).toHaveBeenCalled();
  });

});
